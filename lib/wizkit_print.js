/*
  Wizkit Wizkit_print is a logger library for the termanal and browser console.

 Copyright (C) 2016  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

Program author: Robert Edward Steckroth II <RobertSteckroth@gmail.com>
*/


var Wizkit_print = function() {

  // This fumction will always act as a Constructer.
  if ( !(this instanceof arguments.callee) )
    return new arguments.callee(arguments[0], arguments[1])

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
        // If the argument is a instanceof the Wizkit_print, then copy its settings over to this instance.
        else if ( arguments[i][x] instanceof arguments.callee )
          settings = arguments[i][x].mutable_options()
    }
    else if ( typeof arguments[i] === "string" ) {
      this.log_title = arguments[i]
    }
    else if ( arguments[i] instanceof arguments.callee ) {
      settings = arguments[i].mutable_options()
    }

  // Settings will be null if no Wizkit_print was passed in to the constructer.
  if ( !settings )
    settings = this.mutable_options()


  for ( var n in settings ) {
    if ( n === "log_title" && this.log_title )
      continue
    this[n] = settings[n]
  }
}

Wizkit_print.prototype = {

  set_option: function() {

    return new this.Print_logger(this.mutable_options()).set_option.apply(this, arguments)
  },
  new_copy: function() {

    // new_copy sinply calls the constructor with a Wizkit_print instance so this just forwards the arguemtns as well.
    return this.Print_logger.prototype.new_copy.apply(this, arguments)
  },
  mutable_options: function() {
    // The mutable_options function simply returns the keys and values of the options. The logger options can be changed with the returned object.
    return this.Print_logger.prototype.mutable_options.call(this)
  },
  Print_logger: function(settings) { // The Wizkit_print constructer is sub-classed here in Wizkit

    if ( settings )
      for ( var n in settings )
        this[n] = settings[n]

    this.contains_text = false
    this._old_plarform = null
    this._last_command = null
    this._output = ""
    this._colorless_output = ""
    this._cache = []
    this._ignore_separater = true
    this._is_from_object = false
    this._always = false
    this.colors = null

    if ( this.platform.toLowerCase() === "nodejs" ) {
      this.colors = Colors_safe
    }
    else if ( this.platform.toLowerCase() === "browser" ) {
      this.colors = new Wizkit_print.Browser_colors()
    }
  },

}

