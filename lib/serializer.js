
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {

	return function(msg, indent_string, previous_indent, level) {
	  // The Object to text parsing engine. This function will print any Object passed to it (including function text), in the most literal way possible.
	  // It can be recursively called within itself and also accepts modifiers to alter output. The indent_string argument contains how the
	  // subsequent Object levels will separate from the left margin. The indent_string is multiplied by the Object level when looping through
	  // adding the indent_string to the previous_indent (which is expanding), every time an Object is parsed while already parsing an Object
	  // (calling _serializer inside _serializer). This member can not be called outside this script with out breaking the overlying
	  // functionality of this script. The previous_indent argument/parameter will be placed at the start of each new object in the output (used internally).

	  // Store text adds platform dependent color syntax the strings passed in a parameters. The stings are stored internally in the store text
	  // instance until formatted or plain properties are accessed (it uses a getter).

	  // A simple way to stop Object parsing when the output becomes too large. The actual size of the internal string is maintained by the color addon.
	  if ( this.plain.length >= this.character_limit )
		 return

	  indent_string = typeof indent_string === "string" && indent_string || (this.style_map[this.platform].denote_space + this.style_map[this.platform].denote_space)
	  level = parseInt(level) || 0
	  previous_indent = previous_indent && previous_indent.toString() || ""

	  var compress_separator, line_separator = ""
	  if ( this.compress_level > 3 ) {
		 // There will be no indents, spaces or lines at the highest compression level.

		 indent_string = ""
		 compress_separator = ""
		 line_separator = ""
	  }
	  else if ( this.compress_level === 3 ) {
		 // No indents and lines are spaces as well.
		 indent_string = ""
		 compress_separator = this.style_map[this.platform].denote_space.toString()
		 line_separator = this.style_map[this.platform].denote_space.toString()
	  }
	  else if ( this.compress_level === 2 ) {

		 compress_separator = this.style_map[this.platform].denote_space.toString()
		 line_separator = this.style_map[this.platform].denote_line.toString()
	  }
	  else {
		 // The lowest compression settings are the same as the second most above (two), except some of the logic in the Object serializer below.

		 compress_separator = this.style_map[this.platform].denote_space.toString()
		 line_separator = this.style_map[this.platform].denote_line.toString()
	  }
	  if ( msg instanceof (this.parent || function(){}) ) {

		this._serializer(msg.toString())
	  }
	  else if ( msg === null ) {

		this.append_string("null", "null")
	  }
	  else if ( typeof msg === "boolean" ) {

		this.append_string("boolean", msg.toString())
	  }
	  else if ( msg !== msg ) { // NaN is the only js object which is not equal to itself

		this.append_string("not_a_number", "NaN")
	  }
	  else if ( msg instanceof Error ) {

		var stack_string = msg.stack.split("\n")
		this.append_string("namespace", stack_string.splice(0,1) + line_separator)
		this.append_string("function_body", stack_string.join(line_separator))
	  }
	  else if ( typeof msg === "undefined" ) {

		this.append_string("undefined", "undefined")
	  }
	  else if ( typeof Buffer !== "undefined" && msg.__proto__ && msg.__proto__.constructor === Buffer ) {

		this._serializer(msg.toString())
	  }
	  else if ( typeof msg === "object" || typeof msg === "function" ) {
		 // Here is the man object parsing function. It will print all of the data from a Object including functions and prototypes.
		 var key_grab = !this.enumerate_all && Object.keys || Object.getOwnPropertyNames
		 this._is_from_object = true
		 var keys = key_grab(msg), is_primitive_object = false
		 this._cache[level] = this._cache[level] || []
		 // There is no need to put primitive Objects into the cache sense they are never circular dependencies to another one.
		 if ( typeof msg === "object" && typeof msg.valueOf === "function" && msg.valueOf() !== msg ) {
			is_primitive_object = true
		 } else {
			this._cache[level].push(msg)
		 }

		 for ( var n = 0; n < level; n++ ) {
			for ( var x = 0; x < this._cache[n].length; x++ ) {
			  if ( typeof msg === "object" && msg === this._cache[n][x] ) {
				 // Circular reference found, discard object processing

				 var circ_text = "[[Circular duplicate of "
				 var obj_qualifier = key_grab(this._cache[n][x])
				 obj_qualifier.unshift("")
				 obj_qualifier = obj_qualifier.join(" "+(this._cache[n-1]&&this._cache[n-1][x]||"<-"))
				 if ( circ_text.length+obj_qualifier.length > 75 )
				 obj_qualifier = obj_qualifier.substr(0, 71-circ_text.length) + ".."

				 this.append_string("namespace", circ_text)
				 this.append_string("bracket", "{"+compress_separator)
				 this.append_string("function_body", obj_qualifier)
				 this.append_string("bracket", compress_separator+"}")
				 this.append_string("namespace", "]]")
				 return
			  }
			}
		 }
		 var is_array = msg.constructor === Array
		 if ( typeof msg === "function" ) {

			// This regex will strip out the function: declaration, name, parameters and body. The body is only parsed for indentation and will use the string
			// provided as indent string.
			var f_str = msg.toString().match(/function(?:\ |\n)*(\S*)\(([^\)]*)\)(?:\ |\n)*\{((?:.|\n)*)\}(?:\ |\n)*/i) || []
			var f_name = f_str[1] || ""
			var f_parameter = f_str[2] || ""
			var f_body = f_str[3] || ""

			this.append_string("namespace", "function ")
			this.append_string("string", f_name)
			var param = f_parameter.split(",")
			// The parameter list is striped from the function text which will produce an Array containing an empty string if no parameters are used in the
			// Function. E.g. function(cool) -> ["cool"], function() -> [""]. The parenthesis will only have space (compress_separator), if parameters are
			// used in the function. Note: the compress_separator adjusts pending the this.compress_level.
			this.append_string("bracket", "(" + (param[0] && compress_separator || ""))

			// Make the parameter string from the list
			param.forEach(function(val) {
			  this.append_string("parameter", val)
			  this.append_string("comma", ",")
			}, this)

			// Remove the last comma from the parameter string
			this.remove_call(-1)
			this.append_string("bracket", (param[0] && compress_separator || "") + ")" + compress_separator)
			this.append_string("bracket", "{" + compress_separator)

			if ( !this.truncate_function ) {

			  // Replace the first line with a new line if contains text before a newline so that it is always printing with a newline after
			  // the function declaration.
			  var body_indent = previous_indent + indent_string 
			  // This needs to be what the actual newline is for the platform because function text must maintain newlines to function properly.
			  // Replace every newline in the function string with current indentation string the text and then the desired newline.
			  var has_end_new_line = true
			  if ( ! /\n/.test(f_body) )
				 f_body = "\n" + f_body + "\n"
			  f_body.replace(/(.*)(\n+)/g, (function() {
				 // If line was only white space or newlines than it can be removed from processing if the compress level is high enough.

				 var has_ascii = arguments[1].replace(/\s*/g, "")
				 if ( this.compress_level >= 4 && !has_ascii )
					return ""
				 // More than two newlines will be replace with two newlines when compression levels are two or three
				 if ( ( this.compress_level === 2 || this.compress_level === 3) && /\n{2,}/.test(arguments[2]) )
					arguments[2] = "\n\n"

				 // The indent string should not be used if the line contains no ascii characters (this avoids indent strings where there
				 // only is white space in a black line.
				 if ( has_ascii  )
					this.append_string("indent", body_indent)

				 has_end_new_line = false
				 var indent = this.style_map[this.platform].denote_line.toString()
				 if ( this.compress_level < 4 ) {
					var newline = arguments[2].match(/\n/g)
					newline.pop()
					newline.forEach(function() {
					  has_end_new_line = true
					  indent += this.style_map[this.platform].denote_line.toString()
					})
				 }
				 this.append_string("function_body", arguments[1]||"")
				 this.append_string("indent", indent)
			  }).bind(this)) // End of f_body.replace function
			  if ( !has_end_new_line )
				 this.remove_call(-1)
			} // End of if  truncate_function
			else {
			  this.append_string("function_body", compress_separator + "..." + compress_separator)
			}
		 }
		 else {
			this.append_string(is_array&&"brace"||"bracket", is_array&&"["||"{" + (this.compress_level < 3 && this.style_map[this.platform].denote_space.toString() || ""))
		 }

		 var cnt = 1
		 if ( !keys.length ) {

			if ( msg.__proto__ && typeof msg.__proto__ === "object" && key_grab(msg.__proto__).length ) {

				 this.append_string("indent", line_separator + previous_indent + indent_string)
				 this.append_string("namespace", "__proto__")
				 this.append_string("colon", ":" + compress_separator)
				 this._serializer(msg.__proto__, indent_string, previous_indent + indent_string, level+1)

			  if ( is_primitive_object ) {

				 this.append_string("indent", line_separator + previous_indent + indent_string)
				 this.append_string("namespace", "[[PrimitiveValue]]")
				 this.append_string("colon", ":" + compress_separator)
				 this._serializer(msg.valueOf(), indent_string, previous_indent + indent_string, level+1)
				 this.append_string("comma", "," + compress_separator)
				 // This happens when the Object is a primitive value with Object keys set (new String("abc"). The length property will not be added
				 // sense it is a property of the primitive value (not the Object). Therefore the length property is added as a design choice.
				 if ( typeof msg.length !== "undefined" ) {
					this.append_string("indent", line_separator + previous_indent + indent_string)
					this.append_string("string", "length")
					this.append_string("colon", ":" + compress_separator)
					this._serializer(msg.length, indent_string, previous_indent + indent_string, level+1)
					this.append_string("comma", "," + compress_separator)
				 }
				 this.remove_call(-1)
			  }
			}
			this.append_string("indent", line_separator + previous_indent)
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

			if ( cnt !== 1 && this.compress_level < 2 )
			  this.append_string("indent", line_separator + previous_indent + indent_string)
			if ( cnt === 1 || is_property_based ) {
			  this.append_string("indent", line_separator + previous_indent + indent_string)
			  if ( cnt === 1 && typeof msg.valueOf === "function" && msg.valueOf() !== msg ) {
				 this.append_string("namespace", "[[PrimitiveValue]]")
				 this.append_string("colon", ":" + compress_separator)
				 this._serializer(msg.valueOf(), indent_string, previous_indent + indent_string, level+1)
				 this.append_string("comma", "," + line_separator)
				 this.append_string("indent", compress_separator)
			  }
			  // If the item has a primitive value than it will not be equal to it self and therefor the primitive value should be displayed.
			}
			if ( !is_array ) {
			  // _serializer is used here to format the qualifiers strings if this loop is parsing an object. This should only add numbers and strings as this
			  // is the only type of qualifiers ecma allows (for now:).
			  this._serializer(o)
			  this.append_string("colon", ":" + compress_separator) // Object separator makes it more human readable by adding space. This changes with the compress_level.
			}
			// recursively call this function to parse the object. The indent_string is added to the beginning to nest the output. It is important to
			// use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
			// function call keeps the value of level. This way each call to _serializer uses a level incremented by one from the calling _serializer.

			// Here parses nested Objects from within Objects and stops at the level specified in the depth_limit setting. This is good for super massive
			// Objects like browser self, window, jquery and document or for other practical use. Object serialization will stop when the specified depth
			// is reached in an Object which contains more Object to serializer. The Object serialization will be replaced with a String describing the Object.
			// Any non-literal Objects will be printed on the last depth parsing level (which is what the !is_property_based test is for).
			if ( level < this.depth_limit-1 || !is_property_based ) {
			  this._serializer(msg[o], indent_string, previous_indent + indent_string, level+1)
			} else {
			  var len = key_grab(msg[o]).length
			  this.append_string("namespace", new this.parent().add("[[", is_array && "Array" || "Object", " with ", len, " propert")
			  .add(len === 1 && "y" || "ies", "]]")
			  )
			}

			this.append_string("comma", "," + compress_separator)
			// These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
			if ( cnt === keys.length ) {

			  // This happens when the Object is a primitive value with Object keys set (new String("abc"). The length property will not be added
			  // sense it is a property of the primitive value (not the Object). Therefore the length property is added as a design choice.
			  if ( is_primitive_object && typeof msg.length !== "undefined" ) {

				 this.append_string("indent", line_separator + previous_indent + indent_string)
				 this.append_string("string", "length")
				 this.append_string("colon", ":" + compress_separator)
				 this._serializer(msg.length, indent_string, previous_indent + indent_string, level+1)
				 this.append_string("comma", "," + compress_separator)
			  }
			  // Remove the last comma from the item list and add the newline and indentation.
			  this.remove_call(-1)

			  if ( msg.__proto__ && typeof msg.__proto__ === "object" && Object.keys(msg.__proto__).length ) {

				 this.append_string("comma", "," + compress_separator)
				 this.append_string("indent", line_separator + previous_indent + indent_string)
				 this.append_string("namespace", "__proto__")
				 this.append_string("colon", ":" + compress_separator)
				 this._serializer(msg.__proto__, indent_string, previous_indent + indent_string, level+1)
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
		 this._is_from_object = !!level
	  }
	  else if ( typeof msg === "number" ) {

		this.append_string("number", msg.toString())
	  }
	  else if ( typeof msg === "string" ) {
		// The quotes are only added if this _serializer call was called from another _serializer call. Otherwise all calls with strings would have quotes.

		 if ( this._is_from_object ) {
			this.append_string("quote", this.denote_quoting)
			this.append_string("string", msg)
			this.append_string("quote", this.denote_quoting)
		 } else {
			this.append_string("string", msg)
		 }
	  }
	  else {
		 // Nothing should be able to get here as all of the types of str should be caught above.
		 this.append_string("namespace", msg.toString())
	  }
	  return this.style_map[this.platform]
	}

})

