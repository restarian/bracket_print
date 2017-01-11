/*
  Brackit Print is a printing and logging tool for javascript engines which suppies litteral ECMA Object printing.

 Copyright (C) 2016  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit Print

 Brackit Print is free software: you can redistribute it and/or modify
 it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Brackit Print is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/// Author: Robert Edward Steckroth <RobertSteckroth@gmail.com>

var Print = function() {

  // Call the constructor with the same arguments as initially called with as a new instance if it was not done so.
  if ( !(this instanceof arguments.callee) ) {
    var call_instance = arguments.callee
    for ( var x = 0; x < arguments.length; x++ )
       call_instance = call_instance.bind(call_instance.prototype, arguments[x])
    return new call_instance()
  }

  this.log_title = ""
  var settings = null
  for ( var i = 0; i < arguments.length; i++ )
    // this loop considers the arguments object as well. If one of the arguments is an arguments object, then it will have a length as well.
    if ( typeof arguments[i] === "object" && arguments[i].length ) {
      // Loop through the arguments object passed in as a argument
      for ( var x = 0; x < arguments[i].length; x++ )
        // Do not let the arguments onject over-write a string that was passed in.
        if ( typeof arguments[i][x] === "string" && !this.log_title )
          this.log_title = arguments[i][x]
        // If the argument is a instanceof the Print, then copy its settings over to this instance.
        else if ( arguments[i][x] instanceof arguments.callee )
          settings = arguments[i][x]._mutable_options()
    }
    else if ( typeof arguments[i] === "string" ) {
      this.log_title = arguments[i]
    }
    else if ( arguments[i] instanceof arguments.callee ) {
      settings = arguments[i]._mutable_options()
    }

  // Settings will be null if no Print was passed in to the constructer.
  if ( !settings )
    settings = this._mutable_options()

  for ( var n in settings ) {
    if ( n === "log_title" && this.log_title )
      continue
    this[n] = settings[n]
  }

  if ( this.platform.toLowerCase() === "terminal" ) {
    this._colors = new Print.Terminal_colors()
  }
  else if ( this.platform.toLowerCase() === "browser" ) {
    this._colors = new Print.Browser_colors()
  }

  this._old_platform = ""
  this._last_command = null
  this._output = ""
  this._colorless_output = ""
  this._cache = []
  this._is_from_object = false
  this._colors = null
  // This may be included when another Print instance is passed into this constructor for a settings copy.
}

// This prototype is created one level deep (__proto__), into the Print() prototype chain. Any memeber names with a underscore prepended will not have a
// seperate prototype namespace automatically added into the first level prototype chain.
Print.prototype = {

  toColorString: function() {
    // These two members return strings so no chaining mechanism is uitlized (like a getter returning a function which returns the instance).

    return this._output
  },
  toString: function() {
    // The text created and stored which has color encoded data pertaining to the current platform.

    return this._colorless_output
  },
  set_option: function() {
    // The other way of setting the options which resturns this for call chain and Object storage purposes.

   var p = this._is_chained && this || new Print()
   p._is_chained = true
    var option = p._mutable_options()
    for ( var i = 0; i < arguments.length; i++ )
      for ( var n in arguments[i] )
        if ( n in option ) {
          p[n] = arguments[i][n]
        } else {
          p.set_option({debug_level: "err"}).log("Option", n, "is not a brackit print option. Use _mutable_options() to see all user configurable options.")
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
  _mutable_options: function() {
    // this returns an object which represents the configurable options for the logger. The object sets default values if none are set yet.
    // Any ont the options below can be changed whenever is nessesary in the call chain.

    return {
      debug: typeof this.debug !== "undefined" ? this.debug : "verbose",
      log_level: typeof this.log_level !== "undefined" ? this.log_level : "verbose",
      use_color: typeof this.use_color !== "undefined" ? !!this.use_color : true,
      use_title_stamp: typeof this.use_title_stamp !== "undefined" ? !!this.use_title_stamp: true,
      max_line_characters: parseInt(this.max_line_characters) || Infinity,
      log_title: typeof this.log_title !== "undefined" ? this.log_title : "",
      compress_level: typeof this.compress_level !== "undefined" ? parseInt(this.compress_level) : 1,
      use_title: typeof this.use_title !== "undefined" ? !!this.use_title : true,
      indentation_string: typeof this.indentation_string !== "undefined" ? this.indentation_string.toString() : "   ",
      platform: typeof this.platform !== "undefined" ? this.platform : typeof module === "object" && "terminal" || "browser",
      quoting: typeof this.quoting !== "undefined" ? this.quoting : "double",
      denote_line: typeof this.denote_line !== "undefined" ? this.denote_line : "\n",
      denote_tab: typeof this.denote_denote_tab !== "undefined" ? this.denote_denote_tab : "\t",
      denote_space: typeof this.denote_denote_space !== "undefined" ? this.denote_denote_space : " ",
      denote_add: typeof this.denote_add !== "undefined" ? this.denote_add : "",
      character_limit: typeof this.character_limit !== "undefined" ? parseInt(this.character_limit) || 2 * 1000 * 1000 : 2 * 1000 * 1000,
      compress_function: typeof this.compress_function !== "undefined" ? !!this.compress_function : false,
      max_depth: typeof this.max_depth !== "undefined" ? (parseInt(this.max_depth) || 30) : 30,
      theme: typeof this.theme !== "undefined" ? this.theme : "light",
    }
  },
   get clear() {
     // Remove all of the text storage from the current Print instance.

     return (function() {
       this._output = ""
       this._colorless_output = ""
       if ( this.platform.toLowerCase() === "browser" )
         this._colors.remove_output()
       return this
     }).bind(this)
   },
   //----------------------------------------------------------------------------
   // Here are all of the print commands which ease string formation.
   _print_command: function(call_name) {

     // This is used internally whenever a input memeber is called. The _chain is a pre-cursor for the _stringify_object memeber which converts Objects to text.
     this._last_command = call_name
     var p = this._is_chained && this || new Print()
     p._is_chained = true
     if ( this.debug === "verbose" || this.log_level <= parseInt(this.debug) )
       return (function() {
         return this._chain.apply(this, arguments)
       }).bind(p)
     else
       return p
   },
   get sp() { // Alias for space. This creates text with a white space used for seperation.

     return this._print_command(arguments.callee.name)
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
   get _chain() {

     return function() {
       // For fast, on-the-fly, platform changes.
       if ( this._old_platform.toLowerCase() !== this.platform.toLowerCase() ) {
         this._old_platform = this.platform
         if ( this.platform.toLowerCase() === "terminal" ) {
           this._colors = new Print.Terminal_colors()
         }
         else if ( this.platform.toLowerCase() === "browser" ) {
           this._colors = new Print.Browser_colors()
         }
         else if ( this.platform.toLowerCase() === "html" || this.platform.toLowerCase() === "console_html" ) {
           this._colors = new Print.Html_colors()
           this.denote_line = "<br>"
           this.denote_tab = "&#09;"
           this.denote_space = "&nbsp;"
           this.denote_add = ""
         }
       }

       var indentation = this.indentation_string.replace(/\t/g, this.denote_tab).replace(/\n/g, this.denote_line).replace(/\ /g, this.denote_space)

       // Empty the Object processing cache which is used to endure Circular object references do not occur within printing.
       this._cache = []
       if ( !arguments.length )
         return this

       for ( var i = 0; i < arguments.length; i++ ) {

         this._cache = []
         if ( !!this._last_command && typeof this["denote_"+this._last_command] !== "undefined" ) {
           // Add the last separator relating to the previous printing command called
           this._output += this["denote_"+this._last_command]
           this._colorless_output += this["denote_"+this._last_command]
         }

         var output = this._stringify_object(arguments[i], indentation)
         this._colorless_output += output.plain
         this._output += output.formated
         if ( this.platform === "terminal" )
           this._output += "\033[0m"
       }
       return this
     }
   },
   get log() {

     var p = this._is_chained && this || new Print()
     p._is_chained = true
     return (function() {

       if ( arguments.length > 0 ) {
         // Call the last command used before this log again.
         if ( this[this._last_command] ) {
          this[this._last_command].apply(this, arguments)
         }
         else {
           this.space.apply(this, arguments)
         }
       }
       if ( this._output ) {
         // Append the logging title if there is one set and then turn the entire output string
         // into an array to pass with the console.log.apply
         var title_str = this._colors.title(this.use_title && (this.log_title || this.use_title_stamp) ? "["+(this.use_title_stamp && new Date()+(this.log_title&&" - "||"") || "")+this.log_title+"] " : "")
         var c_args = [title_str.formated+this._output]
         // append any css arguments if the browser segment of our custom _colors object was utilized
         if ( this.platform.toLowerCase() === "browser" ) {
           c_args = c_args.concat(this._colors.css_arguments)
         }
         if ( this.platform.toLowerCase() === "browser" || this.platform.toLowerCase() === "terminal" || this.platform.toLowerCase() === "console_html" )
           console.log.apply(console, c_args)
         else if ( this.platform.toLowerCase() === "html" && typeof document !== "undefined" && typeof document.write !== "undefined" )
           document.write(c_args)
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
   _stringify_object: function(msg, indent_string, compound, level) { // compound will be placed at the start of each new object in the output (used internally)
     // The Object to text parsing engine. this function will print any Object passed to it (including function text), in the most litteral way possible.
     // It can be recursively called within itself and also accepts modifiers to alter output. The indent_string argument contains how the
     // subsequent Object levels will seperate from the left margin. The indent_string is multiplied by the Object level when looping through
     // addeding the indent_string to the current compound (which is expanding), every time an Object is parsed while already parsing an Object
     // (calling _stringify_object inside _stringify_object). this member can not be called outside this script with out breaking the the overlying
     // functionality of this script.

     indent_string = typeof indent_string === "string" && indent_string || (this.denote_space.toString()+this.denote_space.toString())
     level = parseInt(level) || 0
     compound = compound && compound.toString() || ""

     var compress_sep, object_separator = ""
     if ( this.compress_level > 3 ) {
       indent_string = ""
       compress_sep = ""
       object_separator = ""
     }
     else if ( this.compress_level === 3 ) {
       indent_string = ""
       compress_sep = this.denote_space.toString()
       object_separator = this.denote_space.toString()
     }
     else if ( this.compress_level === 2 ) {
       compress_sep = this.denote_line.toString()
       object_separator = this.denote_space.toString()
     }
     else {
       compress_sep = this.denote_line.toString()
       object_separator = this.denote_space.toString()
     }

     if ( !this.store_text )
        this.store_text = this._colors

     var store_text = this.store_text
     store_text.theme = this.theme
     store_text.line_denote = this.denote_line
     store_text.max_line_characters = this.max_line_characters

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

       // A Sting Object is used here so that both plain text and formated text can be stored in the same Object while still preforming as a primitive string.
       var value_keys_length = Object.keys(msg).length, proto_keys_length = 0, proto_traverse = msg.__proto__
       // _Sense the prototypes can be a prototype as well, this needs to travese into the prototype until some mutable properties are found. This simply
       // tells that there are actual properties somewhere down the prototype chain. Note: Object.keys will enumerate into all levels of the __proto__ just
       // like this loop is doing so it is only nessesary to find id any

       while ( typeof proto_traverse === "object" && proto_traverse  ) {
          if ( proto_keys_length = Object.keys(proto_traverse).length )
            break
          proto_traverse = proto_traverse.__proto__
        }

       this._is_from_object = true
       if ( typeof this._cache[level] === "undefined" )
          this._cache[level] = []
       if ( (value_keys_length || proto_keys_length) && typeof msg === "object" && msg.valueOf() === msg )
          this._cache[level].push(msg)

       for ( var n = 0; n < level; n++ ) {
         for ( var x = 0; x < this._cache[n].length; x++ ) {
           if ( typeof msg === "object" && msg === this._cache[n][x] ) {
             // Circular reference found, discard object processing
             var circ_text = "Circular duplicate of "
             var obj_qualifier = Object.keys(this._cache[n][x]).toString() || ""
             if ( circ_text.length+obj_qualifier.length > 75 )
                obj_qualifier = obj_qualifier.substr(0, 71-circ_text.length) + ".. "

             store_text.scope_container("[[ ")
             store_text.function_body(circ_text)
             store_text.scope_container("{ ")
             store_text.function_body(obj_qualifier)
             store_text.scope_container(" } ]]")
             return
           }
         }
       }
       var is_array = msg.constructor === Array
       if ( typeof msg === "function" ) {
         if ( (/\[native code\]/i).test(msg.toString()) ) {
            store_text.function_constructor(msg.toString().replace(/(.*)\n*/g, "$1"))
         }
         else if ( this.compress_function ) {
           store_text.function_body( msg.toString().match(/(function[^\{]+).*/i).pop())
           store_text.scope_container("{")
           store_text.comma("...")
           store_text.scope_container("}")
         }
         else {
            //var line = this.denote_line
            //var str = store_text.function_body(msg.toString().replace(/(.*)\}[\ ,\n]*/g, "$1"))

          //  str.formated = str.formated.replace(/\)\ *\{/, ") " + store_text.scope_container("{").formated + store_text.double_quote(null).formated)
          //  .replace(/\n/g, function(match, index, base) { return store_text.indent_string(line + compound).formated })

          //      + store_text.indent_string(this.denote_line + compound) + store_text.scope_container("}")

         }
       }
       else {
         store_text.scope_container(is_array&&"["||"{" + (this.compress_level < 3 && this.denote_space || ""))
         if ( !value_keys_length ) {
           if ( proto_keys_length ) {
              store_text.scope_container(is_array&&"]"||"}")
              store_text.namespace(".__proto__ = ")
              store_text.scope_container("{"+ compress_sep)
              store_text.indent(compound + indent_string)
              // If the __proto__ object is nesed than this will correctly navagate into it.
              this._stringify_object(msg.__proto__, indent_string, compound + indent_string, level+1)
           } else {
             store_text.scope_container(is_array&&"]"||"}")
             store_text.comma("," + object_separator)
           }
         }
       }
       var cnt = 1
       for ( var o in msg ) { // Loop through the Object values
         // Add the indent string to the begining of the parsing loop or if the item is an Object. this is the primary formating controler.
         var is_literal_object = !!(typeof msg[o] === "object" && msg[o] !== null && msg[o] !== undefined && (Object.keys(msg[o]).length || Object.keys(msg[o].__proto__).length) )
         if ( cnt === 1 || is_literal_object || this.compress_level === 1 ) {
           store_text.indent(compress_sep + compound + indent_string)
           if ( cnt === 1 && msg.valueOf() !== msg ) {
             store_text.namespace("[[PrimitiveValue]]")
             store_text.colon(":" + object_separator)
             this._stringify_object(msg.valueOf(), indent_string. compound + indent_string, level+1)
             store_text.comma("," + compress_sep)
             store_text.indent(indent_string)
           }
           // If the item has a primitive value than it will not be equal to it self and therefor the primitive value should be displayed.
         }
         if ( !is_array ) {
           // _stringify_object is used here to format the qualifiers strings if this loop is parsing an object. This should only add numbers and strings as this
           // is the only type of qualifiers ecma allows (for now:).
           this._stringify_object(o)
           store_text.colon(":" + object_separator) // Object separator makes it more human readable by adding space. This changes with the compress_level.
         }
         // recursively call this function to parse the object. The indent_string is added to the begining to nest the output. It is important to
         // use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
         // function call keeps the value of level. this way each call to _stringify_object uses a level incremented by one from the calling _stringify_object.

         // Here parses nested Objects from within Objects and stops at the level specified in the max_depth setting. this is good for super massive
         // Objects like browser self, window and document.
         if ( level < this.max_depth-1 || !is_literal_object ) {
            this._stringify_object(msg[o], indent_string, compound + indent_string, level+1)
         } else {
            this._stringify_object("["+(is_array && "Array" || "Object") + " - length: "+(value_keys_length+proto_keys_length)+"]", indent_string, compound + indent_string)
         }

         store_text.comma("," + object_separator)
         // These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
         if ( cnt === value_keys_length || cnt === value_keys_length+proto_keys_length ) {

           // Remove the last comma from the item list and add the newline and indentation.
           store_text.remove_call(-1)
           store_text.indent(compress_sep + compound)

           // The Object contains a __proto__ if proto_keys_length is non-zero. Enumeration into the __proto__ begins after all of the Properties are
           // itterated over. __proto__ variables will not be enumerated by Object.keys but will be via the "for" command.
           if ( value_keys_length && proto_keys_length && cnt === value_keys_length ) {
              store_text.scope_container(is_array&&"]"||"}")
              store_text.namespace("__proto__")
              store_text.colon(":" + object_separator)
              store_text.scope_container("{" + compress_sep + compress_sep)
              this._stringify_object(msg.__proto__, indent_string, compound + indent_string, level+1)
           }
           else {
              store_text.scope_container(is_array&&"]"||"}") +
              store_text.comma("," + object_separator)
           }
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
         if ( this.quoting.toLowerCase() === "double") {
           store_text.double_quote("\"")
           store_text.string(msg)
           store_text.double_quote("\"")
         }
         else if ( this.quoting.toLowerCase() === "single") {
           store_text.single_quote("\'")
           store_text.string(msg)
           store_text.single_quote("\'")
         }
       }
       else {
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
      single_quote: "#939393",
      double_quote: "#939393",
      number: "green",
      string: "magenta",
      function_constructor: "#0c3f74",
      function_body: "#656565",
      not_a_number: "#249e93",
      null: "#249e93",
      boolean: "red",
      comma: "#323232",
      undefined: "#f4d400",
      scope_container: "#286f4f",
      colon: "#363533",
      namespace: "#690900", // E.g. .__proto__ [[PrimitiveValue}}1
      indent: "#c2bab8",
      title: "#f2f2f2",

   },
   dark: {
      singal_quote: "#d2d2d2",
      double_quote: "#d2d2d2",
      number: "green",
      string: "#e9e9e9",
      function_constructor: "#6c7bbb",
      function_body: "#a7a7a7",
      not_a_number: "yellow",
      null: "#5bc3ba",
      boolean: "red",
      comma: "#787878",
      undefined: "#e9d234",
      scope_container: "#80ab96",
      colon: "#dfd9b3",
      namespace: "#e05c50", // E.g. .__proto__ [[PrimitiveValue}}1
      indent: "#373332",
      title: "#f2f2f2",

   }
 }),
 terminal: Object.create({
   light: {
      single_quote: "\033[0;30m",
      double_quote: "\033[0;30m",
      number: "\033[0;32m",
      string: "\033[0;35m",
      function_constructor: "\033[0;34m",
      function_body: "\033[1;37m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[0;37m",
      undefined: "\033[1;32m",
      scope_container: "\033[0;36m",
      colon: "\033[1;30m",
      namespace: "\033[0;31m", // e.g. .__proto__ [[primitivevalue}}1
      indent: "\033[0;30m",
      title: "\033[1;30m",

   },
   dark: {
      single_quote: "\033[0;37m",
      double_quote: "\033[0;37m",
      number: "\033[0;32m",
      string: "\033[0;35m",
      function_constructor: "\033[0;34m",
      function_body: "\033[0;37m",
      not_a_number: "\033[1;33m",
      null: "\033[1;36m",
      boolean: "\033[1;31m",
      comma: "\033[0;30m",
      undefined: "\033[1;32m",
      scope_container: "\033[0;36m",
      colon: "\033[1;37m",
      namespace: "\033[0;31m", // e.g. .__proto__ [[primitivevalue}}1
      indent: "\033[0;30m",
      title: "\033[1;31m",
   }
 })
}

