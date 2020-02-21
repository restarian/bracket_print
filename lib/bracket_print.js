/* Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com> Bracket Print resides under the LGPL version 3
Bracket Print is a cross-platform printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["./proto_object", "./style_map"], function(proto_object, style_map) {
	
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
		this._platform = null
		this._theme = null
		this.option(arguments)
		this._is_chained = false 
		this._last_command = "space"
		this._apply_arguments = []
		this._plain_index = []
		this._has_open = false
		this._formated_index = []
		this.formated = ""
		this.plain = ""
	}

	Print.prototype = proto_object
	// The parent is set to Print and not the proto_object so that instanceof checks to Print work (setting the constructor could work too).
	Print.prototype.parent = Print
	Print.prototype.style_map = style_map
	Print.prototype._error_option = {style: false, log_title: "Bracket Print Error", character_limit: 300}
	Print.prototype._error_platform = {denote_line: "\n", denote_tab: "\t", denote_space: " "}
	Print.prototype.setPlatform = function() {
		
		// Retrieve the current platform from the platform option if it exists
		if ( typeof this.style_map[this.platform] !== "object" || this.style_map[this.platform] === null ) {

			var cnt = 0
			// Get a non-existant object key.
			while ( this.style_map["_error_platform_"+ ++cnt] ) void 0;
			this.style_map["_error_platform_"+cnt] = this._error_platform

			new this.parent(this._error_option, {platform: "_error_platform_"+cnt, 
				level: parseInt(this.internal_level)===parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log_false("The requested platform", this.platform, "is not included in the style mapping or is not a valid Object literal.")
			delete this.style_map["_error_platform_"+cnt]
			return false
		}
		this._platform = this.style_map[this.platform]
		return true
	}
	Print.prototype.setTheme = function() {
	// This member is tasked with returning the proper theme to use or a null error message otherwise. The theme can change depending on if the 
	// import_theme_from value is found in the style_map or added to it at run-time. A default_theme value may also used if the string set in the 
	// theme option is not found in the style platform. 

		if ( !this._platform && !this.setPlatform() )
			return false 

		var platform_name = this.platform
		if ( this._platform.import_theme_from ) {
			if ( !(this._platform.import_theme_from in this.style_map) )
				return new this.parent(this._error_option, {level: parseInt(this.internal_level)===parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
					.log_false("The requested import theme", this._platform.import_theme_from, "is not included in the style mapping in platform", platform_name)
			else {
				this._theme = this.style_map[this._platform.import_theme_from].theme	
				platform_name = this._platform.import_theme_from 
			}
		}
		else
			this._theme = this._platform.theme

		if ( typeof this._theme !== "object" )
			return new this.parent(this._error_option, {level: parseInt(this.internal_level)===parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log_false("The theme", this.theme, "is not found in the platform", platform_name)
		if ( (this.theme+"_"+this.level) in this._theme ) 
			this._theme = this._theme[this.theme+"_"+this.level]
		else if ( "default_theme" in this._platform ) {

			if ( !(this._platform.default_theme in this._theme) )
				return new this.parent(this._error_option, {level: parseInt(this.internal_level)===parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
					.log_false("The default theme", this._platform.default_theme, "specified is not found in the", platform_name, "style mapping.")
			else
				this._theme = this._theme[this._platform.default_theme]
		}
		else
			return new this.parent(this._error_option, {level: parseInt(this.internal_level)===parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log_false("The theme", this._platform.default_theme, "specified is not found in the", platform_name, "style mapping.")

		if ( typeof this._theme !== "object" )
			return new this.parent(this._error_option, {level: parseInt(this.internal_level)===parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
				.log_false("The theme specified is not found in the", platform_name, "style mapping.")

		return this._theme
	}
	Print.prototype.remove_call = function() {
	// This member removes all of the text added to the internal buffer created by calls to the style map. The text is indexed by every call that is made
	// to the style mapping member and thusly can be removed from the buffer. This mechanism works like the Array.splice member and also returns the
	// removed call text. The console.log mechanism in based browsers uses a printf like format so a separate Array is created to store them and 
	// passed to console.log via an apply.

		if ( this._platform && this._platform.format && this._platform.format.length >= 3 )
			this._apply_arguments.splice.apply(this._apply_arguments, arguments)

		var formated_index = this._formated_index.splice.apply(this._formated_index, arguments)[0] || 0
		var plain_index = this._plain_index.splice.apply(this._plain_index, arguments)[0] || 0
		// This is the text data which is removed
		//var removed = {formated: this.formated.substr(formated_index), plain: this.plain.substr(plain_index) }

		// This is the internal buffer text which is now truncated.
		this.formated = this.formated.substr(0, formated_index)
		this.plain = this.plain.substr(0, plain_index)
	}
	Print.prototype.getStyleValue = function(qualifier) {
		
		var theme_name = this.theme+"_"+this.level
		return (("theme_override" in this._platform) && (theme_name in this._platform.theme_override) && this._platform.theme_override[theme_name][qualifier]) || this._theme[qualifier] || this._theme.base || false 
	},
	Print.prototype.append_string = function(style_name, str) {
	// The append_string member will return true unless it reaches a character_limit. This is the way which bracket print compounds strings together.

		if ( this.plain.length === this.character_limit )
			return false 
		else if ( !arguments.length )
			return true

		// This is one of the few times which a parameter is string-based fool-proofed. It simply gets used to many times to just error whenever
		// a non-string parameter is passed in.
		if  ( typeof str !== "string" )
			str = String(str)
		if ( !str )
			return true

		// TODO: Adding line breaks for max screen width control may be a nifty feature here.
		
		// Do not include the truncated message if the maximum string length is not at least three times its length.
		var truncated_msg = this.character_limit > (this.truncated_string.length*3) && this.truncated_string || ""

		if ( this.plain.length + str.length > this.character_limit - truncated_msg.length )
			str = str.substr(0, this.character_limit - this.plain.length - truncated_msg.length ) + truncated_msg

		// The style needs only to be processed if new plain text was added. Otherwise, only the truncated message is styled which would already have been
		// styled once. This is done to maximize efficiency after the character_limit is reached.
		if ( this.plain.length >= this.character_limit ) 
			return false

		this._plain_index.push(this.plain.length)
		this.plain += str 

		// The string will also be run through the style map format function when the style option is set. The style_character_limit is used like the
		// plain character_limit above.
		if ( this.style ) {

			this._formated_index.push(this.formated.length)
			// Use the value from the style map type (example: quote, number), use the base value, or fail returning a true error message. This
			// returns truthy so that the serializer knows that it was not due to a character_limit max-out.
			var style_value = this.getStyleValue(style_name)
			if ( !style_value )
				return new this.parent(this._error_option, {level: parseInt(this.internal_level)===parseInt(this.internal_level)?parseInt(this.internal_level):this.level})
					.s("There is not a style value set for", style_name, "with theme").a(this.theme, "_", this.level).s("in platform", this.platform).log_true()
			this.formated += this._platform.format(style_value, str, this._platform.format.length >= 3 && this._apply_arguments || undefined)
		}
		else 
			this.formated += str 

		return true 
	}
	return Print
})


