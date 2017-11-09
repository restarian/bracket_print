/*Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["./serializer", "brace_prototype"], function(serializer, brace_prototype) {

	var brace_proto = brace_prototype({
		// All user configurable options go in here so that brace_prototype can manage them.

		style: true,
		title: true,
		// The return value of this option will be used as the title string. This can also be a string value.
		log_title: "",
		title_stamp: function() { return new Date() },
		theme: "dark",
		// The compression level of the Object serializations. Higher numbers create more spacious formatting. Level one removes all white space and 
		// new lines from the Object.
		compression: 2,
		indentation_string: "    ",
		platform: (typeof require == "function" && require.isBrowser === false || typeof module === "object" && typeof module.exports === "object" ) && "terminal" || "browser",
		// This will prevent Object serialization to traverse to a deeper level with Objects (it avoids call stack max-out conditions).
		depth_limit: 800,
		// The logging storage and serializations will be cut short and truncated to this character_limit. Note: passing parameters to toStyleString
		// and toString will not obey this option.
		character_limit: Math.pow(2,25),
		style_character_limit: Math.pow(2,28),
		truncate_function: false,
		// Replace the natural indent of the function body with an indent which matches the current object parsing indent.
		indent_function: true,
		// Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the
		// enumerate_all flag needs to be set.
		enumerate_all: false,
		// Use toString when serializing instances of a nodejs Buffer.
		value_buffer: true,
		denote_quoting: "\"",
		quote_qualifier: false,
		// Note: log_level is contained one level up in the chain and should stay that way.
		// This is the level which needs to be in the range set to log_level. All serializations, logging and storage will be ignored (disabled), if
		// the level is not a match to the log_level.
		level: 1,
		// This is used to set the level of any messages which are logged internally in bracket print. Setting this falsey will use the same value as level.
		internal_level: false,
		get log_level() {

		  return this._log_level
		},
		set log_level(value) {
		  // This setter accepts strings, numbers and Arrays. Arrays should be in pairs denoting ranges. Two Array values of the same value need to be set
		  // to denote a single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of Array pairs for
		  // more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are separated
		  // with commas. E.g. log_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored and strings
		  // are parsed as numbers in any case (Array or String). The value of log_level will be set to [-Infinity, Infinity] (which will match all levels),
		  // if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.

		  if ( value === "all" || value === "" )
			 return this._log_level = [-Infinity, Infinity]

		  if ( Object.prototype.toString.call(value) === "[object Array]" ) {
			 // Arrays can only be passed in as pairs of ranges (which is what non-Array values set to log_level are converted to.

			 if ( value.length % 2 )
				value.pop()
		  } 
		  else {
			 // All processing is utilized with Arrays in this function.
			 value = [value]
		  }

		  value = value.join("-")
		  this._log_level = parsed = []

		  // Split the commas and dashes into a uniform parse-able Array.
		  value.toString().replace(/\ +/g, "").replace(/\-\-([^\-]{1})/g, "-minus$1").replace(/^\-/, "minus").split(",").forEach(function(val) {

			 if ( !val )
				return

			 var range = val.split("-")
			 if ( range.length < 2 )
				range.push(range[0])

			 for ( var x = 0; x < range.length; x+=2 ) {

				var first_is_negative = /minus/.test(range[0]), second_is_negative = /minus/.test(range[1])
				if ( /Infinity/.test(range[x]) )
				  range[x] = Infinity
				else
				  range[x] = parseInt(range[x].replace(/minus/, ""))

				if ( /Infinity/.test(range[x]) )
				  range[x+1] = Infinity
				else
				  range[x+1] = parseInt(range[x+1].replace(/minus/, ""))

				if ( range[x] !== range[x] || range[x+1] !== range[x+1] )

					return new this.parent(this, {level: this.internal_level||this.level, log_title: "Bracket Print Error"})
								.log("The value set to log_level can not be parsed as an integer:", range)

				// If the string contained a negative number (the range dash is already compensated for).
				if ( first_is_negative )
				  range[x] *= -1
				if ( second_is_negative )
				  range[x+1] *= -1

			 }
			 parsed = parsed.concat(range)
		  })
		  this._log_level = parsed
		},

	})
	
	// The brace_prototype handler needs to know that this is also operated on but should not be an option.
	brace_proto.add_hidden_qualifier("_log_level")	
	return brace_proto.extend({
		_serializer: serializer,
		_log_level: [-Infinity, Infinity], 		
		toStyleString: function() {
		  // These two members return strings so no chaining mechanism is utilized (like a getter returning a function which returns the instance). They
		  // do accept parameters to serialize just like all other printing commands. Note: this method is very fast (especially without arguments), as
		  // it only returns an Object property.

			var formated = this.formated
			if ( arguments.length )
				formated = this._print_command(this._last_command || "space").apply(this, arguments).formated 
			
			var platform = this.style_map[this.platform]
			var style = platform.theme[this.theme+"_"+this.level]
			return (style && style.open_with || platform && platform.open_with || "") + formated + 
						(style && style.close_with || platform && platform.close_with || "")

		},
		toString: function() {
		  // These two members return strings so no chaining mechanism is utilized (like a getter returning a function which returns the instance). They
		  // do accept parameters to serialize just like all other printing commands. Note: this method is very fast (especially without arguments), as
		  // it only returns an Object property.

			var plain = this.plain
			if ( arguments.length )
				plain = this._print_command(this._last_command || "space").apply(this, arguments).plain

			return plain
		},
		option: function() {
		  // The other way of setting the options which returns this to maintain call chains. Objects, Print instances and Strings can be passed into
		  // the option method. Any Strings will be used to set the log_title options. Objects passed in after other Objects will override the previous
		  // Object data set so that the last Object in the parameter/arguments list has the highest priority.

		   // The is_chained property tells any printing commands to create a new instance or use the existing.
			var print = this._is_chained && this || new this.parent(this)

			var contained_string_title = false
			var parse_args = (function(args) {
				// This is called recursively on a arguments Object so that arguments Objects inside of standard Objects are also parsed. This is how
				// arguments as arguments are also accepted by the callee.
				var opt
				for ( var x = 0; x < args.length; x++ ) {
					// It is also acceptable to pass arguments inside of objects to the option member.
					if ( Object.prototype.toString.call(args[x]) === "[object Arguments]" ) {
						parse_args(args[x])
					}
					else if ( typeof args[x] === "object" || typeof args[x] === "string" ) {

						opt = args[x]

						if ( typeof opt === "string" ) {
							contained_string_title = true
							this.log_title = opt 
						} 
						else { 
							for ( var n in opt ) {
								if ( n in this.list() ) {
									if ( n !== "log_title" || !contained_string_title ) 
										this[n] = opt[n]
								}
								else if ( ! (opt instanceof this.parent) ) {
									return new this.parent(this, {level: this.internal_level||this.level, log_title: "Bracket Print Error"})
										.s("Option", n, "is not a brackit print option. Reference the brace prototype module for option configurations.")
										.line(Object.keys(this.list())).log()
								}
							}
						}
					}
					else {
						return new this.parent(this, {level: this.internal_level||this.level, log_title: "Bracket Print Error"})
							.log("The parameter passed in as an option", typeof args[x], args[x], "is not accepted. See docs for more information.")
						continue
					}

				}

			}).bind(print)
			parse_args(arguments)

			return print
		},
		spawn: function() {
			// This is how bracket print transfers options to other instances. It is best to make a single print instance and then and pass the copy 
			// into another Print copy. It is in this way that all of the p objects contain inherit settings and then can have the options changed 
			// individually if necessary. The function parameters work the same way as the option member and Print constructor.
			return new this.parent(this, arguments)
		},
		get empty() {
			// Remove all of the text storage from the current instance and also will accept option arguments.

			return (function() {
				// Splices all text storage from the beginning of the bufferize instance.
				this.remove_call(0)
				// Set any option data passed in as well.
				return this.option.apply(this, arguments)
			}).bind(this)
		},
		//----------------------------------------------------------------------------
		get s() {

			return this._print_command("space")
		},
		get space() {

			return this._print_command("space")
		},
		get tab() {

			return this._print_command("tab")
		},
		get t() {

			return this._print_command("tab")
		},
		get line() {

			return this._print_command("line")
		},
		get l() {

			return this._print_command("line")
		},
		get add() {

			return this._print_command("add")
		},
		get a() {

			return this._print_command("add")
		},
		// ---------------------------------------------------------------------------
		// Here are all of the print commands which ease string formation.
		_print_command: function(call_name) {

			 // This is used internally whenever a input member is called. The _chain is preliminary for the _serialize member which converts Objects to text.
			 // this is passed into the p constructor so that the current settings will be saved.
			 var print = this._is_chained && this || new this.parent(this)
			 print._is_chained = true
			 print._last_command = call_name

			 return (function() {

				// No need to process if no arguments were passed in. As long as the _print_command returns a function which returns the instance.
				if ( !arguments.length )
					 return this
				for ( var x = 0; x < this.log_level.length; x += 2 )
				  if ( parseInt(this.level) >= this.log_level[x] && parseInt(this.level) <= this.log_level[x+1] ) {
					 return this._chain.apply(this, arguments)
				 }
				 return this

			 }).bind(print)
		},
		get _chain() {

			 // This is the main printing member.
			 return function() {

				var indentation = this.indentation_string.replace(/\t/g, this.style_map[this.platform].denote_tab)
										.replace(/\n/g, this.style_map[this.platform].denote_line).replace(/\ /g, this.style_map[this.platform].denote_space)

				for ( var i = 0; i < arguments.length; i++ ) {

				  if ( this.plain.length && typeof this.style_map[this.platform]["denote_"+this._last_command] !== "undefined" ) {
					 // Add the last separator relating to the previous printing command called
					 this.plain += this.style_map[this.platform]["denote_"+this._last_command]
					 this.formated += this.style_map[this.platform]["denote_"+this._last_command]
				  }
					
				  if ( ! this._serializer(arguments[i], indentation) )
						break
				}
				return this
			 }
		},
		get log() {

			// this is passed into the parent (Print constructor) so that the current settings will be used.
			var print = this._is_chained && this || new this.parent(this)
			print._is_chained = true
			return (function() {

				var in_range = false
				for ( var x = 0; x < this.log_level.length; x += 2 )
					if ( this.level >= this.log_level[x] && this.level <= this.log_level[x+1] ) {
						in_range = true
						break
					}
				if ( !in_range )
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

				// Prepend the logging title if one is set.
				var theme = this.theme+"_"+this.level, title = "", formated_title, uses_apply, tmp_apply_args 
				if ( this.title && (this.log_title || this.title_stamp) )
					title = "[" + (this.log_title||"") + ( this.log_title && " - " || "" ) + 
								( this.title_stamp && ( typeof this.title_stamp === "function" && this.title_stamp() || String(this.title_stamp)) || "" ) + "] "

				if ( this.style) {
 					// Turn the entire output string into an array to pass with the console.log.apply

					uses_apply = this.style_map[this.platform].format.length >= 3, tmp_apply_args = []
					formated_title = title//this.style_map[this.platform].format("title", title, uses_apply && tmp_apply_args || undefined)
					console.log.apply(console, this.apply_arguments.concat(tmp_apply_args, [formated_title, this.toStyleString()]))
				} else {
					console.log(this.plain)
				}

				return this
			}).bind(print)
		},
		get log_false() {

			return (function() {
				this.log.apply(this, arguments)
				return false
			 }).bind(this)
		},
		get log_true() {

			return (function() {
				this.log.apply(this, arguments)
				return true
			 }).bind(this)
		},
		get log_undefined() {

			 return (function() {
				this.log.apply(this, arguments)
				return undefined
			}).bind(this)
		},
		get log_null() {

			return (function() {
				this.log.apply(this, arguments)
				return null
			}).bind(this)
		},
		get log_empty() {

			return (function() {
				this.log.apply(this, arguments)
				return ""
			 }).bind(this)
		},

	})

})	
