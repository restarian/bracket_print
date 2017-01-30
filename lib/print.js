/*
  Brackit Print is a printing and logging tool for javascript engines which suppies litteral ECMA Object serialization.

 Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit Print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Brackit Print is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/// Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com>

var Print = function() {

  // Call the constructor with the same arguments as initially called with as a new instance if it was not done so.
  if ( !(this instanceof Print) ) {
    var call_instance = Print
    for ( var x = 0; x < arguments.length; x++ )
       call_instance = call_instance.bind(call_instance.prototype, arguments[x])
    return new call_instance()
  }

  for ( var x = 0; x < arguments.length; x++ ) {
    if ( arguments[x] instanceof Print ) {
      var copy = arguments[x]._mutable_options
      for ( var o in copy )
        this[o] = copy[o]
    } else {
      this.set_option(arguments[x])
    }
  }

  // simple placeholder data until the chain command is called and this.bufferize will be set relating to the platform
  this.bufferize = {plain: "", formated: "", remove_call: function(){}}

  this._old_platform = ""
  this._last_command = null
  this._output = ""
  this._colorless_output = ""
  this._cache = []
  this._is_from_object = false
  // This may be included when another Print instance is passed into this constructor for a settings copy.
}

// These options are created two levels deep (__proto__.__proto__), into the Print() prototype chain. All of these options are user configurable
// withing the library but these properties themselves ares only used as defaults sense there is no way to change them with the library api
// (Print().__proto__.__proto__ is the only way). If the prototype is set (e.g. Print.prototype.level = 3), ir the instance data, it will be used
// instead of these values. A call to delete Print.prototype.level and.or Print().level will revert back to the default values (below).
Print.prototype = Object.create(
  {
    level: 1,
    use_color: true,
    use_title_stamp: true,
    log_title: "",
    theme: "light",
    compress_level: 2,
    use_title: true,
    indentation_string: "   ",
    platform: typeof this.platform !== "undefined" ? this.platform : typeof module === "object" && "terminal" || "browser",
    depth_limit: 130,
    character_limit: Math.pow(2,28),
    compress_function: false,
    denote_quoting: "\"",
    _set_level: [-Infinity, Infinity],
    internal_level: 2,
  }
)

// The simple list of user configurable options which is more convenient to make at library load time. This will need to be set again if options are
// added in run-time.
Print.prototype.mutable_options = Object.keys(Print.prototype.__proto__)

Print.prototype.__defineGetter__("_mutable_options", function() {
  // This member sends back an Object which represents the current user configurable data. The data is pulled from the Object.keys of the defaults and
  // then populated with the highest priority value (top most in the prototype chain).
  var opt = {}
  this.mutable_options.forEach(function(val) {
    opt[val] = this[val]
  }, this)
  return opt
})
Print.prototype.toColorString = function() {
    // These two members return strings so no chaining mechanism is uitlized (like a getter returning a function which returns the instance).

  return this.bufferize.formated
}
Print.prototype.toString = function() {
  // The text created and stored which has parsed data pertaining to the current platform.

  return this.bufferize.plain
}
Print.prototype._internal_set = function(n, v) {
  // This is used so that set_option can set mutable options to the prototype instance data. This is an overide to all other mutable data.
  this[n] = v
}
Print.prototype.set_option = function() {
  // The other way of setting the options which resturns this for call chain and Object storage purposes.

 // this is passed into the this (Print), contstuctor so that the current settings will be saved.
 var p = this._is_chained && this || Print(this)
 p._is_chained = true

  for ( var i = 0; i < arguments.length; i++ ) {
    // Objects, Print() instances and Strings can be passed into the set_option method. Any Strings will be used to set the log_title options.
    // Objects passed in after other Objects will overide the previous Object data set so that the last Object in the parameter list is has the
    // highest priority.

    if ( typeof arguments[i] === "string" )
      arguments[i] = {log_title: arguments[i]}
    if ( arguments[i] instanceof Print )
      arguments[i] = arguments[i].mutable_options

    for ( var n in arguments[i] ) {
      if ( n in p ) {
        p._internal_set(n, arguments[i][n])
      } else {
        p.new_copy({level: this.internal_level})
          .sp("Option", n, "is not a brackit print option. Use ._mutable_options to see all user configurable options:")
          .line(this.mutable_options).log()
      }
    }
  }
  return p
}
Print.prototype.new_copy = function() {
  // This is how Print transfers options to other Print instances. It is best to make a singal Print object and then and pass the copy into another Print copy.
  // It is in this way that all of the Print objects contain inherit settings and then can have the options changed individually if nessesary. This function
  // parameters work the same way as the set_option member and Print constructor.

    var call_instance = Print
    for ( var x = 0; x < arguments.length; x++ )
       call_instance = call_instance.bind(call_instance.prototype, arguments[x])

  return call_instance()
}

// These are globally set settings which are changed to control the printing of messages from within this library.
Print.prototype.__defineSetter__("set_level", function(value) {

  // TODO: Ranges should incorporate negitve numbers too somehow.
  if ( value === "all" || value === "" )
    return this._set_level = [-Infinity, Infinity]
  if ( value*"2" === value*"2" )
    return this._set_level = [parseInt(value), parseInt(value)]

  this._set_level = parsed = []
  Object.prototype.toString.call(value).replace(/\ +/g, "").split(",").forEach(function(val) {

    if ( !val )
      return

    var range = val.split("-")
    if ( parseInt(range[0]) !== parseInt(range[0]) )
      return Print({level: this.internal_level}).log("The value set to set_level can not be parsed as an integer:", range[0])
    parsed.push(parseInt(range[0]))
    if ( range.length < 2 )
      range[1] = range[0]
    else if ( parseInt(range[1]) !== parseInt(range[1]) )
      Print({level: this.internal_level}).log("The value set to set_level can not be parsed as an integer:", range[1])

    parsed.push(parseInt(range[1]))
  })
  this._set_level = parsed
})
Print.prototype.__defineGetter__("set_level", function() {

  return this._set_level
})
Print.prototype.__defineGetter__("clear", function() {
   // Remove all of the text storage from the current Print instance.

   return (function() {
     this.bufferize.remove_call(0)
     return this
   }).bind(this)
 })
 //----------------------------------------------------------------------------
 Print.prototype.__defineGetter__("sp", function() { // Alias for space. This creates text with a white space used for seperation.

   return this._print_command("space")
 })
 Print.prototype.__defineGetter__("space", function() {

   return this._print_command("space")
 })
 Print.prototype.__defineGetter__("tab", function() {

   return this._print_command("tab")
 })
 Print.prototype.__defineGetter__("line", function() { // This creates text with a carrage return used for seperation of parameters.

   return this._print_command("line")
 })
 Print.prototype.__defineGetter__("add", function() {

   return this._print_command("add")
 })
 // ---------------------------------------------------------------------------
 // Here are all of the print commands which ease string formation.
 Print.prototype._print_command = function(call_name) {

   // This is used internally whenever a input memeber is called. The _chain is a pre-cursor for the _serialize memeber which converts Objects to text.
   // this is passed into the Print contstuctor so that the current settings will be saved.
   var p = this._is_chained && this || Print(this)
   p._is_chained = true
   p._last_command = call_name
   return (function() {

     for ( var x = 0; x < this.set_level.length; x += 2 )
       if ( this.level >= this.set_level[x] && this.level <= this.set_level[x+1] ) {
         return this._chain.apply(this, arguments)
      }
      return this

   }).bind(p)
 }
 Print.prototype.__defineGetter__("_chain", function() {
   // This is the main printing member.
   return function() {
     // This happens when the platform option is changed after the constructing (first), print command is called.
     if ( this._old_platform.toLowerCase() !== this.platform.toLowerCase() ) {
       this._old_platform = this.platform
       // Every instance of this needs to have its own intance of the bufferize prototype so that text can be stored using the internal buffer.
       this.bufferize = new Print[this.platform.toLowerCase()]
     }

     var indentation = this.indentation_string.replace(/\t/g, this.bufferize.denote_tab).replace(/\n/g, this.bufferize.denote_line).replace(/\ /g, this.bufferize.denote_space)

     this._cache = []
     for ( var i = 0; i < arguments.length; i++ ) {

       // Empty the Object processing cache which is used to endure Circular object references do not occur within printing.
       if ( this.bufferize.plain.length && typeof this.bufferize["denote_"+this._last_command] !== "undefined" ) {
         // Add the last separator relating to the previous printing command called
         this.bufferize.plain += this.bufferize["denote_"+this._last_command]
         this.bufferize.formated += this.bufferize["denote_"+this._last_command]
       }

       // The buffer will be clear here for each argument passed in to the print command.
       this._serialize(arguments[i], indentation)
       this.bufferize.formated += this.bufferize.closing_tag||""
       this._cache = []
     }
     return this
   }
 })
 Print.prototype.__defineGetter__("log", function() {

   // this is passed into the this (Print), contstuctor so that the current settings will be saved.
   var p = this._is_chained && this || Print(this)
   p._is_chained = true
   return (function() {

     var in_range = false
     for ( var x = 0; x < this.set_level.length; x += 2 )
       if ( this.level >= this.set_level[x] && this.level <= this.set_level[x+1] ) {
          in_range = true
          break
      }

   if ( !in_range )
      return this

     if ( arguments.length > 0 ) {
       // Call the last command used before this log again.
       if ( this[this._last_command] ) {
        this[this._last_command].apply(this, arguments)
       }
       else {
         this.space.apply(this, arguments)
       }
     }

     if ( this.bufferize.formated ) {
       // Append the logging title if there is one set and then turn the entire output string
       // into an array to pass with the console.log.apply

       color_copy = new Print[this.platform.toLowerCase()]
       color_copy.theme = this.theme + "_level_" + this.level
       var title = ""
       if ( this.use_title && (this.log_title || this.use_title_stamp) )
          title = "[" + (this.use_title_stamp && new Date() || "") + (this.use_title_stamp && this.log_title&&" - "||"") + this.log_title + "] "

       color_copy.title(title)

       var c_args = [(color_copy.formated||color_copy.plain)+this.bufferize.formated]
       // append any css arguments if the browser segment of our custom bufferize object was utilized
       if ( this.platform.toLowerCase() === "browser" ) {
         c_args = c_args.concat(color_copy.css_arguments).concat(this.bufferize.css_arguments)
       }
       console.log.apply(console, c_args)
     }
     return this
   }).bind(p)
 })
 Print.prototype.__defineGetter__("log_false", function() {
   // These will return true/false regardless of the debuffing state as well.

   return (function() {
     this.log.apply(this, arguments)
     return false
   }).bind(this)
 })
 Print.prototype.__defineGetter__("log_true", function() {
   // These will return true/false regardless of the debuffing state as well.

   return (function() {
     this.log.apply(this, arguments)
     return true
   }).bind(this)
 })
 Print.prototype.__defineGetter__("log_null", function() {
   // These will return true/false regardless of the debuffing state as well.

   return (function() {
     this.log.apply(this, arguments)
     return null
   }).bind(this)
 })
 Print.prototype.__defineGetter__("log_empty", function() {
   // These will return true/false regardless of the debuffing state as well.

   return (function() {
     this.log.apply(this, arguments)
     return ""
   }).bind(this)
 })
 Print.prototype._serialize = function(msg, indent_string, previous_indent, level) { // previous_indent will be placed at the start of each new object in the output (used internally)
   // The Object to text parsing engine. this function will print any Object passed to it (including function text), in the most litteral way possible.
   // It can be recursively called within itself and also accepts modifiers to alter output. The indent_string argument contains how the
   // subsequent Object levels will seperate from the left margin. The indent_string is multiplied by the Object level when looping through
   // adding the indent_string to the previous_indent (which is expanding), every time an Object is parsed while already parsing an Object
   // (calling _serialize inside _serialize). this member can not be called outside this script with out breaking the the overlying
   // functionality of this script.

   // Store text adds platform dependant color syntax the strings passed in a parameters. The stings are stored internnally in the store text
   // instance untill formated or plain properties are accessed (it uses a getter).
   this.bufferize.theme = this.theme + "_level_" + this.level
   this.bufferize.character_limit = this.character_limit

   // A simple way to stop Object parsing when the output becomes too large. The actuall size of the interanll string is maintained by the color addon.
   if ( this.bufferize.plain.length >= this.character_limit )
    return

   indent_string = typeof indent_string === "string" && indent_string || (this.bufferize.denote_space.toString()+this.bufferize.denote_space.toString())
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
      compress_separator = this.bufferize.denote_space.toString()
      line_separator = this.bufferize.denote_space.toString()
    }
    else if ( this.compress_level === 2 ) {

      compress_separator = this.bufferize.denote_space.toString()
      line_separator = this.bufferize.denote_line.toString()
    }
    else {
      // The lowest compression settings are the same as the sencond most above (two), except some ligic in the Object serializer below.

      compress_separator = this.bufferize.denote_space.toString()
      line_separator = this.bufferize.denote_line.toString()
    }
   if ( msg instanceof Print ) {

     this._serialize(msg.toString())
   }
   else if ( msg === null ) {

     this.bufferize.null("null")
   }
   else if ( typeof msg === "boolean" ) {

     this.bufferize.boolean(msg.toString())
   }
   else if ( msg !== msg ) { // NaN is the only js object which is not equal to itself

     this.bufferize.not_a_number("NaN")
   }
   else if ( msg instanceof Error ) {

     var stack_string = msg.stack.split("\n")
     this.bufferize.namespace(stack_string.splice(0,1) + line_separator)
     this.bufferize.function_body(stack_string.join(line_separator))
   }
   else if ( typeof msg === "undefined" ) {

     this.bufferize.undefined("undefined")
   }
   else if ( typeof Buffer !== "undefined" && msg.__proto__ && msg.__proto__.constructor === Buffer ) {

     this._serialize(msg.toString())
   }
   else if ( typeof msg === "object" || typeof msg === "function" ) {
     // Here is the man object parsing function. It will print all of the data from a Object including functions and prototypes.

     this._is_from_object = true
     var keys = Object.keys(msg)
     this._cache[level] = this._cache[level] || []
     // There is no need to put native Objects into the cache sense they are never circular dependantcies in there selves.
     if ( keys && typeof msg === "object" && typeof msg.valueOf === "function" && msg.valueOf() === msg )
        this._cache[level].push(msg)

     for ( var n = 0; n < level; n++ ) {
       for ( var x = 0; x < this._cache[n].length; x++ ) {
         if ( typeof msg === "object" && msg === this._cache[n][x] ) {
           // Circular reference found, discard object processing
           var circ_text = "[[Circular duplicate of "
           var obj_qualifier = Object.keys(this._cache[n][x])
           obj_qualifier.unshift("")
           obj_qualifier = obj_qualifier.join(" "+(this._cache[n-1]&&this._cache[n-1][x]||"<-"))
           if ( circ_text.length+obj_qualifier.length > 75 )
              obj_qualifier = obj_qualifier.substr(0, 71-circ_text.length) + ".."

           this.bufferize.namespace(circ_text)
           this.bufferize.scope_container("{"+compress_separator)
           this.bufferize.function_body(obj_qualifier)
           this.bufferize.scope_container(compress_separator+"}")
           this.bufferize.namespace("]]")
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

       this.bufferize.namespace("function ")
       this.bufferize.string(f_name)
       var param = f_parameter.split(",")
       // The parameter list is striped from the function text which will produce an Array containing an empty string if no parameters are used in the
       // Function. E.g. function(cool) -> ["cool"], function() -> [""]. The parenthisis will only have space (compress_separator), if parameters are
       // used in the function. Note: the compress_separator adjusts pending the this.compress_level.
       this.bufferize.scope_container("(" + (param[0] && compress_separator || ""))

       // Make the parameter string fro the list
       param.forEach(function(val) {
         this.bufferize.variable(val)
         this.bufferize.comma(",")
       })

       // Remove the last comma from the parameter string
       this.bufferize.remove_call(-1)
       this.bufferize.scope_container((param[0] && compress_separator || "") + ")" + compress_separator)
       this.bufferize.scope_container("{" + compress_separator)

       if ( !this.compress_function ) {

         // Replace the first line with a new line if contains text before a newline so that it is always printing with a newline after
         // the function declaration.
         var body_indent = previous_indent + indent_string, compress_level = this.compress_level
        // This needs to be what the actual newline is for the platform because function text must maintain newlines to function properly.
         var bufferize = this.bufferize
         // Replace every newline in the function string with current indentation string the text and then the desired newline (this.bufferize.denote_line).
         var has_end_new_line = true
         if ( ! /\n/.test(f_body) )
            f_body = "\n" + f_body + "\n"
         f_body.replace(/(.*)(\n+)/g, function() {
           // If line was only white space or newlines than it can be removed from processing if the compress level is high enough.
           var has_ascii = arguments[1].replace(/\s*/g, "")
           if ( compress_level >= 4 && !has_ascii )
             return ""
           // More than two newlines will be replace with two newlines when compression levels are two or three
           if ( ( compress_level === 2 || compress_level === 3) && /\n{2,}/.test(arguments[2]) )
              arguments[2] = "\n\n"

           // The indent string should not be used if the line contains no ascii characters (this avoids indent strings where there
           // only is whotespace in a balck line.
           if ( has_ascii )
            bufferize.indent(body_indent)

           has_end_new_line = false
           var indent = bufferize.denote_line
           if ( compress_level < 4 ) {
             var newline = arguments[2].match(/\n/g)
             newline.pop()
             newline.forEach(function() {
               has_end_new_line = true
               indent += line_denote
             })
           }

           this.bufferize.function_body(arguments[1]||"")
           this.bufferize.indent(indent)
         })
         if ( !has_end_new_line )
          this.bufferize.remove_call(-1)
       } else {
         this.bufferize.function_body(compress_separator + "..." + compress_separator)
       }
     }
     else {
       this.bufferize.scope_container(is_array&&"["||"{" + (this.compress_level < 3 && this.bufferize.denote_space || ""))
     }

     var cnt = 1
     if ( !keys.length ) {
        if ( typeof msg.__proto__ === "object" && Object.keys(msg.__proto__).length ) {
        this.bufferize.indent(line_separator + previous_indent + indent_string)
        this.bufferize.namespace("__proto__")
        this.bufferize.colon(":" + compress_separator)
        this._serialize(msg.__proto__, indent_string, previous_indent + indent_string, level+1)
      }
      this.bufferize.indent(line_separator + previous_indent)
      this.bufferize.scope_container(is_array&&"]"||"}")
      this.bufferize.comma("," + compress_separator)
     }

     // Object.keys are used here to loop instead of the in operator so that the __proto__ keys are not looped over sense they were handled above.
     for ( var x = 0; x < keys.length; x++ ) {
       var o = keys[x]

       if ( this.bufferize.plain.length >= this.character_limit )
        return

       // Add the indent string to the begining of the parsing loop or if the item is an Object. this is the primary formating controler.
       var is_literal_object = !!(typeof msg[o] === "object" && msg[o] !== null && msg[o] !== undefined && (Object.keys(msg[o]).length ) )

       if ( cnt !== 1 && this.compress_level < 2 )
        this.bufferize.indent(line_separator + previous_indent + indent_string)
       if ( cnt === 1 || is_literal_object ) {
         this.bufferize.indent(line_separator + previous_indent + indent_string)
         if ( cnt === 1 && typeof msg.valueOf === "function" && msg.valueOf() !== msg ) {
           this.bufferize.namespace("[[PrimitiveValue]]")
           this.bufferize.colon(":" + compress_separator)
           this._serialize(msg.valueOf(), indent_string, previous_indent + indent_string, level+1)
           this.bufferize.comma("," + line_separator)
           this.bufferize.indent(compress_separator)
         }
         // If the item has a primitive value than it will not be equal to it self and therefor the primitive value should be displayed.
       }
       if ( !is_array ) {
         // _serialize is used here to format the qualifiers strings if this loop is parsing an object. This should only add numbers and strings as this
         // is the only type of qualifiers ecma allows (for now:).
         this._serialize(o)
         this.bufferize.colon(":" + compress_separator) // Object separator makes it more human readable by adding space. This changes with the compress_level.
       }
       // recursively call this function to parse the object. The indent_string is added to the begining to nest the output. It is important to
       // use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
       // function call keeps the value of level. this way each call to _serialize uses a level incremented by one from the calling _serialize.

       // Here parses nested Objects from within Objects and stops at the level specified in the depth_limit setting. this is good for super massive
       // Objects like browser self, window and document.
         if ( level < this.depth_limit-1 ) { //|| !is_literal_object ) {
            this._serialize(msg[o], indent_string, previous_indent + indent_string, level+1)
         } else {
            this.bufferize.namespace("[["+(is_array && "Array" || "Object") + " with "+(keys.length)+" properties]]")
         }

         this.bufferize.comma("," + compress_separator)
         // These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
       if ( cnt === keys.length ) {
         // Remove the last comma from the item list and add the newline and indentation.
         this.bufferize.remove_call(-1)

       //var is_object = !!(typeof msg === "object" && msg !== null && msg !== undefined && (Object.keys(msg).length ) )
         if ( typeof msg.__proto__ === "object" && Object.keys(msg.__proto__).length ) {

            this.bufferize.comma("," + compress_separator)
            this.bufferize.indent(line_separator + previous_indent + indent_string)
            this.bufferize.namespace("__proto__")
            this.bufferize.colon(":" + compress_separator)
            this._serialize(msg.__proto__, indent_string, previous_indent + indent_string, level+1)
         }
          this.bufferize.indent(line_separator + previous_indent)
          this.bufferize.scope_container(is_array&&"]"||"}")
          this.bufferize.comma("," + compress_separator)
       }
       cnt++
     }

     // Remove the last comma from the parsing output. It is the last thing to be stored so a simple call to remove the last call will surfice.
     this.bufferize.remove_call(-1)
     // A Object will always have a level. It is set as soon as Object parsing begins.
     if ( !level )
       this._is_from_object = false
   }
   else if ( typeof msg === "number" ) {

     this.bufferize.number(msg.toString())
   }
   else if ( typeof msg === "string" ) {
     // The quotes are only added if this _serialize call was called from another _serialize call. Otherwise all calls with strings would have quotes.

     if ( this._is_from_object ) {
         this.bufferize.quote(this.denote_quoting)
         this.bufferize.string(msg)
         this.bufferize.quote(this.denote_quoting)
     } else {
       this.bufferize.string(msg)
     }
   }
   else {
     // Nothing should be able to get here as all of the types of str should be caught above.
     this.bufferize.namespace(msg.toString())
   }
   return this.bufferize
 }

