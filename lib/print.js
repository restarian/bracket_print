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


var Print = function(setting) {

  // Call the constructor with the same arguments as initially called with as a new instance if it was not done so.
  if ( !(this instanceof arguments.callee) ) {
    var call_instance = arguments.callee
    for ( var x = 0; x < arguments.length; x++ )
       call_instance = call_instance.bind(call_instance.prototype, arguments[x])
    return new call_instance()
  }

  if ( setting && setting.callee )
    setting = setting[0]

  var copy = {}
  if ( typeof setting === "string" ) {
    copy.log_title = setting
  }
  else if ( setting instanceof arguments.callee ) {
    copy = setting._mutable_options
  }
  else if ( typeof setting === "object" ) {
    copy = setting
  }

  var mutable = this._mutable_options
  for ( var o in mutable )
    if ( o in copy )
      this[o] = copy[o]
    else
      this[o] = mutable[o]

  // Every instance of this needs to have its own intance of the _colors prototype so that text can be stored using the internal buffer.
  this._colors = new Print[this.platform.toLowerCase()]

  this._old_platform = ""
  this._last_command = null
  this._output = ""
  this._colorless_output = ""
  this._cache = []
  this._is_from_object = false
  // This may be included when another Print instance is passed into this constructor for a settings copy.
}

