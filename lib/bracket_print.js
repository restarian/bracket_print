/* Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

// This will be striped out by the requirejs optimizer. It is mainly used so that this library source can be evaluated in primitive development.
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require", "./proto_object", "./style_map"], function(require, obj, style_map) {
	
	var Print = function() {
		// This accepts all of the parameters as the option member does. 

		// This will call the constructor with the same arguments as initially passed as a new instance if it was not done so to ensure a new instance is
		// always created when invoking the constructor.
		var call_instance
		if ( !(this instanceof (call_instance = Print) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		// is_chained will prevent the members from creating new instances. It is used in the constructor here so that a call loop will not occur and then
		// is set to false so that all subsequent calls act as constructors creating a new instance.
		this._is_chained = true
		this.option(arguments)
		this._is_chained = false 

		this._last_command = null
		this.apply_arguments = []
		this.formated = ""
		this.plain = ""
		this.plain_index = []
		this.formated_index = []
	}

	Print.prototype = obj
	// The parent is set to Print and not the obj so that instanceof checks to Print work (setting the constructor could work too).
	Print.prototype.parent = Print
	obj.style_map = style_map

	obj.__defineGetter__("current_platform", function() {
	// Retrieve the current platform from the platform option if it exists
		if ( typeof this.style_map[this.platform] !== "object" ) {
			if ( !this._internal_error ) 
	//			return new this.parent(this, {_internal_error: true, level: this.internal_level||this.level, log_title: "Bracket Print Error"}) && null
//					.log_null("The requested platform", this.platform, "is not included in the style mapping.")
	//		else
				return null
		}

		return this.style_map[this.platform]

	})

	obj.__defineGetter__("current_theme", function() {

	// This member is tasked with returning the proper theme to use or a null error message otherwise. The theme can change depending on if the 
	// import_theme_from value is found in the platform. A default_theme value may also used if the string set in the theme option is not found 
	// in the style platform. 

		var platform, theme 
		if ( !(platform = this.current_platform) )
			return null 

		if ( platform.import_theme_from ) {
			if ( ! platform.import_theme_from in this.style_map ) {
				if ( !this._internal_error ) 
					return new this.parent(this, {level: this.internal_level||this.level, log_title: "Bracket Print Error"})
						.log_null("The requested import theme", current_platform.import_theme_from, "is not included in the style mapping.")
				else
					return null
			}
			theme = this.style_map[platform.import_theme_from].theme	
		} else {

			theme = platform.theme
		}

		if ( theme && (this.theme+"_"+this.level) in theme )
			theme = theme[this.theme+"_"+this.level]
		else if ( "default_theme" in platform ) {
			if ( !platform.default_theme in theme )
				if ( !this._internal_error ) 
					return this._internal_error = new this.parent(this, {style: false, level: this.internal_level||this.level, log_title: "Bracket Print Error"})
						.log_null("The default theme", platform.default_theme, "is not included in the style mapping.")
				else
					return null
			else 
				theme = theme[platform.default_theme]
		} 
		else {
			if ( this._internal_error ) 
				return this._internal_error = new this.parent(this, {style: false, level: this.internal_level||this.level, log_title: "Bracket Print Error"})
					.log_null("The theme", this.theme+"_"+this.level, "is not included in the style mapping.")
			return null	
		}

		this._internal_error = true	
		return theme

	})

	obj.remove_call = function() {
	// This member removes all of the text added to the internal buffer created by calls the style map. The text is indexed by every call that is made
	// to the style mapping member and thusly can be removed from the buffer. This mechanism works like the Array.splice member and also returns the
	// removed call text. The console.log mechanism in based browsers uses a printf like format so a separate Array is created to store them and 
	// passed to console.log via an apply.
		
		if ( this.current_platform.format.length >= 3 )
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

		// append_string will return true unless it reaches a character_limit. This is the way which bracket print compounds strings together.

		if ( this.plain.length === this.character_limit )
			return false 
		else if ( ! arguments.length )
			return true

		// This is one of the few times which a parameter is string-based fool-proofed. It simply gets used to many times to just error whenever
		// a non-string parameter is passed in.
		var plain = typeof str == "string" && str || String(str)

		// TODO: Adding line breaks for max screen width control may be a nifty feature here.
		var truncated_msg = " <..output truncated>"
		// do not include the truncated message if the maximum string length is not at least three times its length.
		truncated_msg = this.character_limit > (truncated_msg.length*3) && truncated_msg || ""

		if ( this.plain.length + plain.length > this.character_limit - truncated_msg.length )
			plain = plain.substr(0, this.character_limit - this.plain.length - truncated_msg.length ) + truncated_msg

		// The style needs only to be processed if new plain text was added. Otherwise, only the truncated message is styled which would already have been
		// styled once. This is done to maximize efficiency after the character_limit is reached.
		if ( this.plain.length >= this.character_limit ) 
			return false

		this.plain_index.push(this.plain.length)
		this.plain += plain

		var platform = theme = {}

		// The string will also be run through the style map format function when the style option is set. The style_character_limit is used like the
		// plain character_limit above.
		if ( this.style ) {

			// In case a bad option value was set in the call chain.
			if ( !(theme = this.current_theme) || !(platform = this.current_platform) )
				return ""

			this.formated_index.push(this.formated.length)
			var style_value
			// Use the value from the style map type (example: quote, number), use the base value, or fail returning a true error message. This
			// returns truthy so that the serializer knows that it was not due to a character_limit max-out.
			if ( ! (style_value = (style_name in theme && theme[style_name] || theme.base))  ) 
				return new this.parent(this, {level: this.internal_level||this.level, log_title: "Bracket Print Error"})
					.log_true("There is not a style value set for", style_name, "in platform", this.platform)

			this.formated += platform.format(style_value, plain, platform.format.length >= 3 && this.apply_arguments || undefined)
		} else {

			// This can only happen when the style option was toggled within a call chain so the close_with value should
			// be applied to the internal string before the plain text is added. This way the plain text will not have any style and if
			// the style is toggled back on the open_with value will be used again.
			if ( this.formated.length ) 
				this.formated += (theme.close_with || platform.close_with || "") + plain + (theme.open_with || platform.open_with || "")
			else 
				this.formated += plain
		}

		return true 
	}

	return Print

})