Wizkit_print.prototype.Print_logger.prototype = {

  toColorString: function() {

    return this._output
  },
  toString: function() {

    return this._colorless_output
  },
  text: function() {

    return this._colorless_output
  },
  set_option: function() {

    for ( var i = 0; i < arguments.length; i++ )
      for ( var n in arguments[i] )
        if ( typeof this[n] !== "undefined" )
          this[n] = arguments[i][n]
    return this
  },
  new_copy: function() {
    // This is how Wizkit_print transfers options to other Wizkit Wizkit_print copies. It is best to make a singal Wizkit_print object and then
    // and pass the copy into another Wizkit_print copy. It is in this way that all of the Wizkit_print objects start with the same settings (custom defaults),
    // and then have the options changed individually if nessesary.
    var passed_print = null
    // The options are set from this copy unless another Wizkit_print was passed in. This can be done at the Wizkit_print Constructor as well.
    for ( var x = 0; x < arguments.length; x++ )
      if ( arguments[x] instanceof Wizkit_print.prototype.Print_logger ) {
        passed_print = arguments[x]
        break
    }
    if ( !passed_print )
      passed_print = this

    arguments[arguments.length] = passed_print
    arguments.length++
    return Wizkit_print(arguments)
  },
  mutable_options: function() {
    // This returns an object which represents the configurable options for the logger. The object sets default values if none are set yet.
    return {
      debug: typeof this.debug !== "undefined" ? this.debug : "verbose",
      use_color: typeof this.use_color !== "undefined" ? !!this.use_color : true,
      max_line_characters: typeof this.max_line_characters !== "undefined" ? (parseInt(this.max_line_characters) || 300) : 300,
      log_title: typeof this.log_title !== "undefined" ? this.log_title : "",
      compress_level: typeof this.compress_level !== "undefined" ? parseInt(this.compress_level) : 2,
      use_title: typeof this.use_title !== "undefined" ? !!this.use_title : true,
      indentation_string: typeof this.indentation_string !== "undefined" ? this.indentation_string.toString() : "   ",
      platform: typeof this.platform !== "undefined" ? this.platform : (Wizkit_print.is_node_run && "nodejs" || "browser"),
      quoting: typeof this.quoting !== "undefined" ? this.quoting : "double"
    }
  },
  get always() {

    var This = this
    return function() {
      this._always = true
      return This
    }
  },
  get pass() {

    var This = this
    return function() {
      return This
    }
  },
  get clear() {

    var This = this
    return function() {
      This._output = ""
      This._colorless_output = ""
      if ( !Wizkit_print.is_node_run )
        this.colors.remove_output()
      This.contains_text = false
      return This
    }
  },
  get sp() { // Alias for space

    this._last_command = "sp"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push(" ")
      return This._chain.apply(This, args)
    }
  },
  get space() {

    this._last_command = "space"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push(" ")
      return This._chain.apply(This, args)
    }
  },
  get add_space() {

    this._last_command = "add_space"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push(" ")
      return This._chain.apply(This, args)
    }
  },
  get add_tab() {

    this._last_command = "add_tab"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push("\t\t")
      return This._chain.apply(This, args)
    }
  },
  get tab() {

    this._last_command = "tab"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push("\t\t")
      return This._chain.apply(This, args)
    }
  },
  get add_line() { // Each segement of log_line will be on a seperate line

    this._last_command = "add_line"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push("\n")
      return This._chain.apply(This, args)
    }
  },
  get line() { // Alias for add_line

    this._last_command = "line"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push("\n")
      return This._chain.apply(This, args)
    }
  },
  get add() {

    this._last_command = "add"
    var This = this
    return function() {
      var args = Array.prototype.slice.call(arguments)
      args.push("")
      return This._chain.apply(This, args)
    }
  },
  get _chain() {

    var This = this
    return function() {

      // For fast, on-the-fly, platform changes.
      if ( this._old_plarform !== this.platform ) {
        this._old_plarform = this.platform
        if ( this.platform.toLowerCase() === "nodejs" ) {
          this.colors = Colors_safe
        }
        else if ( this.platform.toLowerCase() === "browser" ) {
          this.colors = new Wizkit_print.Browser_colors()
        }
      }

      This._cache = []
      if ( !arguments.length )
        return This

      var args_len = arguments.length
      if ( !This._ignore_separater && args_len === 1 ) {
        This._output += arguments[0]
        This._colorless_output += arguments[0]
      }

      for ( var i = 0; i < args_len-1; i++ ) {
        var separater = ""
        if ( !!This._last_command && !This._ignore_separater && !(typeof arguments[i] === "string" && !arguments[i].length) )
          separater = arguments[args_len-1]
        This._output += separater
        This._colorless_output += separater

        var outp = This._stringify_object(arguments[i], this.indentation_string)
        This._output += outp

        if ( !This.use_color ) {
          This._colorless_output += outp
        }
        else {
          This.use_color = false
          This._cache = []
          This._colorless_output += This._stringify_object(arguments[i], this.indentation_string)
          This.use_color = true
        }

        This._ignore_separater = false
        This.contains_text = true

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
//        var title_str = This.log_title ? this.colors.blue("[")+This.log_title+this.colors.blue("] ") : ""
        var title_str = This.log_title && This.use_title ? "["+This.log_title+"] " : ""
        var c_args = [title_str+This._output]
        // append any css arguments if the browser segment of our custom colors object was utilized
        if ( This.colors instanceof Wizkit_print.Browser_colors )
          c_args = c_args.concat(This.colors.css_arguments)
        console.log.apply(console, c_args) // TODO: document.write and other printing methods?
      }
      return This
    }
  },
  get log_false() {

    var This = this
    return function() {
      This.log.apply(This, arguments)
      return false
    }
  },
  get log_true() {

    var This = this
    return function() {
      This.log.apply(This, arguments)
      return true
    }
  },
  _stringify_object: function(msg, indent_string, compound, level) { // compound will be placed at the start of each new object in the output (used internally)

    var Buffer = Buffer || function(){}
    indent_string = typeof indent_string === "string" && indent_string || "  "
    compound = compound || ""
    level = Number(level)

    var compress_sep, object_separator

    if ( this.compress_level > 3 ) {
       indent_string = ""
       compress_sep = ""
       object_separator = ""
    }
    else if ( this.compress_level === 3 ) {
      indent_string = ""
      compress_sep = " "
      object_separator = " "
    }
    else if ( this.compress_level === 2 ) {
      compress_sep = "\n"
      object_separator = " "
    }
    else {
      compress_sep = "\n"
      object_separator = "  "
    }

    var modify_string = null
    if ( !this.use_color ) {
      modify_string = (function () { // Simply sends back the argument to superficially support the colors module
        var rs = function(s) { return s }
        return { white: rs, grey: rs, cyan: rs, magenta: rs, red: rs, blue: rs, black: rs, yellow: rs, green: rs }
      })()
    }
    else {
      modify_string = this.colors
    }

    if ( (typeof self !== "undefined" && msg == self) || (typeof global !== "undefined" && msg == global) || (typeof document !== "undefined" && msg == document) )
      return "" // passing in a global is too much work

    if ( msg && (msg instanceof Wizkit_print || msg instanceof Wizkit_print.prototype.Print_logger) ) {
      msg = this._stringify_object(msg.toString())
    }
    else if ( msg === null ) {
      msg = modify_string.cyan("null")
    }
    else if ( typeof msg == "boolean" ) {
      msg = modify_string.red(msg.toString())
    }
    else if ( msg !== msg ) { // NaN is the only js object which is not equal to itself
      msg = modify_string.cyan("NaN")
    }
    else if ( msg instanceof Error ) { // NaN is the only js object which is not equal to itself
      var stack_string = msg.stack.split("\n")
      msg = modify_string.red(stack_string.splice(0,1)) + "\n" + modify_string.yellow(stack_string.join("\n"))
    }
    else if ( typeof msg === "undefined" ) {
      msg = modify_string.yellow("undefined")
    }
    else if ( msg.constructor === Buffer || msg instanceof Buffer ) {
      msg = modify_string.blue("Nodje Buffer() with length of: ")+modify_string.blue(""+msg.length)//+Object.keys(msg).toString())
    }
    else if ( typeof msg === "object" || new Object().toString.call(msg) === "[object Function]" ) {

        var m = "", value_keys_length = Object.keys(msg).length
        // We only use string quotes when the strings are inside a Object.
        this._is_from_object = true

        if ( typeof this._cache[level] === "undefined" )
          this._cache[level] = []

        if ( value_keys_length )
          this._cache[level].push(msg)

        for ( var n = 0; n < level-1; n++ ) {
          for ( var x = 0; x < this._cache[n].length; x++ ) {
            if ( msg === "object" && msg === this._cache[n][x] ) {
               return "!! Circular duplicate of ->\n"+Wizkit_print(this).sp(this._cache[n][x]).text() // Circular reference found, discard object processing
            }
          }
        }

        if ( new Object().toString.call(msg) === "[object Function]" ) {
          // Extra space after comma at end of string is important for m.substr(0, m.length-2) below
          m += modify_string.blue((msg.toString()+"\n").replace(/(.*)\n/g, compound+"$1\n"))+compound
        }
        else if ( msg.constructor === Array ) {
          m += "[" + (this.compress_level < 3 && " " || "")
          if ( !value_keys_length )
            m += "]," + object_separator
        }
        else {
          m += "{" + (this.compress_level < 3 && " " || "")
          if ( !value_keys_length )
            m += "}," + object_separator
        }

        var cnt = 0, character_count = 0, str_add
        for ( var o in msg ) { // Loop through the Object values
          if ( cnt === 0 || typeof msg[o] === "object" ) {
            m += compress_sep+compound+indent_string
          }

          if ( msg.constructor !== Array ) {
            str_add = this._stringify_object(o)+":" + object_separator
            character_count += str_add.length
            m += str_add
          }
          // recursively call this function to parse the object. The indent_string is added to the begining to nest the output
          value = this._stringify_object(msg[o], indent_string, compound+indent_string, ++level) // Add the indent_string to the indent_string chain
          m += value + "," + object_separator
          character_count += (value+","+object_separator).length

          if ( cnt === value_keys_length-1 ) { // Is this he last loop of the value

            m = m.substr(0, m.length-1-object_separator.length)+compress_sep+compound // Remove last space and comma at the end of the value loop

            if ( msg.constructor === Array ) {
              m += "]," + object_separator
            }
            else {
              m += "}," + object_separator
            }
          }
          else if ( character_count >= this.max_line_characters ) {
               m += "\n"+compound+indent_string
               character_count = 0
          }

        cnt++
      }
      m = m.substr(0, (m.length-1-object_separator.length)) // Remove last space and comma at the end of the Object loop
      if ( compound )
        m = compress_sep+compound+m

      this._is_from_object = false
      msg = m
    }
    else if ( typeof msg === "number" ) {
      msg = modify_string.green(msg.toString())// .replace(/\./, modify_string.grey("."))) // If there is a decimal, color it white
    }
    else if ( typeof msg === "string" ) {
      // This is set if the sting is from an object
      if ( this._is_from_object && this.quoting.toLowerCase() === "double") {
        msg = modify_string.blue("\"")+modify_string.magenta(msg)+modify_string.blue("\"")
      }
      else if ( this._is_from_object && this.quoting.toLowerCase() === "single") {
        msg = modify_string.blue("\'")+modify_string.magenta(msg)+modify_string.blue("\'")
      }
      else {
        msg = modify_string.magenta(msg)
      }
    }
    else {
      msg = modify_string.red(msg.toString())
    }

    return msg
  },

}