// This prototype is created one level deep (__proto__), into the Print() prototype chain. Any memeber names with a underscore prepended will not have a
// seperate prototype namespace automatically added into the first level prototype chain.
Print.prototype = {

  toColorString: function() {
    // These two members return strings so no chaining mechanism is uitlized (like a getter returning a function which returns the instance).

    return this._colors._formated
  },
  toString: function() {
    // The text created and stored which has color encoded data pertaining to the current platform.

    return this._colors._plain
  },
  set_option: function() {
    // The other way of setting the options which resturns this for call chain and Object storage purposes.

   // this is passed into the this (Print), contstuctor so that the current settings will be saved.
   var p = this._is_chained && this || Print(this._mutable_options)
   p._is_chained = true
    var option = p._mutable_options
    for ( var i = 0; i < arguments.length; i++ )
      for ( var n in arguments[i] )
        if ( n in option ) {
          p[n] = arguments[i][n]
        } else {
//          p.set_option({debug_level: "err"}).log("Option", n, "is not a brackit print option. Use _mutable_options() to see all user configurable options.")
          p.sp("Option", n, "is not a brackit print option. Use _mutable_options to see all user configurable options:")
            .line(Object.keys(this._mutable_options)).log()
        }
    return p
  },
  new_copy: function() {
    // This is how Print transfers options to other Print instances. It is best to make a singal Print object and then and pass the copy into another Print copy.
    // It is in this way that all of the Print objects contain with the same settings (custom defaults), and then have the options changed individually if nessesary.
    var passed_print = null
    for ( var x = 0; x < arguments.length; x++ )
      if ( arguments[x] instanceof Print ) {
        passed_print = arguments[x]
        break
    }

    if ( !passed_print )
      passed_print = this

    // The Print Constructor also accepts an ecma arguments Object to copy settings from.
    arguments[arguments.length] = passed_print
    arguments.length++

    return Print(arguments)
  },
  // These are globally set settings which are changed
  set_level: Infinity,
  get _mutable_options() {
    // this returns an object which represents the configurable options for the logger. The object sets default values if none are set yet.
    // Any ont the options below can be changed whenever is nessesary in the call chain.
    return {
  //    set_level: typeof this.set_level !== "undefined" ? this.set_level: Infinity,
      debug_level: typeof this.debug_level !== "undefined" ? this.debug_level : 1,
      use_color: typeof this.use_color !== "undefined" ? !!this.use_color : true,
      use_title_stamp: typeof this.use_title_stamp !== "undefined" ? !!this.use_title_stamp: true,
      max_characters: typeof this.max_characters === "number" ? this.max_characters : Math.pow(2,28),
      log_title: typeof this.log_title !== "undefined" ? this.log_title : "",
      compress_level: typeof this.compress_level === "number" ? this.compress_level : 2,
      use_title: typeof this.use_title !== "undefined" ? !!this.use_title : true,
      indentation_string: typeof this.indentation_string !== "undefined" ? this.indentation_string.toString() : "   ",
      platform: typeof this.platform !== "undefined" ? this.platform : typeof module === "object" && "terminal" || "browser",
      denote_quoting: typeof this.denote_quoting !== "undefined" ? this.denote_quoting : "\"",
      denote_line: typeof this.denote_line !== "undefined" ? this.denote_line : "\n",
      denote_tab: typeof this.denote_denote_tab !== "undefined" ? this.denote_denote_tab : "\t",
      denote_space: typeof this.denote_denote_space !== "undefined" ? this.denote_denote_space : " ",
      denote_add: typeof this.denote_add !== "undefined" ? this.denote_add : "",
      character_limit: typeof this.character_limit === "number" ? this.character_limit : Math.pow(2,29),
      compress_function: typeof this.compress_function !== "undefined" ? !!this.compress_function : false,
      max_depth: typeof this.max_depth !== "undefined" ? (parseInt(this.max_depth) || 130) : 130,
      theme: typeof this.theme !== "undefined" ? this.theme : this._colors && this._colors.theme || "light",
    }
  },
   get clear() {
     // Remove all of the text storage from the current Print instance.

     return (function() {
       this._colors.remove_call(0)
       return this
     }).bind(this)
   },
   //----------------------------------------------------------------------------
   get sp() { // Alias for space. This creates text with a white space used for seperation.

     return this._print_command("space")
   },
   get space() {

     return this._print_command(arguments.callee.name)
   },
   get tab() {

     return this._print_command(arguments.callee.name)
   },
   get line() { // This creates text with a carrage return used for seperation of parameters.

     return this._print_command(arguments.callee.name)
   },
   get add() {

     return this._print_command(arguments.callee.name)
   },
   // ---------------------------------------------------------------------------
   // Here are all of the print commands which ease string formation.
   _print_command: function(call_name) {

     // This is used internally whenever a input memeber is called. The _chain is a pre-cursor for the _stringify_object memeber which converts Objects to text.
     this._last_command = call_name.replace(/get\ /, "")
     // this is passed into the Print contstuctor so that the current settings will be saved.
     var p = this._is_chained && this || Print(this)
     p._is_chained = true
     return (function() {
       return this.debug_level <= this.set_level && this._chain.apply(this, arguments) || this
     }).bind(p)
   },
   get _chain() {

     return function() {
       // This happens when the platform option is changed after the constructing (first), print command is called.
       if ( this._old_platform.toLowerCase() !== this.platform.toLowerCase() ) {
         this._old_platform = this.platform
         this._colors = new Print[this.platform.toLowerCase()]
         if ( this.platform.toLowerCase() === "html" ) {
           this.denote_line = "<br>"
           this.denote_tab = "&#09;"
           this.denote_space = "&nbsp;"
           this.denote_add = ""
         }
       }

       var indentation = this.indentation_string.replace(/\t/g, this.denote_tab).replace(/\n/g, this.denote_line).replace(/\ /g, this.denote_space)

       this._cache = []
       for ( var i = 0; i < arguments.length; i++ ) {

         // Empty the Object processing cache which is used to endure Circular object references do not occur within printing.
         if ( this._colors._plain.length && typeof this["denote_"+this._last_command] !== "undefined" ) {
           // Add the last separator relating to the previous printing command called
           this._colors._plain += this["denote_"+this._last_command]
           this._colors._formated += this["denote_"+this._last_command]
         }

         this._stringify_object(arguments[i], indentation)
         // The buffer will be clear here for each argument passed in to the print command.

         if ( this.platform === "terminal" )
           // The terminating output command.
           this._colors._formated += "\033[0m"

         this._cache = []
       }
       return this
     }
   },
   get log() {

     // this is passed into the this (Print), contstuctor so that the current settings will be saved.
     var p = this._is_chained && this || Print(this)
     p._is_chained = true
     return (function() {

       if ( this.debug_level > this.set_level )
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

       if ( this._colors._formated ) {
         // Append the logging title if there is one set and then turn the entire output string
         // into an array to pass with the console.log.apply

         color_copy = new Print[this.platform.toLowerCase()]
         color_copy.title(this.use_title && (this.log_title || this.use_title_stamp) ? "["+(this.use_title_stamp
           && new Date()+(this.log_title&&" - "||"") || "")+this.log_title+"] " : "")

         var c_args = [(color_copy._formated||color_copy._plain)+this._colors._formated]
         // append any css arguments if the browser segment of our custom _colors object was utilized
         if ( this.platform.toLowerCase() === "browser" ) {
           c_args = c_args.concat(color_copy.css_arguments).concat(this._colors.css_arguments)
         }
         console.log.apply(console, c_args)
       }
       return this
     }).bind(p)
   },
   get log_false() {
     // These will return true/false regardless of the debuffing state as well.

     return (function() {
       this.log.apply(this, arguments)
       return false
     }).bind(this)
   },
   get log_true() {
     // These will return true/false regardless of the debuffing state as well.

     return (function() {
       this.log.apply(this, arguments)
       return true
     }).bind(this)
   },
   get log_null() {
     // These will return true/false regardless of the debuffing state as well.

     return (function() {
       this.log.apply(this, arguments)
       return null
     }).bind(this)
   },
   get log_empty() {
     // These will return true/false regardless of the debuffing state as well.

     return (function() {
       this.log.apply(this, arguments)
       return ""
     }).bind(this)
   },
   _stringify_object: function(msg, indent_string, previous_indent, level) { // previous_indent will be placed at the start of each new object in the output (used internally)
     // The Object to text parsing engine. this function will print any Object passed to it (including function text), in the most litteral way possible.
     // It can be recursively called within itself and also accepts modifiers to alter output. The indent_string argument contains how the
     // subsequent Object levels will seperate from the left margin. The indent_string is multiplied by the Object level when looping through
     // addeding the indent_string to the current previous_indent (which is expanding), every time an Object is parsed while already parsing an Object
     // (calling _stringify_object inside _stringify_object). this member can not be called outside this script with out breaking the the overlying
     // functionality of this script.

     if ( !this.store_text )
        this.store_text = this._colors

     var store_text = this.store_text
     store_text.theme = this.theme
     store_text.max_characters = this.max_characters

     // A simple way to stop Object parsing when the output becomes too large. The actuall size of the interanll string is maintained by the color addon.
     if ( store_text._plain.length >= this.max_characters )
      return

     indent_string = typeof indent_string === "string" && indent_string || (this.denote_space.toString()+this.denote_space.toString())
     level = parseInt(level) || 0
     previous_indent = previous_indent && previous_indent.toString() || ""

     var compress_separator, line_separator = ""
      if ( this.compress_level > 3 ) {

        indent_string = ""
        compress_separator = ""
        line_separator = ""
      }
      else if ( this.compress_level === 3 ) {

        indent_string = ""
        compress_separator = this.denote_space.toString()
        line_separator = this.denote_space.toString()
      }
      else if ( this.compress_level === 2 ) {

        compress_separator = this.denote_space.toString()
        line_separator = this.denote_line.toString()
      }
      else {

        compress_separator = this.denote_space.toString()
        line_separator = this.denote_line.toString()
      }
     if ( msg instanceof Print ) {
       this._stringify_object(msg.toString())
     }
     else if ( msg === null ) {

       store_text.null("null")
     }
     else if ( typeof msg === "boolean" ) {

       store_text.boolean(msg.toString())
     }
     else if ( msg !== msg ) { // NaN is the only js object which is not equal to itself

       store_text.not_a_number("NaN")
     }
     else if ( msg instanceof Error ) {

       var stack_string = msg.stack.split("\n")
       store_text.namespace(stack_string.splice(0,1) + this.denote_line)
       store_text.function_body(stack_string.join(this.denote_line))
     }
     else if ( typeof msg === "undefined" ) {

       store_text.undefined("undefined")
     }
     else if ( typeof Buffer !== "undefined" && msg.__proto__ && msg.__proto__.constructor === Buffer ) {

       this._stringify_object(msg.toString())
     }
     else if ( typeof msg === "object" || typeof msg === "function" ) {
       // Here is the man object parsing function. It will print all of the data from a Object including functions and prototypes.

       this._is_from_object = true
       var keys = Object.keys(msg)
       this._cache[level] = this._cache[level] || []
       // There is no need to put native Objects into the cache sense they are never circular dependantcies in there selves.
       if ( keys && typeof msg === "object" && msg.valueOf() === msg )
          this._cache[level].push(msg)

       for ( var n = 0; n < level; n++ ) {
         for ( var x = 0; x < this._cache[n].length; x++ ) {
           if ( typeof msg === "object" && msg === this._cache[n][x] ) {
             // Circular reference found, discard object processing
             var circ_text = "[[ circular duplicate of "
             var obj_qualifier = Object.keys(this._cache[n][x]).toString() || ""
             if ( circ_text.length+obj_qualifier.length > 75 )
                obj_qualifier = obj_qualifier.substr(0, 71-circ_text.length) + ".."

             store_text.namespace(circ_text)
             store_text.scope_container("{"+compress_separator)
             store_text.function_body(obj_qualifier)
             store_text.scope_container(compress_separator+"}"+compress_separator)
             store_text.namespace("]]")
             return
           }
         }
       }
       var is_array = msg.constructor === Array
       if ( typeof msg === "function" ) {

         // This regex will strip out the function: declaration, name, parameters and body. The body is only parsed for indentation and will use the string
         // provided as indent string.
         var f_str = msg.toString().match(/function(?:\ |\n)*(\S*)\(([^\)]*)\)(?:\ |\n)*\{((?:.|\n)*)\}(?:\ |\n)*/)
         var f_name = f_str[1] || ""
         var f_parameter = f_str[2] || ""
         var f_body = f_str[3] || ""

         store_text.namespace("function ")
         store_text.string(f_name)
         var param = f_parameter.split(",")
         // The parameter list is striped from the function text which will produce an Array containing an empty string if no parameters are used in the
         // Function. E.g. function(cool) -> ["cool"], function() -> [""]. The parenthisis will only have space (compress_separator), if parameters are
         // used in the function. Note: the compress_separator adjusts pending the this.compress_level.
         store_text.scope_container("(" + (param[0] && compress_separator || ""))

         // Make the parameter string fro the list
         param.forEach(function(val) {
           store_text.variable(val)
           store_text.comma(",")
         })

         // Remove the last comma from the parameter string
         store_text.remove_call(-1)
         store_text.scope_container((param[0] && compress_separator || "") + ")" + compress_separator)
         store_text.scope_container("{" + compress_separator)
         if ( !this.compress_function ) {

           color_copy = new Print[this.platform.toLowerCase()]
           var line = this.denote_line
           // Replace the first line with a new line if contains text before a newline so that it is always printing with a newline after the function declaration.
           f_body = f_body.replace(/^\ *(.+)\ *(\n)*/, "\n$1").replace(/\n\ *$/, "")
           f_body = f_body.replace(/\n/g, function(match, index, base) {
              return color_copy.indent(line + previous_indent + indent_string).formated + color_copy.function_body(" ").formated
           })
           store_text.function_body(f_body)
         } else {
           store_text.function_body(compress_separator + "..." + compress_separator)
         }

         store_text.indent(this.denote_line + previous_indent)
         store_text.scope_container("}")
         store_text.comma(",")
       }
       else {
         store_text.scope_container(is_array&&"["||"{" + (this.compress_level < 3 && this.denote_space || ""))
       }

       var cnt = 1
       if ( !keys.length ) {
          if ( Object.keys(msg.__proto__).length ) {
          store_text.indent(line_separator + previous_indent + indent_string)
          store_text.namespace("__proto__")
          store_text.colon(":" + compress_separator)
          this._stringify_object(msg.__proto__, indent_string, previous_indent + indent_string, level+1)
        }
        store_text.indent(line_separator + previous_indent)
        store_text.scope_container(is_array&&"]"||"}")
        store_text.comma("," + compress_separator)
       }

       for ( var x in keys ) { // Loop through the Object values

         if ( store_text._plain.length >= this.max_characters )
          return
         var o = keys[x]
         // Add the indent string to the begining of the parsing loop or if the item is an Object. this is the primary formating controler.
         var is_literal_object = !!(typeof msg[o] === "object" && msg[o] !== null && msg[o] !== undefined && (Object.keys(msg[o]).length ) )

         if ( cnt !== 1 && this.compress_level < 2 )
          store_text.indent(line_separator + previous_indent + indent_string)
         if ( cnt === 1 || is_literal_object ) {
           store_text.indent(line_separator + previous_indent + indent_string)
           if ( cnt === 1 && msg.valueOf() !== msg ) {
             store_text.namespace("[[PrimitiveValue]]")
             store_text.colon(":" + compress_separator)
             this._stringify_object(msg.valueOf(), indent_string, previous_indent + indent_string, level+1)
             store_text.comma("," + line_separator)
             store_text.indent(compress_separator)
           }
           // If the item has a primitive value than it will not be equal to it self and therefor the primitive value should be displayed.
         }
         if ( !is_array ) {
           // _stringify_object is used here to format the qualifiers strings if this loop is parsing an object. This should only add numbers and strings as this
           // is the only type of qualifiers ecma allows (for now:).
           this._stringify_object(o)
           store_text.colon(":" + compress_separator) // Object separator makes it more human readable by adding space. This changes with the compress_level.
         }
         // recursively call this function to parse the object. The indent_string is added to the begining to nest the output. It is important to
         // use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
         // function call keeps the value of level. this way each call to _stringify_object uses a level incremented by one from the calling _stringify_object.

         // Here parses nested Objects from within Objects and stops at the level specified in the max_depth setting. this is good for super massive
         // Objects like browser self, window and document.
           if ( level < this.max_depth-1 || !is_literal_object ) {
              this._stringify_object(msg[o], indent_string, previous_indent + indent_string, level+1)
           } else {
              store_text.namespace("["+(is_array && "Array" || "Object") + " with "+(keys.length)+" properties]")
           }

           store_text.comma("," + compress_separator)
           // These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
         if ( cnt === keys.length ) {
           // Remove the last comma from the item list and add the newline and indentation.
           store_text.remove_call(-1)

           if ( Object.keys(msg.__proto__).length ) {

              store_text.comma("," + compress_separator)
              store_text.indent(line_separator + previous_indent + indent_string)
              store_text.namespace("__proto__")
              store_text.colon(":" + compress_separator)
              this._stringify_object(msg.__proto__, indent_string, previous_indent + indent_string, level+1)
           }
            store_text.indent(line_separator + previous_indent)
            store_text.scope_container(is_array&&"]"||"}")
            store_text.comma("," + compress_separator)
         }
         cnt++
       }

       // Remove the last comma from the parsing output. It is the last thing to be stored so a simple call to remove the last call will surfice.
       store_text.remove_call(-1)
       // A Object will always have a level. It is set as soon as Object parsing begins.
       if ( !level )
         this._is_from_object = false
     }
     else if ( typeof msg === "number" ) {

       store_text.number(msg.toString())
     }
     else if ( typeof msg === "string" ) {
       // The quotes are only added if this _stringify_object call was called from another _stringify_object call. Otherwise all calls with strings would have quotes.

       if ( this._is_from_object ) {
           store_text.quote(this.denote_quoting)
           store_text.string(msg)
           store_text.quote(this.denote_quoting)
       } else {
         store_text.string(msg)
       }
     }
     else {

       store_text.namespace(msg.toString())
     }
     return store_text
   },
}

