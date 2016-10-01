/*
  Brackit Print is a printing and logging tool for javascript engines which will unify logging amongst projects and platforms.

 Copyright (C) 2016  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 This file is a part of Brackit Print

 Brackit Print is free software: you can redistribute it and/or modify
 it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Brackit Print is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/// Author: Robert Edward Steckroth <RobertSteckroth@gmail.com>

var Print = function() {

  // This fumction will always act as a Constructer.
  // Call the constructor with the same arguments as initially called with as a new instance if it was not done so.
  if ( !(this instanceof arguments.callee) ) {
    var call_instance = arguments.callee
    for ( var x = 0; x < arguments.length; x++ )
       call_instance = call_instance.bind(call_instance.prototype, arguments[x])
    return new call_instance()
  }

  this.log_title = null
  var settings = null
  for ( var i = 0; i < arguments.length; i++ )
    // This loop considers the arguments object as well. If one of the arguments is an arguments object, then it will have a length as well.
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
    for ( var i = 0; i < arguments.length; i++ )
      for ( var n in arguments[i] )
        if ( typeof this[n] !== "undefined" )
          this[n] = arguments[i][n]
    return this
  },
  new_copy: function() {
    // This is how Print transfers options to other Wizkit Print copies. It is best to make a singal Print object and then
    // and pass the copy into another Print copy. It is in this way that all of the Print objects start with the same settings (custom defaults),
    // and then have the options changed individually if nessesary.
    var passed_print = null
    // This can be done at the Print Constructor as well.
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
    // This returns an object which represents the configurable options for the logger. The object sets default values if none are set yet.
    // Any ont the options below can be changed whenever is nessesary in the call chain.
    return {
      debug: typeof this.debug !== "undefined" ? this.debug : "verbose",
      use_color: typeof this.use_color !== "undefined" ? !!this.use_color : true,
      use_title_stamp: typeof this.use_title_stamp !== "undefined" ? !!this.use_title_stamp: true,
      max_line_characters: typeof this.max_line_characters !== "undefined" ? (parseInt(this.max_line_characters) || 500) : 500,
      log_title: typeof this.log_title !== "undefined" ? this.log_title : "",
      compress_level: typeof this.compress_level !== "undefined" ? parseInt(this.compress_level) : 2,
      use_title: typeof this.use_title !== "undefined" ? !!this.use_title : true,
      indentation_string: typeof this.indentation_string !== "undefined" ? this.indentation_string.toString() : "   ",
      platform: typeof this.platform !== "undefined" ? this.platform : (Print.is_node_run && "nodejs" || "browser"),
      quoting: typeof this.quoting !== "undefined" ? this.quoting : "double",
      denote_line: typeof this.denote_line !== "undefined" ? this.denote_line : "\n",
      denote_tab: typeof this.denote_denote_tab !== "undefined" ? this.denote_denote_tab : "\t",
      denote_space: typeof this.denote_denote_space !== "undefined" ? this.denote_denote_space : " ",
      denote_add: typeof this.denote_add !== "undefined" ? this.denote_add : "",
      character_limit: typeof this.character_limit !== "undefined" ? parseInt(this.character_limit) || 2 * 1000 * 1000 : 2 * 1000 * 1000,
      compress_function: typeof this.compress_function !== "undefined" ? !!this.compress_function : false
    }

  },
  get pass() {
     // A simple this return
     var This = this
     return function() {
       return This
     }
   },
   get clear() {
     // Remove all of the text storage from the current instance.
     var This = this
     return function() {
       This._output = ""
       This._colorless_output = ""
       if ( This.platform.toLowerCase() === "browser" )
         This._colors.remove_output()
       This._contains_text = false
       return This
     }
   },
   //----------------------------------------------------------------------------
   // Here are all of the print  commands which ease string formation.
   print_command: function() {
     var This = this
     return function() {
       return This._chain.apply(This, arguments)
     }
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

     var This = this
     return function() {

       // For fast, on-the-fly, platform changes.
       if ( This._old_platform.toLowerCase() !== This.platform.toLowerCase() ) {
         This._old_platform = This.platform
         if ( This.platform.toLowerCase() === "nodejs" ) {
           This._colors = Colors_safe
           This._colors.enabled = true

         }
         else if ( This.platform.toLowerCase() === "browser" ) {
           This._colors = new Print.Browser_colors()
         }
         else if ( This.platform.toLowerCase() === "html" || This.platform.toLowerCase() === "console_html" ) {
           This._colors = new Print.Html_colors()
           This.denote_line = "<br>"
           This.denote_tab = "&#09;"
           This.denote_space = "&nbsp;"
           This.denote_add = ""
         }
       }

       var indentation = This.indentation_string.replace(/\t/g, This.denote_tab).replace(/\n/g, This.denote_line).replace(/\ /g, This.denote_space)
       if ( This.platform.toLowerCase() === "html" || This.platform.toLowerCase() === "console_html" )
         This.output += This._colors.default_color_tag()

       // Empty the Object processing cache which is used to endure Circular object references do not occur within printing.
       This._cache = []
       if ( !arguments.length )
         return This

       for ( var i = 0; i < arguments.length; i++ ) {

         if ( !!This._last_command && !This._ignore_separater && This["denote_"+This._last_command] ) {
           This._output += This["denote_"+This._last_command]
           This._colorless_output += This["denote_"+This._last_command]
         }

         var outp = This._stringify_object(arguments[i], indentation)
         This._output += outp

         if ( !This.use_color ) {
           This._colorless_output += outp
         }
         else {
           This.use_color = false
           This._cache = []
           //This.tally = 0
           This._colorless_output += This._stringify_object(arguments[i], indentation)
           This.use_color = true
         }

         if ( This.platform.toLowerCase() === "html" || This.platform.toLowerCase() === "console_html" )
           This.output += "</span>"

         This._ignore_separater = false
         This._contains_text = true
       }
       return This
     }
   },
   get log() {

     var This = this
     return function() {
       if ( arguments.length > 0 ) {
         // Call the last command used before this log again.
         if ( This[This._last_command] ) {
          This[This._last_command].apply(This, arguments)
         }
         else {
           This._ignore_separater = true
           This.space.apply(This, arguments)
         }
       }

       if ( This._output ) {
         // Append the logging title if there is one set and then turn the entire output string
         // into an array to pass with the console.log.apply
         var title_str = This.use_title && (This.log_title || This.use_title_stamp) ? "["+(This.use_title_stamp && new Date()+" - " || "")+This.log_title+"] " : ""
         var c_args = [title_str+This._output]
         // append any css arguments if the browser segment of our custom _colors object was utilized
         if ( This.platform.toLowerCase() === "browser" )
           c_args = c_args.concat(This._colors.css_arguments)

         if ( This.platform.toLowerCase() === "browser" || This.platform.toLowerCase() === "nodejs" || This.platform.toLowerCase() === "console_html" )
           console.log.apply(console, c_args)
         else if ( This.platform.toLowerCase() === "html" && typeof document !== "undefined" && typeof document.write !== "undefined" )
           document.write(c_args)
       }
       return This
     }
   },
   get log_false() {
     // These will return true/false regardless of the debuffing state as well.
     var This = this
     return function() {
       This.log.apply(This, arguments)
       return false
     }
   },
   get log_true() {
     // These will return true/false regardless of the debuffing state as well.
     var This = this
     return function() {
       This.log.apply(This, arguments)
       return true
     }
   },
   _stringify_object: function(msg, indent_string, compound, level) { // compound will be placed at the start of each new object in the output (used internally)
     // The Object to text parsing engine. This function will print any Object passed to it (including function text), in the most litteral way possible.
     // It can be recursively called within itself and also accepts modifiers to alter output. The indent_string argument contains how the
     // subsequent Object levels will seperate from the left margin. The indent_string is multiplied by the Object level when looping through
     // hierachrchial Objects and stored in the compound argument. The level is the current Object level being parsed if the Object has a hierarchy.

     //if ( this.tally > this.max_line_characters ) {
       //return ""
     //}
     indent_string = typeof indent_string === "string" && indent_string || ""//(this.denote_space.toString()+this.denote_space.toString())
     compound = compound && compound.toString() || ""
     level = parseInt(level) || 0
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
       object_separator = this.denote_space.toString()+this.denote_space.toString()
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

       var m = "", value_keys_length = Object.keys(msg).length, proto_keys_length = 0
       if ( typeof msg.__proto__ === "object" )
         proto_keys_length = Object.keys(msg.__proto__).length

       this._is_from_object = true

       if ( typeof this._cache[level] === "undefined" )
          this._cache[level] = []

       if ( (value_keys_length || proto_keys_length) && typeof msg === "object")
          this._cache[level].push(msg)

       for ( var n = 0; n < level; n++ ) {
         for ( var x = 0; x < this._cache[n].length; x++ ) {
           if ( typeof msg === "object" && msg === this._cache[n][x] ) {
             // Circular reference found, discard object processing
             var circ_text = "-- Circular duplicate of { "
             var obj_qualifier = Object.keys(this._cache[n][x]).toString() || ""
             if ( circ_text.length+obj_qualifier.length > 75 )
                obj_qualifier = obj_qualifier.substr(0, 71) + "... "
             circ_text += obj_qualifier + " }"
             return this._stringify_object(circ_text)
           }
         }
       }
       var is_array = msg.constructor === Array
       // A way to tell if an Object is a function in javascript.
       if ( typeof msg === "function" ) { //Object.prototype.toString.call(msg) === "[object Function]" ) {
         // Extra space after comma at end of string is important for m.substr(0, m.length-2) below
         //var f_text = modify_string.blue(msg.toString())
         var f_text = ""
         if ( this.compress_function ) {
           f_text = modify_string.blue(msg.toString().replace(/(function[^\{]+).*/g, "$1{ ... },"+this.denote_line))
         }
         else {
           f_text = modify_string.blue((msg.toString()+this.denote_line).replace(/(.*)\n/g, "$1"+this.denote_line))//+compound
         }
         //this.tally += f_text.length
         //if ( this.tally < this.character_limit ) {
         m += f_text
        // }
         return m
       }
       else {
         var b_text = modify_string.cyan(is_array&&"["||"{") + (this.compress_level < 3 && this.denote_space || "")
         if ( !value_keys_length ) {
           if ( proto_keys_length ) {
             b_text += modify_string.cyan(is_array&&"]"||"}") + modify_string.grey(".__proto__ = ") + modify_string.cyan("{") + compress_sep + compound + indent_string
           } else {
             b_text += modify_string.cyan(is_array&&"],"||"},") + object_separator
           }
         }
         //this.tally += b_text.length
         //if ( this.tally > this.character_limit )
          //  return ""
         m += b_text
       }
       var cnt = 1, character_count = 0, str_add = ""
       for ( var o in msg ) { // Loop through the Object values

         // Add the indent string to the begining of the parsing loop or if the item is an Object. This is the primary formating controler.
         if ( cnt === 1 || typeof msg[o] === "object" ) {
           str_add += compress_sep + compound + indent_string
         }
         if ( !is_array ) {
           // _stringify_object is used here to format the qualifier strings if this loop is parsing an object. Otherwise the values are
           // printed only via the _stringify_object below.
           var more = this._stringify_object(o) + modify_string.blue(":") + object_separator
           character_count += more.length
           str_add += more
         }
         //this.tally += str_add.length
         // recursively call this function to parse the object. The indent_string is added to the begining to nest the output. It is impotant to
         // use level+1 here instead of assignment operators like level++ or ++level so that it is only passed in with an increment ans this
         // function call keeps the value of level. This way each call to _stringify_object uses a level incremented by one from the calling _stringify_object.
         var value = this._stringify_object(msg[o], indent_string, compound + indent_string, level+1)
         //m += value + modify_string.black(",") + object_separator
         str_add += value + modify_string.grey(",") + object_separator
         // TODO: reformat to account for color characters
//         character_count += (value+","+object_separator).length
         // These two positions of the loop separate the ___proto__ and property values of the Object which is being parsed.
         if ( cnt === value_keys_length || cnt === value_keys_length+proto_keys_length ) {
           // Remove the last comma from the item list and add the newline and indentation.
           str_add = str_add.substr(0, str_add.length-modify_string.grey(",").length-object_separator.length) + compress_sep + compound
           // The Object contains a __proto__ if proto_keys_length is non-zero. Enumeration into the __proto__ begins after all of the Properties are
           // itterated over. __proto__ variables will not be enumerated by Object.keys but will be via the "for" command.
           if ( value_keys_length && proto_keys_length && cnt === value_keys_length )
              str_add += modify_string.cyan(is_array&&"]"||"}") + modify_string.grey(".__proto__ = ") + modify_string.cyan("{") + compress_sep + compound// + indent_string
           else
              str_add += modify_string.cyan(is_array&&"]"||"}") + modify_string.grey(",") + object_separator
         }
         else if ( this.max_line_characters > 0 && character_count >= this.max_line_characters ) {
           // If the maximum number of newlines is reached than a newline is addeda along with the same indentation at this level.
           str_add += this.denote_line + compound// + indent_string
           character_count = 0
         }
         cnt++
         //this.tally += str_add.length
         //if ( this.tally > this.character_limit ) {
        //   str_add = ""
        //   break
        // }
       }

       // Remove last denote and comma at the end of the Object loop
       str_add = str_add.substr(0, str_add.length-modify_string.grey(",").length-object_separator.length)

       this._is_from_object = false
       //this.tally += str_add.length
       //if ( this.tally <= this.character_limit )
          m += str_add

       return m
     }
     else if ( typeof msg === "number" ) {
       return modify_string.green(msg.toString())
     }
     else if ( typeof msg === "string" ) {
       // This is set if the sting is from an object
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

     return format
   },

 }

 Print.Html_colors = function() {
   // This will replace the nodejs terminal color output with browser complient console.log modify_string.
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
   default_color_tag: function(args) {
     return "<span style='color:"+this.theme_transform(this.default_color, this.theme)+";'>"
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
   // This will replace the nodejs terminal color output with browser complient console.log modify_string.
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

     this._css_arguments.push("color: "+this.theme_transform(args.callee.name, this.theme))
     this._css_arguments.push("color: "+this.theme_transform(this.default_color, this.theme))
     return "%c"+args[0].toString()+"%c"
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
          return (this.debug === "verbose" || this._always ) && new this.Shim(this.mutable_options())[cmd].apply(this, arguments) || fake_logger
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