var color_map = {

 html: Object.create({
   light_level_1: {
      quote: "color: #454343; font-weight: bold;",
      number: "color: green; font-weight: bold",
      string: "color: #b91db3; font-weight: bold",
      function_body: "color: #656565; font-weight: bold",
      not_a_number: "color: #249e93; font-weight: bold",
      null: "color: #249e93; font-weight: bold",
      boolean: "color: red; font-weight: bold",
      comma: "color: #323232; font-weight: bold",
      undefined: "color: #f4d400; font-weight: bold",
      scope_container: "color: #286f4f; font-weight: bold",
      colon: "color: #363533; font-weight: bold",
      namespace: "color: #690900; font-weight: bold", // E.g. .__proto__ [[PrimitiveValue}}
      indent: "color: #c2bab8; font-weight: bold",
      title: "color: #303030; font-weight: bold",
      variable: "color: #4a6a27; font-weight: bold",

   },
   light_level_2: {
      quote: "color: #454343;",
      number: "color: green",
      string: "color: #b91db3",
      function_body: "color: #656565",
      not_a_number: "color: #249e93",
      null: "color: #249e93; font-weight: bold",
      boolean: "color: red",
      comma: "color: #323232",
      undefined: "color: #f4d400",
      scope_container: "color: #286f4f",
      colon: "color: #363533",
      namespace: "color: #690900", // E.g. .__proto__ [[PrimitiveValue}}
      indent: "color: #c2bab8",
      title: "color: #303030; font-weight: bold",
      variable: "color: #4a6a27",

   },
   dark_level_1: {
      quote: "color: #d2d2d2; font-weight: bold",
      number: "color: green; font-weight: bold",
      string: "color: #e9e9e9; font-weight: bold",
      function_body: "color: #a7a7a7; font-weight: bold",
      not_a_number: "color: yellow; font-weight: bold",
      null: "color: #5bc3ba; font-weight: bold; font-weight: bold",
      boolean: "color: red; font-weight: bold",
      comma: "color: #787878; font-weight: bold",
      undefined: "color: #e9d234; font-weight: bold",
      scope_container: "color: #80ab96; font-weight: bold",
      colon: "color: #dfd9b3; font-weight: bold",
      namespace: "color: #e05c50; font-weight: bold", // E.g. .__proto__ [[PrimitiveValue}}
      indent: "color: #373332; font-weight: bold",
      title: "color: #f2f2f2; font-weight: bold",
      variable: "color: #baeb83; font-weight: bold",

   },
   dark_level_2: {
      quote: "color: #d2d2d2",
      number: "color: green",
      string: "color: #e9e9e9",
      function_body: "color: #a7a7a7",
      not_a_number: "color: yellow",
      null: "color: #5bc3ba; font-weight: bold",
      boolean: "color: red",
      comma: "color: #787878",
      undefined: "color: #e9d234",
      scope_container: "color: #80ab96",
      colon: "color: #dfd9b3",
      namespace: "color: #e05c50", // E.g. .__proto__ [[PrimitiveValue}}
      indent: "color: #373332",
      title: "color: #f2f2f2; font-weight: bold",
      variable: "color: #baeb83",

   },
 }),
 terminal: Object.create({
   light_level_1: {
      quote: "\033[1;30m",
      number: "\033[1;32m",
      string: "\033[1;35m",
      function_body: "\033[0;30m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[1;30m",
      undefined: "\033[1;32m",
      scope_container: "\033[1;36m",
      colon: "\033[1;30m",
      namespace: "\033[1;31m", // e.g. .__proto__ [[primitivevalue}
      indent: "\033[0;37m",
      title: "\033[1;30m",
      variable: "\033[1;34m",

   },
   light_level_2: {
      quote: "\033[1;30m",
      number: "\033[1;32m",
      string: "\033[1;35m",
      function_body: "\033[1;30m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[1;30m",
      undefined: "\033[1;32m",
      scope_container: "\033[1;36m",
      colon: "\033[1;30m",
      namespace: "\033[0;31m", // e.g. .__proto__ [[primitivevalue}
      indent: "\033[1;37m",
      title: "\033[1;30m",
      variable: "\033[1;34m",

   },
   dark_level_1: {
      quote: "\033[1;37m",
      number: "\033[1;32m",
      string: "\033[1;35m",
      function_body: "\033[1;30m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[0;37m",
      undefined: "\033[1;32m",
      scope_container: "\033[1;36m",
      colon: "\033[1;37m",
      namespace: "\033[1;31m", // E.g. .__proto__ [[primitivevalue}}
      indent: "\033[1;30m", // If an indentation_string is provided it will be colorized as this.
      title: "\033[1;37m",
      variable: "\033[1;34m", // E.g. function( num, opt ) { .
                              //                ^^^  ^^^
   },
   dark_level_2: {
      quote: "\033[0;37m",
      number: "\033[0;32m",
      string: "\033[1;35m",
      function_body: "\033[1;30m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[0;37m",
      undefined: "\033[1;32m",
      scope_container: "\033[0;36m",
      colon: "\033[1;37m",
      namespace: "\033[0;31m", // E.g. .__proto__ [[primitivevalue}}
      indent: "\033[0;30m", // If an indentation_string is provided it will be colorized as this.
      title: "\033[1;37m",
      variable: "\033[0;34m", // E.g. function( num, opt ) { .
                              //                ^^^  ^^^
   },
 })
}