var color_map = {

 html: Object.create({
   light: {
      quote: "#454343",
      number: "green",
      string: "#b91db3",
      function_body: "#656565",
      not_a_number: "#249e93",
      null: "#249e93",
      boolean: "red",
      comma: "#323232",
      undefined: "#f4d400",
      scope_container: "#286f4f",
      colon: "#363533",
      namespace: "#690900", // E.g. .__proto__ [[PrimitiveValue}}
      indent: "#c2bab8",
      title: "#303030",
      variable: "#4a6a27",

   },
   dark: {
      quote: "#d2d2d2",
      number: "green",
      string: "#e9e9e9",
      function_body: "#a7a7a7",
      not_a_number: "yellow",
      null: "#5bc3ba",
      boolean: "red",
      comma: "#787878",
      undefined: "#e9d234",
      scope_container: "#80ab96",
      colon: "#dfd9b3",
      namespace: "#e05c50", // E.g. .__proto__ [[PrimitiveValue}}
      indent: "#373332",
      title: "#f2f2f2",
      variable: "#baeb83",

   }
 }),
 terminal: Object.create({
   light: {
      quote: "\033[0;30m",
      number: "\033[0;32m",
      string: "\033[0;35m",
      function_body: "\033[1;34m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[0;30m",
      undefined: "\033[1;32m",
      scope_container: "\033[1;36m",
      colon: "\033[1;30m",
      namespace: "\033[0;31m", // e.g. .__proto__ [[primitivevalue}
      indent: "\033[0;30m",
      title: "\033[1;30m",
      variable: "\033[0;34m",

   },
   dark: {
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
   }
 })
}

