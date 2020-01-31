
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define('serializer',[],function() {

	return function(msg, indent_string, previous_indent, level, is_qualifier) {
		// The Object to text parsing engine. This function will print any Object passed to it (including function text), in the most literal way possible.
		// It can be recursively called within itself and also accepts modifiers to alter output. The indent_string argument contains how the
		// subsequent Object levels will separate from the left margin. The indent_string is multiplied by the Object level when looping through
		// adding the indent_string to the previous_indent (which is expanding), every time an Object is parsed while already parsing an Object
		// (calling _serializer inside _serializer). This member can not be called outside this script with out breaking the overlying
		// functionality of this script. The previous_indent argument/parameter will be placed at the start of each new object in the output 
		// (used internally).

		var compress_separator, line_separator = ""
		// The style_map can be accessed here sense there is not way to change the platform option value before a check is made elsewhere first.
		var denote_line = this.style_map[this.platform].denote_line || "\n"
		var denote_space = this.style_map[this.platform].denote_space || " "
		var denote_tab = this.style_map[this.platform].denote_tab || "\t"

		if ( typeof level !== "number" || !this._cache )
			this._cache = []

		indent_string = typeof indent_string === "string" && indent_string || (denote_space + denote_space)

		previous_indent = previous_indent || ""
		
		if ( this.compression > 3 ) {
			
			// There will be no indents, spaces or lines at the highest compression level.
			indent_string = ""
			compress_separator = ""
		}
		else if ( this.compression === 3 ) {
			
			// No indents. Lines are spaces as well.
			indent_string = ""
			compress_separator = denote_space
			line_separator = denote_space
		}
		else if ( this.compression === 2 ) {

			compress_separator = denote_space
			line_separator = denote_line
		}
		else {
			
			// The lowest compression settings are the same as the second most above (two), except some of the logic in the Object serializer below.
			compress_separator = denote_space
			line_separator = denote_line
		}

		// Avoid printing itself which causes stack loop overflow.
		if ( msg instanceof this.parent ) {
			this.append_string("string", msg)
		}
		else if ( msg === null ) {
			this.append_string("null", "null")
		}
		else if ( typeof msg === "boolean" ) {
			this.append_string("boolean", msg)
		}
		else if ( msg !== msg ) { 
			// NaN is the only js object which is not equal to itself
			this.append_string("nan", "NaN")
		}
		else if ( msg instanceof Error ) {

			var stack_string = msg.stack.split(/\r\n|\n/).slice(1).map(function(val) { 
				return val.replace(/^\s*/, this.compression < 4 && (previous_indent + indent_string) || " " ) 
			}, this)
			this.append_string("namespace", "Error")
			this.append_string("colon", ":"+compress_separator)
			this.append_string("string", previous_indent + msg.message + line_separator)
			this.append_string("function_body", stack_string.join(line_separator))
		}
		else if ( typeof msg === "undefined" ) {

			this.append_string("undefined", "undefined")
		}
		else if ( (!this.enumerate_all || this.value_buffer) && typeof Buffer !== "undefined" && (msg instanceof Buffer) ) {

			this.append_string("string", msg.toString())
		}
		else if ( /object|function/.test(typeof msg) ) {

			// Simply return if the max characters is reached. append_string returns true if more characters can be added.
			if ( !this.append_string() )
				return

			var is_primitive_object = false
			// Here is the man object parsing function. It will print all of the data from a Object including functions and prototypes.
			var key_grab = !this.enumerate_all && Object.keys || Object.getOwnPropertyNames
			level = level || 0

			// Start a new cache array as a second dimension to the cache array which will be used to denote object levels.
			this._cache[level] = this._cache[level] || []
			// There is no need to put primitive Objects into the cache sense they can not be circular dependencies.

			this._cache[level].push(msg)

			// Only descend to the same level as the current processed one sense a circular dependency can only be linked higher in the Object.
			for ( var l = 0; l < level; l++ ) 
				for ( var x = 0; x < this._cache[l].length; x++ ) 
					if ( typeof msg === "object" && msg === this._cache[l][x] ) {
						// A circular reference is found so the object processing is stopped.

						this.append_string("function_body", "CIRCULAR DUPLICATE" + compress_separator)
						this.append_string("colon", ">" + compress_separator)
						this.append_string("namespace", "Object")
						// This is used to exit the parsing early if the character_limit is reached.
						if ( ! this.append_string("parenthesis", "(") )
							return false
						
						var cut_off = 0, max = 50
						var obj = Object.keys(this._cache[l][x])
						for ( var q = 0; q < obj.length; q++ ) {
							cut_off += obj[q].length + 3
							this.append_string("string", obj[q])

							if ( cut_off > max ) {
								this.append_string("string", ", ..")
								break 
							}
							this.append_string("comma", ", ")
						}

						// It is important to return true so that object parsing continues.
						return this.append_string("parenthesis", ")") 
					}

			if ( typeof msg.valueOf === "function" && msg.valueOf() !== msg ) 
				is_primitive_object = true

			var is_array = msg instanceof Array, is_function = false, body_parens = "{"
			if ( typeof msg === "function" ) {
				is_function = true

				var f_str, f_type, f_name, f_parameter, f_body, parameter_parens = false
				// This regex will strip out the function: declaration, name, parameters and body. The body is only parsed for indentation and will 
				// use the string provided as indent string.
				f_msg = msg.toString()

				var is_arrow = f_msg.match(/^\s*([^\(]*)/)

				if ( is_arrow )
					f_type = is_arrow[1]

				if ( f_type ) {
					f_str = f_msg.match(/(\S+)\s*([^\(]*)\(([^\)]*)\)\s*\{((?:.|[\n,\r\n])*)\}/im)
					parameter_parens = true
					f_type = f_str[1] 
					f_name = f_str[2].replace(/\s+$/, "")
					f_parameter = f_str[3]
					f_body = f_str[4]
				}
				else {
					// This will parse ES6 arrow function strings.
					f_str = f_msg.match(/\ *([^\=]*)\s*\=\>\s*([\{,\(]{0,1})((?:.|[\n,\r\n])*)/im)
					f_type = "arrow"
					parameter_parens = /^\s*\(/.test(f_str[1])
					f_parameter = f_str[1].replace(/^\s*\(\s*/, "").replace(/\s*\)\s*$/, "")
					body_parens = f_str[2]
					if ( body_parens === "{" )
						f_body = f_str[3].replace(/\}\s*$/g, "")
					else
						f_body = f_str[3].replace(/\)\s*$/g, "")
				}

				if ( f_type !== "arrow" )
					this.append_string("namespace", f_type)
				if ( f_name )
					this.append_string("string", denote_space + f_name)

				// Remove tabs and extra spaces from the parameter list.
				var param = f_parameter.replace(/\t/g, "").replace(/ *, */g, ",").replace(/\s*$/, "").split(",")
				// The parameter list is striped from the function text which will produce an Array containing an empty string if no parameters are used 
				// in the Function. E.g. function(cool) -> ["cool"], function() -> [""]. The parenthesis will only have space (compress_separator), 
				// if parameters are used in the function. Note: the compress_separator adjusts pending the this.compression.
				if ( parameter_parens )
					this.append_string("parenthesis", "(" + (param[0] && this.compression < 3 && denote_space || ""))

				// Make the parameter string from the list
				param.forEach(function(val) {
					this.append_string("parameter", val)
					this.append_string("comma", "," + compress_separator)
				}, this)

				// Remove the last comma from the parameter string
				if ( param.length )
					this.remove_call(-1)

				if ( parameter_parens )
					this.append_string("parenthesis", (param[0] && this.compression < 3 && denote_space || "") + ")" + (this.compression < 5 && denote_space || "") )

				if ( f_type == "arrow" )
					this.append_string("parameter", "=>" + (this.compression < 5 && denote_space || ""))

				if ( body_parens === "(" )
					this.append_string("parenthesis", "(" + (body_parens !== "(" && this.compression === 4 && denote_space || ""))
				else
					this.append_string("bracket", "{" + (this.compression === 4 && denote_space || "") )

				if ( body_parens !== "(" && this.truncate_function )
					this.append_string("function_body", (this.compression < 4 && denote_space || "") + "..." + 
						((this.compression < 3 && denote_line) || (this.compression < 5 && denote_space) || ""))
				else {

					// Note: if shift_function_body option is used:
					// Find the maximum number of tabs and spaces which occur at the beginning of every line in the function body and before any	
					// text starts. This way the function body text can be shifted to the left as far as possible without loosing code indentations and
					// then indented where the current object parsing level is. All of the superfluous tabs and spaces which precede new lines are 
					// removed sense they do not affect the text look but do affect the processing below and will clean up the output.
					var min_tab = Infinity, min_space = Infinity
					if ( this.shift_function_body ) {
						// Get the minimum number of spaces and tabs before every line in the function in order to shift it if nessesary.
						f_body.replace(/^[^(?:\n|\r\n)]+/, "").replace(/^(\s+)\S+.*$/gm, function(entire, first) {
							min_tab = Math.min((first.match(/\t/g)||[]).length, min_tab) 
							min_space = Math.min((first.match(/ /g)||[]).length, min_space)
						})
					}
					
					if ( body_parens !== "(" ) {
						if ( this.compression > 2 ) {
							f_body = f_body.replace(/^\s*/, "").replace(/\s*$/, "")
							if ( this.compression === 3 )
								this.append_string("indent", denote_line)
						}
						else {
							f_body = f_body.replace(/^\s*(?:\n|\r\n)/, "").replace(/\s*$/, "")
							this.append_string("indent", denote_line)
							if ( this.shift_function_body )
								this.append_string("indent", previous_indent)
						}
					}

					var first_loop = true
					f_body = f_body.replace(/^(\s*)(\S+.*$)/gm, (function(entire, first, second) {
						// Replace the text indent with the current indent string.

						if ( !first_loop )
							this.append_string("indent", denote_line)
						first_loop = false

						first = first.replace(/[^(?:\n|\r\n)]*(?:\n|\r\n)/g, (function() {
							this.append_string("indent", denote_line)
							return ""
						}).bind(this))

						if ( second ) { 

							second = second.replace(/\s*$/, "")
							var tab = min_tab, space = min_space
							if ( this.shift_function_body ) {
								first = first.replace(/\t/g, function(s) {
									if ( tab-- > 0 )
										return ""
									else
										return s
								})
								first = first.replace(/ /g, function(s) {
									if ( space-- > 0 )
										return ""
									else
										return s
								})
							}
						
							// Turn all of the tabs into denote_tabs if necessary. This should happen after the replacement above so that the native lines ans spaces
							// can be matched by the regex.
							if ( denote_line !== "\t" )
								first = first.replace(/\t/g, denote_tab)
							// Turn all of the spaces into denote_spaces if necessary.
							if ( denote_space !== " " )
								first = first.replace(/ /g, denote_space)
							if ( !/^\n$|^\r\n$/.test(denote_line) )
								first = first.replace(/\n|\r\n/g, denote_line)
						}

						if ( first )
							this.append_string("indent", (this.shift_function_body && previous_indent || "") + first)
						if ( second )
							this.append_string("function_body", second)

						return ""

					}).bind(this))

					if ( !first_loop && body_parens !== "(" ) {
						if ( this.compression < 4 )
							this.append_string("indent", denote_line)
						else if ( this.compression === 4 ) 
							this.append_string("indent", denote_space)
					}
				} 
			}
			else 
				this.append_string(is_array&&"brace"||"bracket", is_array&&"["||"{" + (this.compression < 3 && denote_space || ""))

			var keys = key_grab(msg)
			if ( !keys.length ) {

				if ( typeof msg.__proto__ === "object" && key_grab(msg.__proto__).length ) {

					this.append_string("indent", line_separator + previous_indent + indent_string)
					this._serializer("__proto__", undefined, undefined, level, true)
					this.append_string("colon", ":" + compress_separator)
					if ( ! this._serializer(msg.__proto__, indent_string, previous_indent + indent_string, level+1) )
						return false
				}
				if ( is_primitive_object ) {

					this.append_string("indent", line_separator + previous_indent + indent_string)
					this.append_string("namespace", "PRIMITIVE VALUE" + compress_separator)
					this.append_string("colon", ">" + compress_separator)
					if ( ! this._serializer(msg.valueOf(), indent_string, previous_indent + indent_string, level+1) )
						return false
					this.append_string("comma", "," + compress_separator)
					// This happens when the Object is a primitive value with Object keys set (new String("abc"). The length property will not be added
					// sense it is a property of the primitive value (not the Object). Therefore the length property is added as a design choice.
					if ( typeof msg.length !== "undefined" ) {

						this.append_string("indent", line_separator + previous_indent + indent_string)
						this.append_string("string", "length")
						this.append_string("colon", ":" + compress_separator)
						if ( ! this._serializer(msg.length, indent_string, previous_indent + indent_string, level+1) )
							return false
						this.append_string("comma", "," + compress_separator)
					}
					this.remove_call(-1)
				}

				this.append_string("indent", ((!is_function && this.compression < 3) && line_separator || "") + (body_parens !== "(" && previous_indent || ""))

				if ( is_function ) {
					if ( body_parens === "(" )
						this.append_string("parenthesis", ")")
					else
						this.append_string("bracket", "}")
				}
				else
					this.append_string(is_array&&"brace"||"bracket", is_array&&"]"||"}")

				this.append_string("comma", "," + compress_separator)
			}

			var is_property_based = false 
			// Object.keys are used here to loop instead of the in operator so that the __proto__ keys are not looped over sense they were handled above.
			for ( var cnt = 1; cnt < keys.length+1; cnt++ ) {

				var qualifier = keys[cnt-1]
				// These are prevented from access when strict mode is enabled so they will be avoided.
				if ( /^callee$|^caller$|^arguments$/.test(qualifier) ) 
					continue

				if ( !this.append_string() )
					return false

				var last_was_property_based = is_property_based 
				// Add the indent string to the beginning of the parsing loop or if the item is an Object. This is the primary formatting controller.
				is_property_based = !!( typeof msg[qualifier] === "object" && msg[qualifier] !== null && msg[qualifier] !== undefined && key_grab(msg[qualifier]).length )

				if ( this.compression === 1 ) 
					this.append_string("indent", line_separator + previous_indent + indent_string)
				else if ( this.compression === 2 && (cnt === 1 || ( is_property_based || last_was_property_based ) ) )
					this.append_string("indent", line_separator + previous_indent + indent_string)

				if ( cnt === 1 && typeof msg.valueOf === "function" && msg.valueOf() !== msg ) {
					// If the item has a primitive value than it will not be object based equal to it self and therefor the primitive value should be displayed.

					this.append_string("function_body", "PRIMITIVE VALUE" + compress_separator)
					this.append_string("colon", ">" + compress_separator)
					if ( ! this._serializer(msg.valueOf(), indent_string, previous_indent + indent_string, level+1) )
						return false
					this.append_string("comma", "," + compress_separator)
					if ( this.compression < 3 )
						this.append_string("indent", line_separator + previous_indent + indent_string)
				}

				if ( !is_array ) {
				    // _serializer is used here to format the qualifiers strings if this loop is parsing an object. This should only add numbers and 
					// strings as this
					if ( !this._serializer(qualifier, undefined, undefined, level, true) )
						return false
					// Object separator makes it more human readable by adding space. This changes with the compression.
					this.append_string("colon", ":" + compress_separator) 				
				}
				
				// Recursively call this function to parse the object. The indent_string is added to the beginning to nest the output. It is important to
				// use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
				// function call keeps the value of level. This way each call to _serializer uses a level incremented by one from the calling _serializer.
	 
				// Here parses nested Objects from within Objects and stops at the level specified in the depth_limit setting. This is good for super massive
				// Objects like browser self, window, jquery and document or for other practical use. Object serialization will stop when the specified depth
				// is reached in an Object which contains more Object to serializer. The Object serialization will be replaced with a String describing the 
				// Object. Any non-literal Objects will be printed on the last depth parsing level (which is what the !is_property_based test is for).
				if ( level < this.depth_limit-1 || !is_property_based ) {
					if ( !this._serializer(msg[qualifier], indent_string, previous_indent + indent_string, level+1) )
						return false
				} else {
					var len = key_grab(msg[qualifier]).length
					this.append_string("function_body", "OBJECT WITH " + len + " PROPERT" + (len === 1 && "Y" || "IES"))
				}

				this.append_string("comma", "," + compress_separator)
				// These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
				if ( cnt === keys.length ) {

					// This happens when the Object is a primitive value with Object keys set (new String("abc"). The length property will not be added
					// sense it is a property of the primitive value (not the Object). Therefore the length property is added as a design choice.
					if ( is_primitive_object && typeof msg.length !== "undefined" ) {
	 
						if ( this.compression < 2 )
							this.append_string("indent", line_separator + previous_indent + indent_string)
						this._serializer("length", undefined, undefined, level, true)
						this.append_string("colon", ":" + compress_separator)
						if ( ! this._serializer(msg.length, indent_string, previous_indent + indent_string, level+1) )
							return false
						this.append_string("comma", "," + compress_separator)
					}
					// Remove the last comma from the item list and add the newline and indentation.
					this.remove_call(-1)
	 
					if ( msg.__proto__ && typeof msg.__proto__ === "object" && Object.keys(msg.__proto__).length ) {
	 
						this.append_string("comma", "," + compress_separator)
						this.append_string("indent", line_separator + previous_indent + indent_string)
							this._serializer("__proto__", undefined, undefined, level, true)
						this.append_string("colon", ":" + compress_separator)
						if ( ! this._serializer(msg.__proto__, indent_string, previous_indent + indent_string, level+1) )
							return false
					}

					this.append_string("indent", (this.compression < 3 && line_separator || "") + previous_indent)
					this.append_string(is_array&&"brace"||"bracket", is_array&&"]"||"}")
					this.append_string("comma", "," + compress_separator)
				}
			}
			// Remove the last comma from the parsing output. It is the last thing to be stored so a simple call to remove the last call will suffice.
			this.remove_call(-1)
			// An Object which is being parsed will always have a level. It is set as soon as Object parsing begins.
		}
		else if ( typeof msg === "number" ) {

			this.append_string("number", msg)
		}
		else if ( typeof msg === "string" ) {

			// The quotes are only added if this _serializer call was called from an object_serializer call which will have a cache length. Otherwise all 
			// calls with strings would have quotes.
			var has_denote = /\S/.test(this.denote_quoting)
			if ( this._cache.length ) {
				if ( has_denote && !is_qualifier || this.quote_qualifier )
					this.append_string("quote", this.denote_quoting)
				this.append_string("string", has_denote && msg.replace(RegExp("([^\\\\])"+this.denote_quoting, "g"), "$1\\"+this.denote_quoting) || msg)
				if ( has_denote && !is_qualifier || this.quote_qualifier )
					this.append_string("quote", this.denote_quoting)
			} 
			else 
				this.append_string("string", msg)
		}
		else 
			this.append_string("namespace", msg)
		
		// Only the original call to serialize and non-object calls will return level as undefined so the object array is reset to free up the object links.
		if ( this._cache.length && typeof level !== "number" )
			this._cache = []	

		return true
	}
})

;
/* Brace Option resides under the MIT license  Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com>

Brace Option adds member data to object prototypes to control properties within the chain.

 this file is part of the Brace Option 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

/* Generated by Brace_UMD 0.10.1 */
if('function'!=typeof define)var define=require('amdefine')(module);define('brace_option',[],function(){return function(e,t){if(t=t&&t.parent&&t instanceof t.parent?t.spawn(t.log_title+' -> brace_option'):console,'object'!=typeof e)return t.log('Constructor must passed an Object to assign additional members.')||e;var r='function'==typeof Object.getPrototypeOf,n={},i={};Object.getOwnPropertyNames(e).forEach(function(e){n[e]=null});var o=function(e){if(this.hasOwnProperty(e)){if(r)return e in Object.getPrototypeOf(this)&&delete this[e]||!0;for(var t=this.__proto__;t;t=t.__proto__)if(e in t)return delete this[e]||!0}return!1};return e.clear=function(){if(!arguments.length){for(var e in n)o.call(this,e);for(var e in i)o.call(this,e)}for(var r in arguments)arguments[r]in n||arguments[r]in i?o.call(this,arguments[r]):t.log('The qualifier',arguments[r],'was passed to a brace prototype instance which does not have it listed.','You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.')},e.extend=function(e){return Object.getOwnPropertyNames(e).forEach(function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(this,t,r)},this),this},e.proto_extend=function(t){return Object.getOwnPropertyNames(t).forEach(function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(this,e,r)},e),e},e.add_qualifier=function(t){n[t]=null,e[t]=e[t]||null},e.add_hidden_qualifier=function(t){i[t]=null,e[t]=e[t]||null},e.remove_qualifier=function(e){delete n[e]},e.list=function(){return n},e}});

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define('proto_object',["./serializer", "brace_option"], function(serializer, brace_option) {

	var brace_proto = brace_option({
		// All user configurable options go in here so that prototype can manage them.

		style: true,
		title: true,
		// The return value of this option will be used as the title string. This can also be a string value.
		log_title: "",
		title_stamp: function() { return new Date() },
		auto_hyphen_title: true,
		theme: "light",
		// The compression level of the Object serializations. Higher numbers create more spacious formatting. Level one removes all white space and 
		// new lines from the Object.
		compression: 2,
		indentation_string: "   ",
		platform: (typeof require == "function" && require.isBrowser === false || typeof module === "object" && typeof module.exports === "object" ) && "terminal" || "browser",
		// This will prevent Object serialization to traverse to a deeper level with Objects (it avoids call stack max-out conditions).
		depth_limit: 800,
		// The logging storage and serializations will be cut short and truncated to this character_limit. Note: passing parameters to toStyleString
		// and toString will not obey this option.
		character_limit: Math.pow(2,25),
		style_character_limit: Math.pow(2,28),
		truncate_function: false,
		// Replace the natural indent of the function body with an indent which matches the current object parsing indent (warning: this breaks template tags).
		shift_function_body: true,
		// Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the
		// enumerate_all flag needs to be set.
		enumerate_all: false,
		// Use toString when serializing instances of a nodejs Buffer.
		value_buffer: true,
		denote_quoting: "\"",
		quote_qualifier: false,
		// Note: log_level is contained one level up in the chain and should stay that way.
		// This is the level which needs to be in the range set to log_level. All serializations, logging and storage will be ignored (disabled), if
		// the level is not a match to the log_level.
		level: 1,
		// This is used to set the level of any messages which are logged internally in bracket print. Setting this falsey (but non-zero) will use the same value as level.
		internal_level: false,
		get log_level() {

		  return this._log_level
		},
		set log_level(value) {
		// This property setter accepts strings, numbers and Arrays. Arrays should be in pairs denoting ranges. Two Array values of the same value need to 
		// be set to denote a level single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of
		// Array pairs for more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are
		// separated with commas. E.g. log_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored 
		// and strings are parsed as numbers in any case (Array or String). The value of log_level will be set to [-Infinity, Infinity] (which will match 
		// all levels), if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.

			if ( value === "all" || value === "" )
				return this._log_level = [-Infinity, Infinity]

			if ( Object.prototype.toString.call(value) === "[object Array]" ) {
			// Arrays can only be passed in as pairs of ranges (which is what non-Array values set to log_level are converted to.

				if ( value.length % 2 )
					value.pop()
			}
			else
				// All processing is utilized with Arrays in this function.
				value = [value]

			var parsed = []

			// Split the commas and dashes into a uniform parse-able Array.
			value.join("-").replace(/\ +/g, "").replace(/\-\-([^\-]{1})/g, "-minus$1").replace(/^\-/, "minus").split(",").forEach(function(val) {

				if ( !val )
					return

				var range = val.split("-")
				if ( range.length < 2 )
					range.push(range[0])

				for ( var x = 0; x < range.length; x+=2 ) {

					var first_is_negative = /minus/.test(range[0]), second_is_negative = /minus/.test(range[1])
					if ( /Infinity/.test(range[x]) )
						range[x] = Infinity
					else
						range[x] = parseInt(range[x].replace(/minus/, ""))

					if ( /Infinity/.test(range[x]) )
						range[x+1] = Infinity
					else
						range[x+1] = parseInt(range[x+1].replace(/minus/, ""))

					if ( range[x] !== range[x] || range[x+1] !== range[x+1] ) {

						if ( !this._is_error )
							new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error",
							level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
							.log("The value set to log_level can not be parsed as an integer:", range)
						return
					}

					// If the string contained a negative number (the range dash is already compensated for).
					if ( first_is_negative )
					  range[x] *= -1
					if ( second_is_negative )
					  range[x+1] *= -1
				}
			parsed = parsed.concat(range)
			}, this)
			this._log_level = parsed
		},
	})
	
	// The prototype handler needs to know that this is also operated on but should not be an option.
	brace_proto.add_hidden_qualifier("_log_level")	

	return brace_proto.extend({
		_serializer: serializer,
		_log_level: [-Infinity, Infinity], 		
		toStyleString: function() {
		// This member returns a string so no chaining mechanism is utilized (unlike the other API members which use a getter to return a function 
		// which returns the instance). They do accept parameters to serialize just like all other printing commands. Note: this method is very 
		// fast (especially without arguments), as it only returns an instance property.

			// Make sure to create another copy of the string and not operate on the one in the instance.
			var formated = this.formated
			if ( arguments.length )
				formated = this._print_command(this._last_command || "space").apply(this, arguments).formated 
			
			var platform, theme  
			// In case a bad option value was set in the call chain.
			if ( !(theme = this.currentTheme) || !(platform = this.currentPlatform) )
				return ""

			return (theme.open_with || platform.open_with || "") + formated + (theme.close_with || platform.close_with || "")

		},
		toString: function() {
		// This member returns a string so no chaining mechanism is utilized (unlike the other API members which use a getter to return a function 
		// which returns the instance). They do accept parameters to serialize just like all other printing commands. Note: this method is very 
		// fast (especially without arguments), as it only returns an instance property.

			var plain = this.plain
			if ( arguments.length )
				plain = this._print_command(this._last_command || "space").apply(this, arguments).plain

			return plain
		},
		option: function() {
		// This member is tasked with setting option data to the instance. It returns the instance to maintain call chains. Objects, Print instances, 
		// and Strings can be passed into it. Any Strings passed in at any argument location will be used to set the log_title option. Objects passed 
		// in after other Objects will override the previous Object data so that the last Object in the parameter/arguments list has the highest priority.

		   // The is_chained property tells any printing commands to create a new instance or use the existing.
			var print = this._is_chained && this || new this.parent(this)

			var contained_string_title = false
			var parse_args = (function(args) {
				// This is called recursively on a arguments Object so that arguments Objects inside of standard Objects are also parsed. This is how
				// arguments as arguments are also accepted by the callee.
				var opt
				for ( var x = 0; x < args.length; x++ ) {
					// It is also acceptable to pass arguments inside of objects to the option member.
					if ( Object.prototype.toString.call(args[x]) === "[object Arguments]" ) {
						parse_args(args[x])
					}
					else if ( typeof args[x] === "object" || typeof args[x] === "string" ) {

						opt = args[x]

						if ( typeof opt === "string" ) {
							contained_string_title = true
							this.log_title = opt 
						} 
						else { 
							if ( "_is_error" in opt ) {
								this["_is_error"] = opt["_is_error"]
								delete opt["_is_error"]
							}
							for ( var n in opt ) {
								// list returns all of the properties defined into the prototype as option-like data via Brace_prototype
								if ( n in this.list() ) {
									// contained_string_title is used to make sure that the log_title is set by any strings passed in only. The hasOwnProperty
									// ensures that if a Print instance is passed into the options that the prototype data is not set to the property. 
									if ( opt.hasOwnProperty(n) && (n !== "log_title" || !contained_string_title) )
										this[n] = opt[n]
								}
								else if ( !this._is_error && !(opt instanceof this.parent) ) {
									new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error",
									level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
									.s("Option", n, "is not a bracket print option. Reference the brace prototype module for option configurations.")
									.line(Object.keys(this.list())).log()
								}
							}
						}
					}
					else if ( !this._is_error ) {
						new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error",
						level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
						.log("The parameter passed in to option", typeof args[x], args[x], "is not accepted. See docs for more information.")
						continue
					}

				}

			}).bind(print)
			parse_args(arguments)

			return print
		},
		spawn: function() {
		// This is how bracket print transfers options to other instances. It is best to make a single print instance and then and pass the copy 
		// into another Print copy. It is in this way that all of the p objects contain inherit settings and then can have the options changed 
		// individually if necessary. The function parameters work the same way as the option member and Print constructor.

			return new this.parent(this, arguments)
		},
		get empty() {
		// Removes all of the text storage from the current instance and also will accept option arguments.

			return (function() {
				// Splices all text storage from the beginning of the bufferize instance.
				this.remove_call(0)
				// Set any option data passed in as well.
				return this.option.apply(this, arguments)
			}).bind(this)
		},
		//----------------------------------------------------------------------------
		get s() {

			return this._print_command("space")
		},
		get space() {

			return this._print_command("space")
		},
		get tab() {

			return this._print_command("tab")
		},
		get t() {

			return this._print_command("tab")
		},
		get line() {

			return this._print_command("line")
		},
		get l() {

			return this._print_command("line")
		},
		get add() {

			return this._print_command("add")
		},
		get a() {

			return this._print_command("add")
		},
		// ---------------------------------------------------------------------------
		// Here are all of the print commands which ease string formation.
		_print_command: function(call_name) {

			 // This is used internally whenever a input member is called. The _chain is preliminary for the _serialize member which converts Objects to text.
			 // this is passed into the p constructor so that the current settings will be saved.
			 var print = this._is_chained && this || new this.parent(this)
			 print._is_chained = true
			 print._last_command = call_name

			 return (function() {

				// No need to process if no arguments were passed in. As long as the _print_command returns a function which returns the instance.
				if ( !arguments.length ) {
					if ( this.style )
						this.currentTheme
					return this
				}
				for ( var x = 0; x < this.log_level.length; x += 2 )
				  if ( parseInt(this.level) >= this.log_level[x] && parseInt(this.level) <= this.log_level[x+1] )
					 return this._chain.apply(this, arguments)
				 return this

			 }).bind(print)
		},
		get _chain() {

			 // This is the main printing member.
			return function() {

				var platform
				// In case a bad option value was set in the call chain.
				if ( !(platform = this.currentPlatform) )
					return this 

				var indentation = this.indentation_string		
				if ( platform.denote_tab !== "\t" )
					indentation = indentation.replace(/\t/g, platform.denote_tab)
				if ( !/^\n$|^\r\n$/.test(platform.denote_line) )
					indentation = indentation.replace(/\r\n|\n/g, platform.denote_line)
				if ( platform.denote_space !== " " )
					indentation = indentation.replace(/ /g, platform.denote_space)

				for ( var i = 0; i < arguments.length; i++ ) {

				  if ( this.plain.length && typeof platform["denote_"+this._last_command] !== "undefined" ) {
					 // Add the last separator relating to the previous printing command called
					 this.plain += platform["denote_"+this._last_command]
					 this.formated += platform["denote_"+this._last_command]
				  }
					
				  if ( ! this._serializer(arguments[i], indentation) )
						break
				}
				return this
			 }
		},
		_title: function() {
			
			var title = ""
			if ( this.title ) {
				var title_stamp = typeof this.title_stamp === "function" && this.title_stamp() || typeof this.title_stamp === "string" && this.title_stamp || ""
				// Only put the hyphen between the title and title_stamp if both are truthy.
				title = "[" + (this.log_title||"") + ( this.auto_hyphen_title && this.log_title && title_stamp && " - " || "" ) + title_stamp + "] "
			}
			return title
		},
		get log() {

			// this is passed into the parent (Print constructor) so that the current settings will be used.
			var print = this._is_chained && this || new this.parent(this)
			print._is_chained = true
			return (function() {

				var in_range = false
				for ( var x = 0; x < this.log_level.length; x += 2 )
					if ( this.level >= this.log_level[x] && this.level <= this.log_level[x+1] ) {
						in_range = true
						break
					}

				if ( !in_range || (this.style && !this.currentTheme) )
					return this

				if ( arguments.length > 0 ) {
					// Call the last command used before this log again.
					if ( this[this._last_command] ) 
						this[this._last_command].apply(this, arguments)
					else 
						this.space.apply(this, arguments)
				}


				if ( this.style ) {

					var tmp_apply_args = [], platform, theme  

					if ( !(theme = this.currentTheme) || !(platform = this.currentPlatform) )
						return this 

 					// Turn the entire output string into an array to pass with the console.log.apply
					if ( this.title ) {

						// Use the value from the style map type (example: quote, number), use the base value, or fail returning a true error message. This
						// returns truthy so that the serializer knows that it was not due to a character_limit max-out.
						var formated_title = platform.format(theme["title"] || theme.base || "", 
																			this._title(), 
																			platform.format.length >= 3 && tmp_apply_args || undefined)
						console.log.apply(console, this._apply_arguments.concat([formated_title + this.toStyleString()], tmp_apply_args))
					}
					else 
						console.log.apply(console, this._apply_arguments.concat([this.toStyleString()], tmp_apply_args))
				} 
				else
					console.log(this._title() + this.plain)

				return this
			}).bind(print)
		},
		get log_false() {

			return (function() {
				this.log.apply(this, arguments)
				return false
			 }).bind(this)
		},
		get log_true() {

			return (function() {
				this.log.apply(this, arguments)
				return true
			 }).bind(this)
		},
		get log_undefined() {

			 return (function() {
				this.log.apply(this, arguments)
				return undefined
			}).bind(this)
		},
		get log_null() {

			return (function() {
				this.log.apply(this, arguments)
				return null
			}).bind(this)
		},
		get log_empty() {

			return (function() {
				this.log.apply(this, arguments)
				return ""
			 }).bind(this)
		},
	})
})	
;

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define('style_map',[], function() {

	return {
		
		none: {

			denote_line: "\n", 
			denote_tab: "\t", 
			denote_space: " ", 
		},
		browser: {

			denote_line: "\n",
			denote_tab: "\t;",
			denote_space: " ",
			denote_add: "",
			import_theme_from: "html",
			default_theme: "light_1", 
			format: function(style_value, str, apply_args) {
				apply_args.push(style_value)
				return "%c"+str
			},
		},
		html: {

			denote_line: "<br>",
			denote_tab: "&#09;",
			denote_space: "&nbsp;",
			denote_add: "",
			default_theme: "light_1", 
			format: function(color_value, str) {
				return "<span style='"+color_value+";'>"+str+"</span>"
			},
			theme: {

				light_1: {
					quote: "color: #454343;",
					number: "color: green",
					string: "color: #b91db3",
					function_body: "color: #656565",
					nan: "color: #249e93",
					null: "color: #249e93",
					boolean: "color: red",
					comma: "color: #323232",
					undefined: "color: #f4d400",
					scope_container: "color: #286f4f",
					colon: "color: #363533",
					namespace: "color: #690900", 
					indent: "color: #c2bab8",
					title: "color: #0a0a0a",
					variable: "color: #4a6a27",

				},
				light_2: {
					open_with: "<span style='font-weight: bold'>",
					close_with: "</span>",
					quote: "color: #454343",
					number: "color: green",
					string: "color: #b91db3",
					function_body: "color: #656565",
					nan: "color: #249e93",
					null: "color: #249e93",
					boolean: "color: red",
					comma: "color: #323232",
					undefined: "color: #f4d400",
					scope_container: "color: #286f4f",
					colon: "color: #363533",
					namespace: "color: #690900", 
					indent: "color: #c2bab8",
					title: "color: #0a0a0a",
					variable: "color: #4a6a27",

				},
				dark_1: {
					quote: "color: #d2d2d2",
					number: "color: green",
					string: "color: #e9e9e9",
					function_body: "color: #a7a7a7",
					nan: "color: yellow",
					null: "color: #5bc3ba",
					boolean: "color: red",
					comma: "color: #787878",
					undefined: "color: #e9d234",
					scope_container: "color: #80ab96",
					colon: "color: #dfd9b3",
					namespace: "color: #e05c50", 
					indent: "color: #373332",
					title: "color: #f2f2f2", 
					variable: "color: #baeb83",

				},
				dark_2: {
					open_with: "<span style='font-weight: bold'>",
					close_with: "</span>",
					quote: "color: #d2d2d2",
					number: "color: green",
					string: "color: #e9e9e9",
					function_body: "color: #a7a7a7",
					nan: "color: yellow",
					null: "color: #5bc3ba",
					boolean: "color: red",
					comma: "color: #787878",
					undefined: "color: #e9d234",
					scope_container: "color: #80ab96",
					colon: "color: #dfd9b3",
					namespace: "color: #e05c50", 
					indent: "color: #373332",
					title: "color: #f2f2f2",
					variable: "color: #baeb83",

				},
			},
		 },
		 terminal: {

			denote_line: "\n", // The new line insert characters. This will also affect the indentation option value.
			denote_tab: "\t", // The tab insert characters. This will also affect the indentation option value.
			denote_space: " ", // The space insert characters. This will also affect the indentation option value.
			close_with: "\033[0m", // This will be added after a toStyleString call (which is used with log as well). It will also be added whenever 
											// the style option is set to false. This will not be used if a close_with value is set in the theme below.
			default_theme: "dark_1", // Use this to set theme and level to use if the requested one does not exist.
			//import_theme: null, // This can be the property name of another theme or falsey or omitted.
			format: function(style_value, val) {
			// format is called every time a argument from the call chain is stylized. This will not be used is style is falsey. The style value is
			// a value from the theme[theme] below (e.g. theme.light_1.base). The value is the string which is expected to be stylized.
				//return val
				return style_value + val
			},
			theme: {
		/*		Black       0;30     Dark Gray     1;30
				Blue        0;34     Light Blue    1;34
				Green       0;32     Light Green   1;32
				Cyan        0;36     Light Cyan    1;36
				Red         0;31     Light Red     1;31
				Purple      0;35     Light Purple  1;35
				Brown       0;33     Yellow        1;33
				Light Gray  0;37     White         1;37   */
				light_1: {

					base: "\033[0;35m", // The default style to use if any namespace can not be found below.
					quote: "\033[0;34m", // a double or single quote (will also be used regardless of what bracket_print.denote_quote option is set to).
					number: "\033[0;32m", 
					string: "\033[0;35m",
					function_body: "\033[0;37m", // The contents of a function. This will include truncated denotations.
					nan: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;37m",
					undefined: "\033[0;32m",
					parenthesis: "\033[0;36m",
					bracket: "\033[0;36m",
					brace: "\033[0;36m",
					colon: "\033[0;37m",
					namespace: "\033[0;31m", // I.g. .__proto__, [[primitivevalue}
					indent: "\033[0;37m", // This happens when indent is set to a string instead of spaces.
					title: "\033[0;33m", // The title set with use_title and title or title_stamp
					parameter: "\033[0;34m", // The parameter namespace used in a function declaration. E.g. function( num, opt ) { .
                                        //                                                                        ^^^  ^^^

				},
				light_2: {
					base: "\033[1;35m", // The default style to use if any namespace can not be found below.
					quote: "\033[1;34m", // a double or single quote (will also be used regardless of what bracket_print.denote_quote option is set to).
					number: "\033[1;37m", 
					string: "\033[1;35m",
					function_body: "\033[1;37m", // The contents of a function. This will include truncated denotations.
					nan: "\033[1;36m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[1;37m",
					undefined: "\033[1;36m",
					parenthesis: "\033[1;36m",
					bracket: "\033[1;36m",
					brace: "\033[1;36m",
					colon: "\033[1;37m",
					namespace: "\033[1;31m", // I.g. .__proto__, [1primitivevalue}
					indent: "\033[1;37m", // This happens when indent is set to a string instead of spaces.
					title: "\033[1;37m", // The title set with use_title and title or title_stamp
					parameter: "\033[1;34m", // The parameter namespace used in a function declaration. E.g. function( num, opt ) { .
                                        //                                                                        ^^^  ^^^

				},
				dark_1: {
/*		black       0;30     dark gray     1;30
		blue        0;34     light blue    1;34
		green       0;32     light green   1;32
		cyan        0;36     light cyan    1;36
		red         0;31     light red     1;31
		purple      0;35     light purple  1;35
		brown       0;33     yellow        1;33
		light gray  0;37     white         1;37   */
					base: "\033[0;30m", 
					quote: "\033[0;32m",
					number: "\033[0;32m",
					string: "\033[0;35m",
					function_body: "\033[0;31m",
					nan: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;30m",
					undefined: "\033[0;32m",
					bracket: "\033[0;36m",
					brace: "\033[0;36m",
					colon: "\033[0;30m",
					namespace: "\033[0;35m",
					indent: "\033[0;50m", 
					title: "\033[0;34m",
					parameter: "\033[0;34m", 
				},
				dark_2: {
					base: "\033[1;30m", 
					quote: "\033[1;32m",
					number: "\033[1;32m",
					string: "\033[1;35m",
					function_body: "\033[1;30m",
					nan: "\033[1;33m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[1;30m",
					undefined: "\033[1;32m",
					bracket: "\033[1;36m",
					brace: "\033[1;36m",
					colon: "\033[1;30m",
					namespace: "\033[1;35m",
					indent: "\033[1;50m", 
					title: "\033[1;34m",
					parameter: "\033[1;34m", 
				},
			},
		}

	}

})
;
/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

