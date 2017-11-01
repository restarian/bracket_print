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

// This will be striped out by the requirejs optimizer. It is mainly used so that this library source can be evaluated in primitive development.
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require", "./proto_object", "./style_map"], function(require, obj, style_map) {
	
	var Print = function() {
	  // This accepts all of the parameters as option does. 
		// This will call the constructor with the same arguments as initially passed as a new instance if it was not done so to ensure a new instance is
		// always created when invoking the constructor.

		var call_instance
		if ( !(this instanceof (call_instance = Print) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		this._is_chained = true
		this.option.apply(this, arguments)
		this._is_chained = false 

		this._last_command = null
		this.apply_arguments = []
		this.formated = ""
		this.plain = ""
		this.plain_index = []
		this.formated_index = []
	}

	// These options are created one level deep (__proto__), in the Print() prototype chain. All of these options are user configurable
	// within the library but these properties (at this level), are only used as defaults sense there is no way to change them with the library api
	// (Print().__proto__ is the only way). If the prototype is set (e.g. Print.prototype.level = 3), ir the instance data, it will be used
	// instead of these values. A call to delete a property will also revert it back to the default value, e.g. Print.prototype.level and.or
	// Print().level will revert the level option back to the default value (from below).

	Print.prototype = obj
	// The parent is set to Print and not the obj so that instanceof checks to Print work (setting the constructor could work too).
	Print.prototype.parent = Print
	obj.style_map = style_map

	obj.remove_call = function() {
	  // This member removes all of the text added to the internal buffer created by calls the style map. The text is indexed by every call that is made
	  // to the style mapping member and thusly can be removed from the buffer. This mechanism works like the Array.splice member and also returns the
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
			return false 

		var plain = str && str.toString() || ""

		// TODO: Adding line breaks for max screen width control may be a nifty feature here.
		var truncated_msg = ".. Object truncated"
		// do not include the truncated message if the maximum string length is not at least three times its length.
		truncated_msg = this.character_limit > (truncated_msg.length*3) && truncated_msg || ""

		if ( this.plain.length + plain.length > this.character_limit - truncated_msg.length )
			plain = plain.substr(0, this.character_limit - this.plain.length - truncated_msg.length ) + truncated_msg

		// The style needs only to be processed if new plain text was added. Otherwise, only the truncated message is styled which would already have been
		// styled once. This is done to maximize efficiency after max_characters are reached.
		if ( this.plain.length + plain.length < this.character_limit ) {

			this.plain_index.push(this.plain.length)
			this.plain += plain

			if ( this.style ) {

				var theme = "", uses_apply = this.style_map[this.platform].format.length >= 3,
					platform = this.style_map[this.platform].import_theme || this.platform

				this.formated_index.push(this.formated.length)
				// The regex test will prevent stylization of values which do not contain a visible character.
				if ( this.style_map[platform].theme[this.theme+"_"+this.level] )
					theme = this.theme+"_"+this.level
				else if ( this.style_map[this.platform].default_theme && this.style_map[platform].theme[this.style_map[this.platform].default_theme] )
					theme = this.style_map[platform].default_theme
				else
					theme = Object.keys(this.style_map[platform].theme)[0]

				if ( !theme )
					return new this.parent({theme: this.theme+"_internal", level: this.internal_level, title: "Bracket Print Error"})
						.log_true("The requested theme", theme, "is not included.") && this

				// Use the value from the style map type (example: quote, number), or use the first available one.
				var style_value = style_name in this.style_map[platform].theme[theme] && this.style_map[platform].theme[theme][style_name] || 
											this.style_map[platform].theme[theme].base

				if ( !style_value ) 
					// This only happens when the style theme Object contains no properties.
					return new this.parent({theme: this.theme+"_internal", level: this.internal_level, title: "Bracket Print Error"})
						.sp("There is not a style value set for").add(platform, ".", theme, ".", style_value).sp("or a")
						.add(platform, ".", theme, ".base value.").log_true() && this

				this.formated += this.style_map[this.platform].format(style_value, plain, uses_apply && this.apply_arguments || undefined)
			} else {
				this.formated += plain
			}
		} else {
			return false
		}


		return true 
	}

	return Print

})


