
var Browser_colors = function() {
  // This will replace the nodejs terminal color output with browser complient console.log modify_string.
  this._css_arguments = []
  this.default_color = "grey"
  this.theme = "light"
}

Browser_colors.prototype = {

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
  cyan: function cyan() { return this.fomat(arguments) },
  magenta: function magenta() { return this.format(arguments) },
  red: function red() { return this.format(arguments) },
  blue: function blue() { return this.format(arguments) },
  yellow: function yellow() { return this.format(arguments) },
  green: function green() { return this.format(arguments) },
  black: function black() { return this.format(arguments) },

}

module.exports = Browser_colors