// This will be striped out by the requirejs optimizer. It is mainly used so that this library source can be evaluated in primitive development.
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define('bracket_print',["./proto_object", "./style_map"], function(obj, style_map) {
	
	var Print = function() {
		// This accepts all of the parameters as the option member does. 

		// This will call the constructor with the same arguments as initially passed as a new instance if it was not done so to ensure a new instance is
		// always created when invoking the constructor.
		var call_instance
		if ( !(this instanceof (call_instance = Print) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		// is_chained will prevent the members from creating new instances. It is used in the constructor here so that a call loop will not occur and then
		// is set to false so that all subsequent calls act as constructors creating a new instance.
		this._is_chained = true
		this.option(arguments)
		this._is_chained = false 

		this._last_command = null
		this._apply_arguments = []
		this._plain_index = []
		this._formated_index = []
		this.formated = ""
		this.plain = ""
	}

	Print.prototype = obj
	// The parent is set to Print and not the obj so that instanceof checks to Print work (setting the constructor could work too).
	Print.prototype.parent = Print
	obj.style_map = style_map

	obj.__defineGetter__("currentPlatform", function() {

		// Retrieve the current platform from the platform option if it exists
		if ( typeof this.style_map[this.platform] !== "object" || this.style_map[this.platform] === null  ) {
			if ( !this._is_error ) 
				new this.parent({_is_error: true}, this, {style: false, platform: "none", log_title: "Bracket Print Error",
					level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log("The requested platform", this.platform, "is not included in the style mapping.")
			return null
		}
		else 
			return this.style_map[this.platform]
	})
	obj.__defineGetter__("currentTheme", function() {
	// This member is tasked with returning the proper theme to use or a null error message otherwise. The theme can change depending on if the 
	// import_theme_from value is found in the style_map or added to it at run-time. A default_theme value may also used if the string set in the 
	// theme option is not found in the style platform. 

		var platform, theme 
		// The this.currentPlatform getter will error and log a message if this not available.
		if ( !(platform = this.currentPlatform) )
			return null 

		var platform_name = this.platform
		if ( platform.import_theme_from ) {
			if ( !platform.import_theme_from in this.style_map ) {
				if ( !this._is_error )
					new this.parent({_is_error: true}, this, {style: false, log_title: "Bracket Print Error",
						level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
					.log("The requested import theme", currentPlatform.import_theme_from, "is not included in the style mapping in platform", platform_name)
				return null
			}
			else {
				theme = this.style_map[platform.import_theme_from].theme	
				platform_name = platform.import_theme_from 
			}
		} 
		else
			theme = platform.theme

		if ( typeof theme !== "object" ) {
			if ( !this._is_error )
				new this.parent({_is_error: true}, this, {style: false, log_title: "Bracket Print Error",
					level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log("The theme", this.theme, "is not found in the platform", platform_name)
			return null
		}

		if ( (this.theme+"_"+this.level) in theme ) 
			theme = theme[this.theme+"_"+this.level]
		else if ( "default_theme" in platform ) {
			if ( !(platform.default_theme in theme) ) {
				if ( !this._is_error )
					new this.parent({_is_error: true}, this, {style: false, log_title: "Bracket Print Error",
						level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
					.log("The default theme", platform.default_theme, "specified is not found in the", platform_name, "style mapping.")
				return null
			}
			else
				theme = theme[platform.default_theme]
		}
		else {
			if ( !this._is_error )
				new this.parent({_is_error: true}, this, {style: false, log_title: "Bracket Print Error",
					level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log("The theme", platform.default_theme, "specified is not found in the", platform_name, "style mapping.")
			return null
		}

		if ( typeof theme !== "object" ) {
			if ( !this._is_error )
				new this.parent({_is_error: true}, this, {style: false, log_title: "Bracket Print Error",
					level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log("The theme specified is not found in the", platform_name, "style mapping.")
			return null
		}

		return theme

	})

	obj.remove_call = function() {
	// This member removes all of the text added to the internal buffer created by calls to the style map. The text is indexed by every call that is made
	// to the style mapping member and thusly can be removed from the buffer. This mechanism works like the Array.splice member and also returns the
	// removed call text. The console.log mechanism in based browsers uses a printf like format so a separate Array is created to store them and 
	// passed to console.log via an apply.

		if ( this.currentPlatform.format && this.currentPlatform.format.length >= 3 )
			this._apply_arguments.splice.apply(this._apply_arguments, arguments)

		var formated_index = this._formated_index.splice.apply(this._formated_index, arguments)[0] || 0
		var plain_index = this._plain_index.splice.apply(this._plain_index, arguments)[0] || 0
		// This is the text data which is removed
		//var removed = {formated: this.formated.substr(formated_index), plain: this.plain.substr(plain_index) }

		// This is the internal buffer text which is now truncated.
		this.formated = this.formated.substr(0, formated_index)
		this.plain = this.plain.substr(0, plain_index)

		return null
	}

	obj.append_string = function(style_name, str) {
	// The append_string member will return true unless it reaches a character_limit. This is the way which bracket print compounds strings together.

		if ( this.plain.length === this.character_limit )
			return false 
		else if ( ! arguments.length )
			return true

		// This is one of the few times which a parameter is string-based fool-proofed. It simply gets used to many times to just error whenever
		// a non-string parameter is passed in.
		var plain = typeof str == "string" && str || String(str)

		if ( !plain )
			return true

		// TODO: Adding line breaks for max screen width control may be a nifty feature here.
		var truncated_msg = " <..output truncated>"
		// do not include the truncated message if the maximum string length is not at least three times its length.
		truncated_msg = this.character_limit > (truncated_msg.length*3) && truncated_msg || ""

		if ( this.plain.length + plain.length > this.character_limit - truncated_msg.length )
			plain = plain.substr(0, this.character_limit - this.plain.length - truncated_msg.length ) + truncated_msg

		// The style needs only to be processed if new plain text was added. Otherwise, only the truncated message is styled which would already have been
		// styled once. This is done to maximize efficiency after the character_limit is reached.
		if ( this.plain.length >= this.character_limit ) 
			return false

		this._plain_index.push(this.plain.length)
		this.plain += plain

		// The string will also be run through the style map format function when the style option is set. The style_character_limit is used like the
		// plain character_limit above.
		if ( this.style ) {

			var platform, theme
			if ( !(theme = this.currentTheme) || !(platform = this.currentPlatform) )
				return ""

			this._formated_index.push(this.formated.length)
			var style_value
			// Use the value from the style map type (example: quote, number), use the base value, or fail returning a true error message. This
			// returns truthy so that the serializer knows that it was not due to a character_limit max-out.
			if ( ! (style_value = (style_name in theme && theme[style_name] || theme.base))  ) 
				return new this.parent(this, {style: false, log_title: "Bracket Print Error",
					level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log_true("There is not a style value set for", style_name, "in platform", this.platform)

			this.formated += platform.format(style_value, plain, platform.format.length >= 3 && this._apply_arguments || undefined)
		} else {

			// This can only happen when the style option was toggled within a call chain so the close_with value should
			// be applied to the internal string before the plain text is added. This way the plain text will not have any style and if
			// the style is toggled back on the open_with value will be used again.
			if ( this.formated.length ) {
				var theme = this.currentTheme || {}
				var platform = this.currentPlatform || {}
				this.formated += (theme.close_with || platform.close_with || "") + plain + (theme.open_with || platform.open_with || "")
			}
			else 
				this.formated += plain
		}

		return true 
	}

	return Print

})


;