Wizkit_print.Browser_colors = function() {
  // This will replace the nodejs terminal color output with browser complient console.log modify_string.
  this._css_arguments = []
  this.default_color = "grey"
  this.theme = "light"
}

Wizkit_print.Browser_colors.prototype = {

  // Empty the array anytime it is retrived
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

var fake_logger = new (function() { // The FakeWizkit_print is used to disable logging when debug is set to false (it is efficiant this way).

    var f = (function() {
      return this
    }).bind(this)

    for ( var o in Wizkit_print.prototype.Print_logger.prototype )
      this[o] = f

    this.log_false = function() {  return false }
    this.log_true = function() { return true }

})()

for ( var n in Wizkit_print.prototype.Print_logger.prototype ) {
//  console.log(n, typeof Wizkit_print.prototype[n] === "undefined")

  if ( typeof Wizkit_print.prototype[n] === "undefined" && n.charAt(0) !== "_" ) {
    var forward = function() {
      return (this.debug === "verbose" || this._always ) && new this.Print_logger(this.mutable_options())[arguments.callee.command_name].apply(this, arguments) || fake_logger
    }
    forward.command_name = n
    Wizkit_print.prototype[n] = forward
  }
}

Wizkit_print.is_node_run = typeof module !== "undefined" && typeof module.exports !== "undefined"
if ( Wizkit_print.is_node_run ) {
  var Colors_safe = require("colors/safe")
  module.exports = Wizkit_print
}