// Create the first level prototype object whcih is accessed by the user. The second level prototype object is used internnally from within the same command name. These
// all have the same qualifiers as the color map Object.
for ( var x in color_map ) {
  // These getters empty the text buffer stored in the colorizer members. The next time that the a formating command is called will empty the contents and
  // set _retrived back to false. This is done so that colorizing calls need only to be called once. The internal buffer will hold both plain and formated text
  // (as long as use_color is set) untill the next time it is called (f the buffers were accessed). Otherwise, each additional call will append the text passed in
  // to the buffers.

  color_map[x]._formated = ""
  //color_map[x].max_line_characters = Infinity
  color_map[x]._plain = ""
  color_map[x]._retrieved = false
  color_map[x]._plain_index = []
  color_map[x]._formated_index = []
  color_map[x].__defineGetter__("plain", function() {
    // Works the same way as this.formated

    this._retrieved = true
    return this._plain
  })
  color_map[x].__defineSetter__("plain", function(val) {

    this._plain = val
  })
  color_map[x].__defineGetter__("formated", function() {
    // A getter is used here so that the internal buffer is cleared anytime the formated or plain property is accessed. E.g. After a call to this.string("hello"),
    // the internal buffer will hold both formated and plain text text data around the string "hello". If the data is accessed (this.formated or this.plain), the
    // buffers will be cleared and the two properties will hold empty strings instead. If two or more calls are made to this color mapping, then all text data will
    // be buffered untill it is accessed.
    this._retrieved = true
    return this._formated
  })
  color_map[x].__defineSetter__("formated", function(val) {

    this._formated = val
  })
  color_map[x].remove_call = function() {
    // This member removes all of the text added to the internal buffer created by calls the color map. The text is indexed by every call that is made and thusly
    // can be removed from the buffer. This mechanism works like the Array.splice memeber only it is indexing by calls to the color memebers instead or position index.

    // The console.log mechanism in gecko based browsers use printf like format with color styles so a separate Array is created to strore them.
    if ( Object.prototype.toString.call(this.css_arguments).toLowerCase() === "[object array]" ) {
      this.css_arguments.splice.apply(this.css_arguments, arguments)
    }

    this._formated = this._formated.substr(0, this._formated_index.splice.apply(this._formated_index, arguments)[0] || 0)
    this._plain = this._plain.substr(0, this._plain_index.splice.apply(this._plain_index, arguments)[0] || 0)
  }

  Object.keys(color_map[x].light).forEach(function(val, index) {
  // This is the first level prototype Object for any Color convering plugin.

    this[val] = function(str) {

      // _retrieved will be set if the _plain or formated properties were getter accessed. This clears all internal buffer data from the color module.
      if ( this._retrieved ) {
        this._retrieved = false
        this._plain = this._formated = "" // Clear the buffers if they were accessed before this call
        this._plain_index = []
        this._formated_index = []
      }

      if ( this._plain.length === this.max_characters )
        return this

      var plain = str.toString()
      //var plain = this._add_line_break(str.toString(), denote_line, max_line_characters)
      var truncated_msg = ".. Object truncated"
      truncated_msg = this.max_characters > (truncated_msg.length*3) && truncated_msg || ""
      if ( this._plain.length + plain.length > this.max_characters - truncated_msg.length ) {
        plain = plain.substr(0, this.max_characters - this._plain.length - truncated_msg.length ) + truncated_msg
      }

      this._plain_index.push(this._plain.length)
      this._plain += plain

      if ( this.use_color ) {
        this._formated_index.push(this._formated.length)
        // Call the format function which are specified in the first level prototype of the constructor
        // The regex test will prevent colorization of values which do not contain a visable character.
        if ( /\S/.test(val) )
          this._formated += this.format(plain, this.__proto__[this.theme][arguments.callee.command_name])
        else
          this._formated += plain
      }

      return this
    }
    this[val].command_name = val
  }, color_map[x])

}

