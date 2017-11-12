/* Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {

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
			line_separator = ""
			
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
		else if ( msg !== msg ) { // NaN is the only js object which is not equal to itself
			this.append_string("nan", "NaN")
		}
		else if ( msg instanceof Error ) {

			var stack_string = msg.stack.split(/[\n,\r]/).slice(1).map(function(val) { 
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
		else if ( (!this.enumerate_all || this.value_buffer) && typeof Buffer !== "undefined" && msg instanceof Buffer ) {

			this.append_string("string", msg.toString())
		}
		else if ( typeof msg === "object" || typeof msg === "function" ) {

			// Simply return if the max characters is reached. append_string returns true if more characters can be added.
			if ( !this.append_string() )
				return

			// Here is the man object parsing function. It will print all of the data from a Object including functions and prototypes.
			var key_grab = !this.enumerate_all && Object.keys || Object.getOwnPropertyNames
			var keys = key_grab(msg), is_primitive_object = false

			level = level || 0

			// Start a new cache array as a second dimension to the cache array which will be used to denote object levels.
			this._cache[level] = this._cache[level] || []
			// There is no need to put primitive Objects into the cache sense they can not be circular dependencies.
			if ( typeof msg.valueOf === "function" && msg.valueOf() !== msg ) {
				is_primitive_object = true
			} else {
				this._cache[level].push(msg)
			}

			// Only descend to the same level as the current processed one sense a circular dependency can only be linked higher in the Object.
			for ( var n = 0; n < level; n++ ) {
				for ( var x = 0; x < this._cache[n].length; x++ ) {
					if ( typeof msg === "object" && msg === this._cache[n][x] ) {
						// A circular reference is found so the object processing is stopped.

						var circ_text = "<..circular duplicate of:"
						var obj_qualifier = key_grab(this._cache[n][x])
						obj_qualifier.unshift("")
						obj_qualifier = obj_qualifier.join(" "+(this._cache[n-1]&&this._cache[n-1][x]||"<-"))
						if ( circ_text.length+obj_qualifier.length > 75 )
							obj_qualifier = obj_qualifier.substr(0, 71-circ_text.length) + ".."
	 
						this.append_string("namespace", circ_text)
						//this.append_string("bracket", "{"+compress_separator)
						this.append_string("function_body", obj_qualifier)
						//this.append_string("bracket", compress_separator+"}")
						this.append_string("namespace", ">")
						// This will return from the this entire Object if it is a duplicate of another in the parent Object.
						return
					}
				}
			}

			var is_array = msg.constructor === Array
			if ( typeof msg === "function" ) {

				// This regex will strip out the function: declaration, name, parameters and body. The body is only parsed for indentation and will 
				// use the string provided as indent string.
				var f_str = msg.toString().match(/function(?: |[\n,\r])*(\S*)\(([^\)]*)\)(?: |[\n,\r,\t])*\{((?:.|[\n,\r])*)\}(?: |[\n,\r])*/i) || []
				var f_name = f_str[1] || ""
				var f_parameter = f_str[2] || ""
				var f_body = f_str[3] || ""

				this.append_string("namespace", "function" + (!f_name && this.compression < 3 && denote_space || ""))
				if ( f_name )
					this.append_string("string", denote_space + f_name)

				// Remove tabs and extra spaces from the parameter list.
				var param = f_parameter.replace(/\t/g, "").replace(/ *, */g, ",").split(",")
				// The parameter list is striped from the function text which will produce an Array containing an empty string if no parameters are used 
				// in the Function. E.g. function(cool) -> ["cool"], function() -> [""]. The parenthesis will only have space (compress_separator), 
				// if parameters are used in the function. Note: the compress_separator adjusts pending the this.compression.
				this.append_string("parenthesis", "(" + (param[0] && this.compression < 3 && compress_separator || ""))

				// Make the parameter string from the list
				param.forEach(function(val) {
					this.append_string("parameter", val)
					this.append_string("comma", "," + (this.compression < 4 && compress_separator || ""))
				}, this)

				// Remove the last comma from the parameter string
				this.remove_call(-1)
				this.append_string("parenthesis", (param[0] && this.compression < 3 && compress_separator || "") + ")" + compress_separator)
				this.append_string("bracket", "{")

				if ( this.truncate_function ) {
					this.append_string("function_body", compress_separator + "...")
				}
				else {

					// Find the maximum number of tabs and spaces which occur at the beginning of every line in the function body and before any	
					// text starts. This way the function body text can be shifted to the left as far as possible without loosing code indentations and
					// then indented where the current object parsing level is (if shift_function_body option is used).

					// All of the superfluous tabs and spaces which precede new lines or are after any text are removed sense they do not affect the text 
					// look but do affect the processing below and will clean up the output.
					f_body = f_body.replace(/[\t, ]+$/, "").replace(/[\t, ]+([\n,\r]+)/g, "$1")
					
					var min_tab = 999999999, min_space = 999999999
					if ( this.compression < 4 ) {
						(f_body.match(/^\s+/mg)||[]).forEach(function(match) {
							min_tab = Math.min((match.match(/\t/g)||[]).length, min_tab) 
							min_space = Math.min((match.match(/\ /g)||[]).length, min_space)
						})

					}
					
					// Adds a newline at the beginning of the function body if it starts after the first bracket (without a newline). E.g. function() { var a = 2; 
					if ( this.compression < 4 && !/^[\t, ]*[\n,\r]/.test(f_body) )
						this.append_string("indent", denote_line)

					var first_iteration = true

					f_body = f_body.replace(/(^.*)([\n,\r]*)/mg, (function() {

						if ( this.compression === 1 )
							max_blank_line = 2
						else if ( this.compression === 2 )
							max_blank_line = 1
						else if ( this.compression >= 3 )
							max_blank_line = 0

						// This will remove multiple blank lines from the function text pertaining to the compression option.
						var newline = arguments[2].replace(/[\n,\r]/g, function() {
							if ( --max_blank_line > -2 )
								return denote_line
							else
								return ""
						})

						// Remove the initial new line in the very first text output to compress the function body the most without changing its evaluation.
						if ( this.compression > 3 && first_iteration && !(first_iteration = false) )
							newline = ""
 
						// Switch all of the newlines in the text with the one specified in the style_map.
						if ( denote_line !== "\n" )	
							f_body = f_body.replace(/[\n,\r]/g, denote_line)

						// Apply the current indentation of the Object serialization to each line of the function body if the option is enabled.
						if ( this.shift_function_body )
							this.append_string("indent", previous_indent + indent_string)
		 
						var min_t = min_tab, min_s = min_space
						var body = arguments[1] 
							.replace(/^([ ,\t]+)(.*)/, function(full, indent, text) {

								// Remove the minimum amount of tabs from the indent of the line so it is shifted as far left as possible without changing the
								// indentation of the text itself. This is done to apply the indent of the Object it sits in or shift it to hit the left side.
								return indent.replace(/\t/g, function() {
									if ( --min_t > -1 )
										return ""
									else
										return denote_tab 
								}) + text 
							})
							.replace(/^([ ,\t]+)(.*)/, function(full, indent, text) {
								
								// This works the same way as the tab replacement above but removes all of the spaces from the indent.
								return indent.replace(/ /g, function() {
									if ( --min_s > -1 )
										return ""
									else
										return denote_space
								}) + text 
							})

						// Turn all of the tabs into denote_tabs if necessary. This should happen after the replacement above so that the native lines ans spaces
						// can be matched by the regex.
						if ( denote_line !== "\t" )
							body = body.replace(/\t/g, denote_tab)
						// Turn all of the spaces into denote_spaces if necessary.
						if ( denote_space !== " " )
							body = body.replace(/ /g, denote_space)

						this.append_string("function_body", body) 
						this.append_string("indent", newline)
						// There is no need to return a value sense the append_string call is creating the output string.
						return ""

					}).bind(this)) 
					// The trailing newline needs to be removed from the replace loop above.
					this.remove_call(-1)
				} 
			}
			else {
				this.append_string(is_array&&"brace"||"bracket", is_array&&"["||"{" + (this.compression < 3 && denote_space || ""))
			}

			var cnt = 1
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
					this.append_string("namespace", "[[PrimitiveValue]]")
					this.append_string("colon", ":" + compress_separator)
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

				this.append_string("indent", (this.compression < 3 && line_separator || "") + previous_indent)
				this.append_string(is_array&&"brace"||"bracket", is_array&&"]"||"}")
				this.append_string("comma", "," + compress_separator)
			}

			// Object.keys are used here to loop instead of the in operator so that the __proto__ keys are not looped over sense they were handled above.
			for ( var x = 0; x < keys.length; x++ ) {
				var o = keys[x]

				if ( this.plain.length >= this.character_limit )
					return

				// Add the indent string to the beginning of the parsing loop or if the item is an Object. This is the primary formatting controller.
				var is_property_based = !!(typeof msg[o] === "object" && msg[o] !== null && msg[o] !== undefined && key_grab(msg[o]).length )

				if ( cnt !== 1 && this.compression < 2 )
					this.append_string("indent", line_separator + previous_indent + indent_string)
				if ( cnt === 1 || is_property_based ) {
					this.append_string("indent", line_separator + previous_indent + indent_string)
					if ( cnt === 1 && typeof msg.valueOf === "function" && msg.valueOf() !== msg ) {
						this.append_string("namespace", "[[PrimitiveValue]]")
						this.append_string("colon", ":" + compress_separator)
						if ( ! this._serializer(msg.valueOf(), indent_string, previous_indent + indent_string, level+1) )
							return false
						this.append_string("comma", "," + line_separator)
						this.append_string("indent", compress_separator)
					}
					// If the item has a primitive value than it will not be object based equal to it self and therefor the primitive value should be 
					// displayed.
				}
				if ( !is_array ) {
				    // _serializer is used here to format the qualifiers strings if this loop is parsing an object. This should only add numbers and 
					// strings as this
					if ( ! this._serializer(o, undefined, undefined, level, true) )
						return false
					// Object separator makes it more human readable by adding space. This changes with the compression.
					this.append_string("colon", ":" + compress_separator) 				
				}
				// recursively call this function to parse the object. The indent_string is added to the beginning to nest the output. It is important to
				// use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
				// function call keeps the value of level. This way each call to _serializer uses a level incremented by one from the calling _serializer.
	 
				// Here parses nested Objects from within Objects and stops at the level specified in the depth_limit setting. This is good for super massive
				// Objects like browser self, window, jquery and document or for other practical use. Object serialization will stop when the specified depth
				// is reached in an Object which contains more Object to serializer. The Object serialization will be replaced with a String describing the 
				// Object. Any non-literal Objects will be printed on the last depth parsing level (which is what the !is_property_based test is for).
				if ( level < this.depth_limit-1 || !is_property_based ) {
					if ( ! this._serializer(msg[o], indent_string, previous_indent + indent_string, level+1) )
						return false
				} else {
					var len = key_grab(msg[o]).length
					this.append_string("namespace", new this.parent({style: false}).add("<..", is_array && "Array" || "object", " with ", len, " propert")
					   .add(len === 1 && "y" || "ies", ">")
					)
				}

				this.append_string("comma", "," + compress_separator)
				// These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
				if ( cnt === keys.length ) {

					// This happens when the Object is a primitive value with Object keys set (new String("abc"). The length property will not be added
					// sense it is a property of the primitive value (not the Object). Therefore the length property is added as a design choice.
					if ( is_primitive_object && typeof msg.length !== "undefined" ) {
	 
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
					this.append_string("indent", line_separator + previous_indent)
					this.append_string(is_array&&"brace"||"bracket", is_array&&"]"||"}")
					this.append_string("comma", "," + compress_separator)
				}
				cnt++
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

			if ( this._cache.length ) {
				if ( !is_qualifier || this.quote_qualifier )
					this.append_string("quote", this.denote_quoting)
				this.append_string("string", msg)
				if ( !is_qualifier || this.quote_qualifier )
					this.append_string("quote", this.denote_quoting)
			} else {
				this.append_string("string", msg)
			}
		}
		else {
			this.append_string("namespace", msg)
		}
		
		// Only the original call to serialize and non-object calls will return level as undefined so the object array is reset to free up the object links.
		if ( this._cache.length && typeof level !== "number" )
			this._cache = []	

		return true
	}

})

