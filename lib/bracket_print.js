/*
  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.
Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com>

// This will be striped out by the requirejs optimizer.
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require", "./proto_object", "./style_map"], function(require, obj, style_map) {
	
	var Print = function() {
	  // This accepts all of the parameters as set_option does. 

		// This will call the constructor with the same arguments as initially passed as a new instance if it was not done so to ensure a new instance is
		// always created when invoking the constructor.
	  if ( !(this instanceof Print) ) {
		 var call_instance = Print
		 for ( var x = 0; x < arguments.length; x++ )
			call_instance = call_instance.bind(call_instance.prototype, arguments[x])
		 return new call_instance()
	  }

	  var copy_setting = function(setting) {
		 // Copy the settings Object passed in to the prototype of the current instance. This effectively copies all of the necessary options to the current
		 // instance from the previous one.

		 // Object.keys will not include properties in the prototype so that only settings which are set as instance data are copied.
		 Object.keys(setting).forEach(function(val) {
			if ( val === "use_level" )
			  val = "_use_level"
			this[val] = setting[val]
		 }, this)
	  }

	   // void is used the same as the parenthisis enclosure method to make functions callable in the declaration. It returns the function declaration 
		// to void which returns it to the command line. Without void something else in the expression evaluation of the function is returned to the 
		// command line (which returns undefined).
	void function parse_args(args) {
		// This is called recursively on a arguments Object so that an arguments Objects inside of the arguments Object are also parsed. This is how
		// arguments as arguments are also accepted by the callee.

		 for ( var x = 0; x < args.length; x++ ) {
			if ( args[x] instanceof Print ) {
			  copy_setting.call(this, Object.keys(args[x].list()))
			} else if ( Object.prototype.toString.call(args[x]) === "[object Arguments]" ) {
			  parse_args.call(this, args[x])
			} else {
			  // This tells the set_option that it is already a fresh root copy of Print and to not make another one (it is used internally).
			  this._from_constructor = true
			  this.set_option(args[x])
			}
		 }
	  }.call(this, arguments)

	  this._old_platform = this.platform
	  this._last_command = null
	  this._output = ""
	  this._styleless_output = ""
	  this._cache = []
	  this._is_from_object = false
	  this.apply_arguments = []
	  this.formated = ""
	  this.plain = ""
	  //this.platform_index = [] 
	  this.plain_index = []
	  this.formated_index = []
	  // This may be included when another Print instance is passed into this constructor for a settings copy.
	}

	// These options are created one level deep (__proto__), in the Print() prototype chain. All of these options are user configurable
	// within the library but these properties (at this level), are only used as defaults sense there is no way to change them with the library api
	// (Print().__proto__ is the only way). If the prototype is set (e.g. Print.prototype.level = 3), ir the instance data, it will be used
	// instead of these values. A call to delete a property will also revert it back to the default value, e.g. Print.prototype.level and.or
	// Print().level will revert the level option back to the default value (from below).
	obj.parent = Print
	Print.prototype = obj
	//Print.prototype.parent = Print
	obj.style_map = style_map

	obj.remove_call = function() {
	  // This member removes all of the text added to the internal buffer created by calls the style map. The text is indexed by every call that is made
	  // to the style mapping memebre and thusly can be removed from the buffer. This mechanism works like the Array.splice memeber and also returns the
	  // removed call text. The console.log mechanism in gecko based browsers use printf like format with style styles so a separate Array is created
	  // to store them and passed to console.log via an apply.
		
		var uses_apply = this.style_map[this.platform].format.length >= 3
		if ( uses_apply )
			this.apply_arguments.splice.apply(this.apply_arguments, arguments)

	  var formated_index = this.formated_index.splice.apply(this.formated_index, arguments)[0] || 0
	  var plain_index = this.plain_index.splice.apply(this.plain_index, arguments)[0] || 0
	  // This is the text data which is removed
	  var removed = {formated: this.formated.substr(formated_index), plain: this.plain.substr(plain_index) }

	  // This is the internal buffer text which is now truncated.
	  this.formated = this.formated.substr(0, formated_index)
	  this.plain = this.plain.substr(0, plain_index)

	  return removed
	}

	obj.append_string = function(style_name, str) {
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

		if ( this.use_style ) {
			var theme = "", uses_apply = this.style_map[this.platform].format.length >= 3, platform = this.style_map[this.platform].use_theme || this.platform
			this.formated_index.push(this.formated.length)
			// The regex test will prevent styleization of values which do not contain a visable character.
			if ( this.style_map[platform][this.theme+"_level_"+this.level] ) {
				theme = this.theme+"_level_"+this.level
			} else {
				theme = Object.keys(this.style_map[platform].theme)[0]
			}
			if ( !theme )
				return this
			this.formated += this.style_map[this.platform].format(this.style_map[platform].theme[theme][style_name], plain, uses_apply && this.apply_arguments || null)
		}

		return this
	}

	return Print

})