Print._remove_call = function() {
    // This member removes all of the text added to the internal buffer created by calls the color map. The text is indexed by every call that is made
    // to the color mappping memebre and thusly can be removed from the buffer. This mechanism works like the Array.splice memeber and also returns the
    // removed call text. The console.log mechanism in gecko based browsers use printf like format with color styles so a separate Array is created
    // to store them and passed to console.log via an apply.

    if ( Object.prototype.toString.call(this.css_arguments).toLowerCase() === "[object array]" )
      this.css_arguments.splice.apply(this.css_arguments, arguments)

    var formated_index = this.formated_index.splice.apply(this.formated_index, arguments)[0] || 0
    var plain_index = this.plain_index.splice.apply(this.plain_index, arguments)[0] || 0
    // This is the text data which is removed
    var removed = {formated: this.formated.substr(formated_index), plain: this.plain.substr(plain_index) }

    // This is the internal buffer text which is now truncated.
    this.formated = this.formated.substr(0, formated_index)
    this.plain = this.plain.substr(0, plain_index)

    return removed
  }

Print._mapping = function(str, command_name) {

  if ( this.plain.length === this.character_limit )
    return this

  var plain = str && str.toString() || ""
  // TODO: Adding line breaks may be a nifty feature here.
  var truncated_msg = ".. Object truncated"
  truncated_msg = this.character_limit > (truncated_msg.length*3) && truncated_msg || ""
  if ( this.plain.length + plain.length > this.character_limit - truncated_msg.length )
    plain = plain.substr(0, this.character_limit - this.plain.length - truncated_msg.length ) + truncated_msg


  this.plain_index.push(this.plain.length)
  this.plain += plain

  if ( this.use_color ) {
    this.formated_index.push(this.formated.length)
    // The regex test will prevent colorization of values which do not contain a visable character.
    if ( /\S/.test(plain) ) {
      var theme = this[this.theme] && this.theme || this._installed_theme[0]
      // Call the format function which is specified in the first level prototype of the constructor. The __proto__ holds the color_map values
      // used as the theme. The first level proto type (this.quote, or this.namespace), holds the drawing command functions (Print.mapping), which
      // have the same names as the color_map themes.

      this.formated += this.format(plain, this.__proto__[theme][command_name])
    } else {
      this.formated += plain
    }
  }

  return this
}

