/*
  Brackit Print is a printing and logging tool for javascript engines which will unify logging amongst projects and platforms.

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

  // this fumction will always act as a Constructer.
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
          settings = arguments[i][x].mutable_options()
    }
    else if ( typeof arguments[i] === "string" ) {
      this.log_title = arguments[i]
    }
    else if ( arguments[i] instanceof arguments.callee ) {
      settings = arguments[i].mutable_options()
    }

  // Settings will be null if no Print was passed in to the constructer.
  if ( !settings )
    settings = this.mutable_options()

  for ( var n in settings ) {
    if ( n === "log_title" && this.log_title )
      continue
    this[n] = settings[n]
  }
}

Print.prototype = {

  toColorString: function() {

    return ""
  },
  toString: function() {

    return ""
  },
  set_option: function() {

    return new this.Shim(this.mutable_options()).set_option.apply(this, arguments)
  },
  new_copy: function() {

    // new_copy sinply calls the constructor with a Print instance so this just forwards the arguments as well.
    return this.Shim.prototype.new_copy.apply(this, arguments)
  },
  mutable_options: function() {

    // The mutable_options function simply returns the keys and values of the options. The logger options can be changed with the returned object.
    return this.Shim.prototype.mutable_options.call(this)
  },
  always: function() {

    var setting = this.mutable_options()
    setting._always = true
    return new this.Shim(setting)
  },
  Shim: function(settings) {

    // The Print constructer is sub-classed here in Wizkit

    if ( settings )
      for ( var n in settings )
        this[n] = settings[n]

    //this.tally = 0
    this._old_platform = ""
    this._last_command = null
    this._output = ""
    this._colorless_output = ""
    this._cache = []
    this._ignore_separater = true
    this._is_from_object = false
    this._always = !!(this._always)
    this.colors = null

    if ( this.platform.toLowerCase() === "nodejs" ) {
      this.colors = Colors_safe
      this.colors.enabled = true
    }
    else if ( this.platform.toLowerCase() === "browser" ) {
      this.colors = new Print.Browser_colors()
    }
  },
}

Print.prototype.Shim.prototype = {

  toColorString: function() {

    return this._output
  },
  toString: function() {

    return this._colorless_output
  },
  set_option: function() {
    // The other way of setting the options which resturns this for call chain and Object storage purposes.
    var option = this.mutable_options()
    for ( var i = 0; i < arguments.length; i++ )
      for ( var n in arguments[i] )
        if ( typeof option[n] !== "undefined" ) {
          this[n] = arguments[i][n]
        } else {
          this.always().log("Option", n, "is not a brackit print option. Use mutable_options() to see all user configurable options.")
        }
    return this
  },
  new_copy: function() {
    // this is how Print transfers options to other Wizkit Print copies. It is best to make a singal Print object and then
    // and pass the copy into another Print copy. It is in this way that all of the Print objects start with the same settings (custom defaults),
    // and then have the options changed individually if nessesary.
    var passed_print = null
    // this can be done at the Print Constructor as well.
    for ( var x = 0; x < arguments.length; x++ )
      if ( arguments[x] instanceof Print.prototype.Shim ) {
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
  mutable_options: function() {
    // this returns an object which represents the configurable options for the logger. The object sets default values if none are set yet.
    // Any ont the options below can be changed whenever is nessesary in the call chain.
    return {
      debug: typeof this.debug !== "undefined" ? this.debug : "verbose",
      use_color: typeof this.use_color !== "undefined" ? !!this.use_color : true,
      use_title_stamp: typeof this.use_title_stamp !== "undefined" ? !!this.use_title_stamp: true,
      max_line_characters: typeof this.max_line_characters !== "undefined" ? (parseInt(this.max_line_characters) || 500) : 500,
      log_title: typeof this.log_title !== "undefined" ? this.log_title : "",
      compress_level: typeof this.compress_level !== "undefined" ? parseInt(this.compress_level) : 1,
      use_title: typeof this.use_title !== "undefined" ? !!this.use_title : true,
      indentation_string: typeof this.indentation_string !== "undefined" ? this.indentation_string.toString() : "   ",
      platform: typeof this.platform !== "undefined" ? this.platform : (Print.is_node_run && "nodejs" || "browser"),
      quoting: typeof this.quoting !== "undefined" ? this.quoting : "double",
      denote_line: typeof this.denote_line !== "undefined" ? this.denote_line : "\n",
      denote_tab: typeof this.denote_denote_tab !== "undefined" ? this.denote_denote_tab : "\t",
      denote_space: typeof this.denote_denote_space !== "undefined" ? this.denote_denote_space : " ",
      denote_add: typeof this.denote_add !== "undefined" ? this.denote_add : "",
      character_limit: typeof this.character_limit !== "undefined" ? parseInt(this.character_limit) || 2 * 1000 * 1000 : 2 * 1000 * 1000,
      compress_function: typeof this.compress_function !== "undefined" ? !!this.compress_function : false,
      max_depth: typeof this.max_depth !== "undefined" ? (parseInt(this.max_depth) || 100) : 100

    }

  },
  get pass() {
     // A simple this return
     return (function() {
       return this
     }).bind(this)
   },
   get clear() {
     // Remove all of the text storage from the current instance.
     return (function() {
       this._output = ""
       this._colorless_output = ""
       if ( this.platform.toLowerCase() === "browser" )
         this._colors.remove_output()
       this._contains_text = false
       return this
     }).bind(this)
   },
   //----------------------------------------------------------------------------
   // Here are all of the print commands which ease string formation.
   print_command: function() {
     return (function() {
       return this._chain.apply(this, arguments)
     }).bind(this)
   },
   get sp() { // Alias for space
     this._last_command = "space"
     return this.print_command()
   },
   get space() {
     this._last_command = "space"
     return this.print_command()
   },
   get tab() {
     this._last_command = "tab"
     return this.print_command()
   },
   get line() {
     this._last_command = "line"
     return this.print_command()
   },
   get add() {
     this._last_command = "add"
     return this.print_command()
   },
   get _chain() {

     return (function() {
       // For fast, on-the-fly, platform changes.
       if ( this._old_platform.toLowerCase() !== this.platform.toLowerCase() ) {
         this._old_platform = this.platform
         if ( this.platform.toLowerCase() === "nodejs" ) {
           this._colors = Colors_safe
           this._colors.enabled = true

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
         if ( !!this._last_command && !this._ignore_separater && this["denote_"+this._last_command] ) {
           this._output += this["denote_"+this._last_command]
           this._colorless_output += this["denote_"+this._last_command]
         }

         var outp = this._stringify_object(arguments[i], indentation)
         this._output += outp

         if ( !this.use_color ) {
           this._colorless_output += outp
         }
         else {
           this.use_color = false
           this._cache = []
           this._colorless_output += this._stringify_object(arguments[i], indentation)
           this.use_color = true
         }

         this._ignore_separater = false
         this._contains_text = true
       }
       return this
     }).bind(this)
   },
   get log() {

     return (function() {

       if ( arguments.length > 0 ) {
         // Call the last command used before this log again.
         if ( this[this._last_command] ) {
          this[this._last_command].apply(this, arguments)
         }
         else {
           this._ignore_separater = true
           this.space.apply(this, arguments)
         }
       }
       if ( this._output ) {
         // Append the logging title if there is one set and then turn the entire output string
         // into an array to pass with the console.log.apply
         var title_str = this.use_title && (this.log_title || this.use_title_stamp) ? "["+(this.use_title_stamp && new Date()+(this.log_title&&" - "||"") || "")+this.log_title+"] " : ""
         var c_args = [title_str+this._output]
         // append any css arguments if the browser segment of our custom _colors object was utilized
         if ( this.platform.toLowerCase() === "browser" )
           c_args = c_args.concat(this._colors.css_arguments)
         if ( this.platform.toLowerCase() === "browser" || this.platform.toLowerCase() === "nodejs" || this.platform.toLowerCase() === "console_html" )
           console.log.apply(console, c_args)
         else if ( this.platform.toLowerCase() === "html" && typeof document !== "undefined" && typeof document.write !== "undefined" )
           document.write(c_args)
       }
       return this
     }).bind(this)
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
     var modify_string = null
     if ( !this.use_color ) {
       modify_string = (function () { // Simply sends back the argument to superficially support the _colors module
         var rs = function(s) { return s }
         return { white: rs, grey: rs, cyan: rs, magenta: rs, red: rs, blue: rs, black: rs, yellow: rs, green: rs }
       })()
     }
     else {
       modify_string = this._colors
     }

     if ( msg && (msg instanceof Print.prototype.Shim) ) {
       return this._stringify_object(msg.toString())
     }
     else if ( msg === null ) {
       return modify_string.cyan("null")
     }
     else if ( typeof format == "boolean" ) {
       return modify_string.red(msg.toString())
     }
     else if ( msg !== msg ) { // NaN is the only js object which is not equal to itself
       return modify_string.cyan("NaN")
     }
     else if ( msg instanceof Error ) {
       var stack_string = msg.stack.split(this.denote_line)
       return modify_string.red(stack_string.splice(0,1)) + this.denote_line + modify_string.yellow(stack_string.join(this.denote_line))
     }
     else if ( typeof msg === "undefined" ) {
       return modify_string.yellow("undefined")
     }
     else if ( typeof Buffer !== "undefined" && msg.__proto__ && msg.__proto__.constructor === Buffer ) {
       return this._stringify_object(msg.toString())
     }
     else if ( typeof msg === "object" || typeof msg === "function" ) {

       // Here is the man object parsing function. It will print all of the data from a Object including functions and prototypes.
       var m = "", value_keys_length = Object.keys(msg).length, proto_keys_length = 0, proto_traverse = msg.__proto__
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
             var circ_text = "-- Circular duplicate of { "
             var obj_qualifier = Object.keys(this._cache[n][x]).toString() || ""
             if ( circ_text.length+obj_qualifier.length > 75 )
                obj_qualifier = obj_qualifier.substr(0, 71-circ_text.length) + "... "
             circ_text += obj_qualifier + " }"
             return this._stringify_object(circ_text)
           }
         }
       }
       var is_array = msg.constructor === Array

       if ( typeof msg === "function" ) {
         var f_text = ""
         if ( this.compress_function ) {
           f_text = modify_string.blue(msg.toString().replace(/(function[^\{]+).*/g, "$1{ ... }"))
         }
         else {
           var msg = msg.toString()
           if ( msg.match(/\[native code\]/i) )
              f_text = modify_string.blue(msg.toString().replace(/(.*)\n*/g, "$1"))//+compound
           else
              f_text = modify_string.blue(this.denote_line + compound + msg.toString().replace(/(.*)\}[\ ,\n]*/g, "$1").replace(/\n/g, this.denote_line+compound) + this.denote_line + compound + "}")
         }
         return f_text
       }
       else {
         var b_text = modify_string.cyan(is_array&&"["||"{") + (this.compress_level < 3 && this.denote_space || "")
         if ( !value_keys_length ) {
           if ( proto_keys_length ) {
              b_text += modify_string.cyan(is_array&&"]"||"}") + modify_string.grey(".__proto__ = ") + modify_string.cyan("{") + compress_sep + compound + indent_string
              // If the __proto__ object is nesed than this will correctly navagate into it.
              b_text += this._stringify_object(msg.__proto__, indent_string, compound + indent_string, level+1)
           } else {
              b_text += modify_string.cyan(is_array&&"]"||"}") + modify_string.grey(",") + object_separator
           }
         }
         m += b_text
       }
       var cnt = 1, character_count = 0, str_add = ""
       for ( var o in msg ) { // Loop through the Object values
         // Add the indent string to the begining of the parsing loop or if the item is an Object. this is the primary formating controler.
         var is_literal_object = !!(typeof msg[o] === "object" && msg[o] !== null && msg[o] !== undefined && (Object.keys(msg[o]).length || Object.keys(msg[o].__proto__).length) )
         if ( cnt === 1 || is_literal_object || this.compress_level === 1 ) {
           str_add += compress_sep + compound + indent_string
           if ( cnt === 1 && msg.valueOf() !== msg ) {
             var more = modify_string.red("[[PrimitiveValue]]") + modify_string.blue(":") + object_separator
             more += this._stringify_object(msg.valueOf(), indent_string. compound + indent_string, level+1)
             more += modify_string.grey(",") + compress_sep + indent_string
             character_count += more.length
             str_add += more
           }
           // If the item has a primitive value than it will not be equal to it self and therefor the primitive value should be displayed.
         }
         if ( !is_array ) {
           // _stringify_object is used here to format the qualifier strings if this loop is parsing an object. Otherwise the values are
           // printed only via the _stringify_object below.
           var more = this._stringify_object(o) + modify_string.blue(":") + object_separator
           character_count += more.length
           str_add += more
         }
         // recursively call this function to parse the object. The indent_string is added to the begining to nest the output. It is important to
         // use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
         // function call keeps the value of level. this way each call to _stringify_object uses a level incremented by one from the calling _stringify_object.
         var value = ""
         // Here parses nested Objects from within Objects and stops at the level specified in the max_depth setting. this is good for super massive
         // Objects like browser self, window and document (it will print the node
         if ( level < this.max_depth-1 ) {
            value = this._stringify_object(msg[o], indent_string, compound + indent_string, level+1)
         } else if ( !is_literal_object ) {
            value = this._stringify_object(msg[o], indent_string, compound + indent_string, level+1)
         } else {
            value = this._stringify_object("["+(is_array && "Array" || "Object") + " - length: "+(value_keys_length+proto_keys_length)+"]", indent_string, compound + indent_string)
         }

         str_add += value + modify_string.grey(",") + object_separator
         // TODO: reformat to account for color characters
//         character_count += (value+","+object_separator).length
         // These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
         if ( cnt === value_keys_length || cnt === value_keys_length+proto_keys_length ) {
           // Remove the last comma from the item list and add the newline and indentation.
           str_add = str_add.substr(0, str_add.length-modify_string.grey(",").length-object_separator.length) + compress_sep + compound
           if ( modify_string instanceof Print.Browser_colors ) {
              modify_string.css_arguments.splice(-2)
           }
           // The Object contains a __proto__ if proto_keys_length is non-zero. Enumeration into the __proto__ begins after all of the Properties are
           // itterated over. __proto__ variables will not be enumerated by Object.keys but will be via the "for" command.
           if ( value_keys_length && proto_keys_length && cnt === value_keys_length ) {
              str_add += modify_string.cyan(is_array&&"]"||"}") + modify_string.red("__proto__") + modify_string.blue(":") + object_separator + modify_string.cyan("{") + compress_sep + compress_sep
              str_add += this._stringify_object(msg.__proto__, indent_string, compound + indent_string, level+1)
           }
          //    str_add += indent_string + modify_string.red("__proto__") + modify_string.blue(":") + modify_string.cyan("{") + compress_sep + compound
           else
              str_add += modify_string.cyan(is_array&&"]"||"}") + modify_string.grey(",") + object_separator
         }
         else if ( this.max_line_characters > 0 && character_count >= this.max_line_characters ) {
           // If the maximum number of newlines is reached than a newline is addeda along with the same indentation at this level.
           //str_add += this.denote_line + compound// + indent_string
           character_count = 0
         }
         cnt++
       }

       m += str_add
       m = m.substr(0, m.length-modify_string.grey(",").length-object_separator.length)
       if ( modify_string instanceof Print.Browser_colors ) {
         modify_string.css_arguments.splice(-2)
       }
       if ( !level )
         this._is_from_object = false

       return m
     }
     else if ( typeof msg === "number" ) {
       return modify_string.green(msg.toString())
     }
     else if ( typeof msg === "string" ) {
       // this is set if the sting is from an object
       if ( this._is_from_object && this.quoting.toLowerCase() === "double") {
         return modify_string.blue("\"")+modify_string.magenta(msg)+modify_string.blue("\"")
       }
       else if ( this._is_from_object && this.quoting.toLowerCase() === "single") {
         return modify_string.blue("\'")+modify_string.magenta(msg)+modify_string.blue("\'")
       }
       else {
         return modify_string.magenta(msg)
       }
     }
     else {
       return modify_string.red(msg.toString())
     }
   }

 }

 Print.Html_colors = function() {
   // this will replace the nodejs terminal color output with browser complient console.log modify_string.
   this.default_color = "grey"
   this.theme = "light"
 }

 Print.Html_colors.prototype = {

   format: function(args) {

     return "<span style='color:"+this.theme_transform(args.callee.name, this.theme)+";'>"+args[0].toString()+"</span>"
   },
   theme_transform: function(c, announce) {

     if ( announce === "light" )
       return (c === "white" && "black") ||
       (c === "magenta" && "#682f01") || // string in native
       (c === "yellow" && "#a1ab00") || // undefine in native
       (c === "cyan" && "cyan") || // null in native
       c
     else
       return c
   },
   white: function white() { return this.format(arguments) },
   grey: function grey() { return this.format(arguments) },
   cyan: function cyan() { return this.format(arguments) },
   magenta: function magenta() { return this.format(arguments) },
   red: function red() { return this.format(arguments) },
   blue: function blue() { return this.format(arguments) },
   yellow: function yellow() { return this.format(arguments) },
   green: function green() { return this.format(arguments) },
   black: function black() { return this.format(arguments) },
 }

 Print.Browser_colors = function() {
   // this will replace the nodejs terminal color output with browser complient console.log modify_string.
   this._css_arguments = []
   this.default_color = "grey"
   this.theme = "light"
 }

 Print.Browser_colors.prototype = {

   get css_arguments() {

     return this._css_arguments
   },
   remove_output: function() {

     return this._css_arguments.splice(0)
   },
   format: function(args) {

     if ( (typeof args[0] === "string" && !args) || typeof args[0] === undefined )
       return ""

     this._css_arguments.push("color: "+args.callee.name)//this.theme_transform(args.callee.name, this.theme))
     //     t"%c"+args[0].toString()his._css_arguments.push("color: "+this.default_color)//this.theme_transform(this.default_color, this.theme))
     return "%c"+args[0].toString()
   },
   theme_transform: function(c, announce) {

     if ( announce === "light" )
     return (c === "white" && "black") ||
     (c === "magenta" && "#682f01") || // string in native
     (c === "yellow" && "#a1ab00") || // undefine in native
     (c === "cyan" && "cyan") || // null in native
     c
     else
     return c

   },
   white: function white() { return this.format(arguments) },
   grey: function grey() { return this.format(arguments) },
   cyan: function cyan() { return this.format(arguments) },
   magenta: function magenta() { return this.format(arguments) },
   red: function red() { return this.format(arguments) },
   blue: function blue() { return this.format(arguments) },
   yellow: function yellow() { return this.format(arguments) },
   green: function green() { return this.format(arguments) },
   black: function black() { return this.format(arguments) },
 }

 var fake_logger = new (function() { // The FakePrint is used to disable logging when debug is set to false (it is efficiant this way).

     var f = (function() {
       return this
     }).bind(this)

     for ( var o in Print.prototype.Shim.prototype )
       this[o] = f

     this.log_false = function() { return false }
     this.log_true = function() { return true }
 })()

;(function() {

  var main_sequence = {}
  for ( var a in Print.prototype )
    main_sequence[a] = true
  for ( var n in Print.prototype.Shim.prototype ) {
    if ( typeof Print.prototype[n] === "undefined" && n.charAt(0) !== "_" ) {

      var forward = function() {
        var cmd = arguments.callee.command_name
        if ( typeof main_sequence[cmd] !== "undefined" ) {
          return new this.Shim(this.mutable_options())[cmd].apply(this, arguments)
        }
        else {
          if ( this.debug === "verbose" || this._always ) {
            return new this.Shim(this.mutable_options())[cmd].apply(this, arguments)
          }
          else {
            return fake_logger
          }
        }
      }
      forward.command_name = n
      Print.prototype[n] = forward
    }
  }
})()

Print.is_node_run = typeof module !== "undefined" && typeof module.exports !== "undefined"
if ( Print.is_node_run ) {
  var Colors_safe = require("colors/safe")
  module.exports = Print
}

var up = Print().set_option({use_title: false})
global.up = up