// The constructor namespace (i.g. terminal), is used in conjunction with the platform setting property.
Print.terminal = function() {
   // this will replace the terminal color output with browser complient console.log store_text.
   // The default them for terminal output is dark.
   this.theme = "dark"
   this.use_color = true
}

Print.terminal.prototype = color_map.terminal
Print.terminal.prototype.format = function(val, color_value) {

  return color_value+val
}

Print.html = function() {
 // this will replace the terminal color output with "browser complient console.log store_text.
 this.theme = "light"
 this.use_color = true
}

Print.html.prototype = color_map.html
Print.html.prototype.format = function(val, color_value) {

 return "<span style='color:"+color_value+";'>"+val+"</span>"
}

Print.browser = function() {
 // this will replace the terminal color output with browser complient console.log store_text.

 this.css_arguments = []
 this.theme = "light"
 this.use_color = true
}

Print.browser.prototype = color_map.html
Print.browser.prototype.format = function(val, color_value) {

  this.css_arguments.push("color: "+color_value)
  return "%c"+val
}

// This is used for atom.io quick plugin support
if ( typeof global === "object" ) {
  var up = Print().new_copy({use_title: false})
  global.up = up
}

if ( typeof global === "object" && typeof module === "object" && typeof process === "object" )
  module.exports = Print