// Create the first level prototype object whcih is accessed by the user. The second level prototype object is used internnally from within the same command name. These
// all have the same qualifiers as the color map Object.
for ( var x in color_map ) {
  // These getters empty the text buffer stored in the colorizer members. The next time that the a formating command is called will empty the contents and
  // set _retrived back to false. This is done so that colorizing calls need only to be called once. The internal buffer will hold both plain and formated text
  // (as long as use_color is set) untill the next time it is called (f the buffers were accessed). Otherwise, each additional call will append the text passed in
  // to the buffers.

  color_map[x]._installed_theme = Object.keys(color_map[x].__proto__)
  color_map[x].formated = ""
  //color_map[x].max_line_characters = Infinity
  color_map[x].plain = ""
  color_map[x].plain_index = []
  color_map[x].formated_index = []
  color_map[x].remove_call = Print._remove_call

  Object.keys(color_map[x][color_map[x]._installed_theme[0]]).forEach(function(val) {
    // This is the first level prototype Object for any Color convering plugin.
    this[val] = function() {
      // TODO: get rid of this arguments.callee property accessor.
      arguments[arguments.length] = arguments.callee.command_name
      arguments.length = arguments.length + 1
      // The Print._mapping function is wraped in another function to minimize memory and run-time complexity. The function would be created as a new
      // Object every time if the function was simply declared here. Instead, the function is de-scoped and put inside of a new Function. The command
      // name is used so the function knows what the name of the callee function is (which is the only variable used in the mapping function). Note:
      // in my opinion the argument.callee.caller.name should hold the qualifier when it is attached to a Object property.
      return Print._mapping.apply(this, arguments)
    }
    this[val].command_name = val
  }, color_map[x])
}