// Create the first level prototype object whcih is accessed by the user. The second level prototype object is used internnally from within the same command name. These
// all have the same qualifiers as the color map Object.
for ( var x in color_map )
  // These getters empty the text buffer stored in the colorizer members. The next time that the a formating command is called will empty the contents and
  // set _retrived back to false. This is done so that colorizing calls need only to be called once. The internal buffer will hold both plain and formated text
  // (as long as use_color is set) untill the next time it is called (f the buffers were accessed). Otherwise, each additional call will append the text passed in
  // to the buffers.

   color_map[x]._add_line_break = function(str, denote, max_characters) {
     line_denote = line_denote || ""
     // The newline denotion may contain any amount of white space or characters so the max_line_characters has to be longer than it plus one character.
     var max_line_characters = max_characters || this.max_line_characters
     var line_denote = line_denote || this.line_denote

     if ( max_line_characters < line_denote.length + 1)
      max_line_characters = line_denote.length + 1

     line_denote = line_denote || ""
     max_line_characters = parseInt(max_line_characters) || Infinity
     var out = "", last_start = this._last_line_break_start || 0

     str.split(line_denote).forEach(function(val) {
       // Add the line denotion that was stiped out by split
       var num = Math.floor((val.length+last_start)/max_line_characters), current_index = 0
       for ( var n = 1; n < num+1; n++ ) {
         // Add the line denotion in every posistion

         out += val.substr(current_index, max_line_characters - last_start ) + line_denote
         current_index += max_line_characters
         last_start = 0
       }

       out = out + val.substr(current_index)
       if ( !val.length || current_index !== val.length ) {
          out += line_denote
          last_start = val.length - current_index
        } else {
          last_start = max_line_characters
        }

       this._last_line_break_start = last_start
     }, this)
     // Store the remaining character length after the last line break insertion so that it can compensate for hoe many characters are left in the line from
     // the last call to this.
    return out.substr(0, out.length-line_denote.length)
  }
  color_map[x]._formated = ""
  color_map[x].line_denote = "\n"
  color_map[x].max_line_characters = Infinity
  color_map[x]._plain = ""
  color_map[x]._retrieved = false
  color_map[x]._plain_index = []
  color_map[x]._formated_index = []
  color_map[x].__defineGetter__("plain", function() {

    this._retreived = true
    return this._plain
  })
  color_map[x].__defineSetter__("plain", function(val) {

    this._plain = val
  })
  color_map[x].__defineGetter__("formated", function() {

    this._retrieved = true
    return this._formated
  })
  color_map[x].__defineSetter__("formated", function(val) {

    this._formated = val
  })
  color_map[x].remove_call = function() {
//console.log("11111111", this._formated_index[this._formated_index.length-1], this.formated.length)//, this._formated_index.splice.apply(this._formated_index, arguments))
    this._formated = this._formated.substr(0, this._formated_index.splice.apply(this._formated_index, arguments).pop() || 0)
    //console.log("++++++++", this._formated.substr(0, this._formated_index.splice.apply(this._formated_index, arguments).pop() || 0))
    //this._plain = this._plain.substr(0, this._plain_index.splice.apply(this._plain_index, arguments).pop() || 0)
  }
