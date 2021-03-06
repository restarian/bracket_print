/* Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com> Bracket Print resides under the LGPL version 3
Bracket Print is a cross-platform printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function() {

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
							f_body = f_body.replace(/^\s*(?:\n|\r\n|\r)/, "").replace(/\s*$/, "")
							this.append_string("indent", denote_line)
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
								first = first.replace(/\n|\r\n|\r/g, denote_line)
						}

						if ( body_parens !== "(" && this.shift_function_body ) {
							//if ( /\S/.test(previous_indent+indent_string) )
								this.append_string("indent", previous_indent+indent_string)
						}
						

						if ( first )
							this.append_string("indent", first)
						if ( second )
							this.append_string("function_body", second )

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

				this.append_string("indent", (!is_function && this.compression < 3 && line_separator || "") + (body_parens !== "(" && previous_indent || ""))

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

				this.append_string("string", (has_denote && this.ensure_escape) && msg.replace(RegExp("([^\\\\])"+this.denote_quoting, "g"), "$1\\"+this.denote_quoting) || msg)

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