// The constructor namespace (i.g. terminal), is used in conjunction with the platform setting property.
Print.terminal = function() {
   // this will replace the terminal color output with browser complient console.log this.bufferize.
   // The default them for terminal output is dark.
   this.denote_line = "\n"
   this.denote_tab = "\t;"
   this.denote_space = " "
   this.denote_add = ""
}

Print.terminal.prototype = color_map.terminal
Print.terminal.prototype.format = function(val, color_value) {

  return color_value+val
}

Print.html = function() {
 // this will replace the terminal color output with "browser complient console.log this.bufferize.

 this.denote_line = "<br>"
 this.denote_tab = "&#09;"
 this.denote_space = "&nbsp;"
 this.denote_add = ""
}

Print.html.prototype = color_map.html
Print.html.prototype.format = function(val, color_value) {

 return "<span style='"+color_value+";'>"+val+"</span>"
}

Print.browser = function() {
 // this will replace the terminal color output with browser complient console.log this.bufferize.

 this.css_arguments = []
 this.denote_line = "\n"
 this.denote_tab = "\t;"
 this.denote_space = " "
 this.denote_add = ""
}

Print.browser.prototype = color_map.html
Print.browser.prototype.format = function(val, color_value) {

  this.css_arguments.push(color_value)
  return "%c"+val
}

// This is used for atom.io quick plugin support
if ( typeof global === "object" ) {
  global.up = Print({use_title: false})
}

if ( typeof global === "object" && typeof module === "object" && typeof process === "object" )
  module.exports = Print