Object.keys(color_map[x].light).forEach(function(val, index) {
// This is the first level prototype Object for any Color convering plugin.

  this[val] = function(str, denote_line, max_line_characters) {

    // _retrieved will be set if the _plain or formated properties were getter accessed.
    if ( this._retrieved ) {
      this._retrieved = false
      this._plain = this._formated = "" // Clear the buffers if they were accessed before this call
      this._plain_index = []
      this._formated_index = []
    }

    this._plain_index.push(this._plain.length)
    var output = {plain: "", formated: ""}
    output.plain += this._add_line_break(str.toString(), denote_line, max_line_characters)
    this._plain += output.plain

    if ( !this.use_color )
      return output

    this._formated_index.push(this._formated.length)
    output.formated = this.format(output.plain, this.__proto__[this.theme][arguments.callee.command_name], denote_line, max_line_characters)
    // Call the format function which are specified in the first level prototype of the constructor
    this._formated += output.formated
    return output
  }
  this[val].command_name = val
}, color_map[x])

Print.Terminal_colors = function() {
   // this will replace the terminal color output with browser complient console.log store_text.
   this.theme = "light"
   this.use_color = true
}

Print.Terminal_colors.prototype = color_map.terminal
Print.Terminal_colors.prototype.format = function(val, color_value) {

  return color_value+val
}

Print.Html_colors = function() {
 // this will replace the terminal color output with "browser complient console.log store_text.
 this.theme = "light"
 this.use_color = true
}

Print.Html_colors.prototype = color_map.html
Print.Html_colors.prototype.format = function(val, color_value) {

 return "<span style='color:"+color_value+";'>"+val+"</span>"
}

Print.Browser_colors = function() {
 // this will replace the terminal color output with browser complient console.log store_text.

 this._css_arguments = []
 this.theme = "light"
 this.use_color = true
}

Print.Browser_colors.prototype = color_map.html
Print.Browser_colors.prototype.__defineGetter__("css_arguments", function() {

 return this._css_arguments
})
Print.Browser_colors.prototype.remove_output = function() {

   return this._css_arguments.splice(0)
},
Print.Browser_colors.prototype.format = function(val, color_value, flag) {

   if ( !flag )
    this._css_arguments.push("color: "+val)
   return "%c"+val
 }

// This is used for atom.io quick plugin support
if ( typeof global === "object" ) {
  var up = Print().set_option({use_title: false})
  global.up = up
}

if ( typeof global === "object" && typeof module === "object" && typeof process === "object" )
  module.exports = Print

var a
void function(obj, cnt) {
  if ( cnt > -1 ) {
    obj.level = { "num": --cnt}
    arguments.callee(obj.level, cnt)
  }
}(a = {}, 4)

Print().set_option({max_depth: 3}).log(a)
//console.log(Print().set_option({max_depth: 15, max_line_characters: 400, theme: "light"}).sp(a).toString())//.set_option({theme: "light"}).log(a)

//var t = new Print.Terminal_colors()
//t.string("hellowol", "\n", 3)
//t.string("12345678", "\n", 4)
//console.log(t.formated)
