/* Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com> Bracket Print resides under the LGPL version 3
Bracket Print is a cross-platform printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["./serializer", "brace_option"], function(serializer, brace_option) {

	var option = brace_option({
		// All user configurable options go in here so that prototype can manage them.

		style: true,
		title: true,
		// The return value of this option will be used as the title string. This can also be a string value.
		log_title: "",
		title_stamp: function() { return new Date() },
		auto_hyphen_title: true,
		theme: "light",
		// The compression level of the Object serializations. Higher numbers create more spacious formatting. Level one removes all white space and 
		// new lines from the Object.
		compression: 2,
		get log_output() {

		  return this._log_output
		},
		// The output must be a function and will accept an array as the first and only argument. This will be utilized as the output of a log command.
		set log_output(value) {

			if ( typeof value !== "function" ) {
				if ( !this._is_error )
					new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error", character_limit: 300, 
					level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
					.log_undefined("The value set to log_option is not of the type function. Value attempted to be set was:", value)
			}
			else
				return this._log_output = value
		},
		platform: (typeof require == "function" && require.isBrowser === false || typeof module === "object" && typeof module.exports === "object" ) && "terminal" || "browser",
		indentation_string: "   ",
		// This will prevent Object serialization to traverse to a deeper level with Objects (it avoids call stack max-out conditions).
		depth_limit: 800,
		// The logging storage and serializations will be cut short and truncated to this character_limit. Note: passing parameters to toStyleString
		// and toString will not obey this option.
		character_limit: Math.pow(2,25),
		style_character_limit: Math.pow(2,28),
		truncated_string: " <..output truncated>",
		truncate_function: false,
		// Replace the natural indent of the function body with an indent which matches the current object parsing indent (warning: this breaks template tags).
		shift_function_body: true,
		// Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the
		// enumerate_all flag needs to be set.
		enumerate_all: false,
		// Ensure that a backslash is printed when a quote is contained within another quote which is the same.
		ensure_escape: true,
		// Use toString when serializing instances of a nodejs Buffer.
		value_buffer: true,
		denote_quoting: "\"",
		quote_qualifier: false,
		// Note: log_level is contained one level up in the chain and should stay that way.
		// This is the level which needs to be in the range set to log_level. All serializations, logging and storage will be ignored (disabled), if
		// the level is not a match to the log_level.
		level: 1,
		// This is used to set the level of any messages which are logged internally in bracket print. Setting this falsey (but non-zero) will use the same value as level.
		internal_level: false,
		get log_level() {

		  return this._log_level
		},
		set log_level(value) {
		// This property setter accepts strings, numbers and Arrays. Arrays should be in pairs denoting ranges. Two Array values of the same value need to 
		// be set to denote a level single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of
		// Array pairs for more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are
		// separated with commas. E.g. log_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored 
		// and strings are parsed as numbers in any case (Array or String). The value of log_level will be set to [-Infinity, Infinity] (which will match 
		// all levels), if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.

			if ( value === "all" || value === "" )
				return this._log_level = [-Infinity, Infinity]

			if ( Object.prototype.toString.call(value) === "[object Array]" ) {
			// Arrays can only be passed in as pairs of ranges (which is what non-Array values set to log_level are converted to.

				if ( value.length % 2 )
					value.pop()
			}
			else
				// All processing is utilized with Arrays in this function.
				value = [value]

			var parsed = []

			// Split the commas and dashes into a uniform parse-able Array.
			value.join("-").replace(/\ +/g, "").replace(/\-\-([^\-]{1})/g, "-minus$1").replace(/^\-/, "minus").split(",").forEach(function(val) {

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

					if ( range[x] !== range[x] || range[x+1] !== range[x+1] ) {

						if ( !this._is_error )
							new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error", character_limit: 300,
							level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
							.log("The value set to log_level can not be parsed as an integer:", range)
						return
					}

					// If the string contained a negative number (the range dash is already compensated for).
					if ( first_is_negative )
					  range[x] *= -1
					if ( second_is_negative )
					  range[x+1] *= -1
				}
			parsed = parsed.concat(range)
			}, this)
			this._log_level = parsed
		},
	})
	
	// The prototype handler needs to know that this is also operated on but should not be an option.
	option.add_qualifier("log_level", "_log_level")	
	option.add_qualifier("log_output", "_log_output")	

	return option.extend({
		_serializer: serializer,
		_log_level: [-Infinity, Infinity], 		
		_log_output: function(str_arr) { console.log.apply(console, str_arr) },
		toStyleString: function() {
		// This member returns a string so no chaining mechanism is utilized (unlike the other API members which use a getter to return a function 
		// which returns the instance). They do accept parameters to serialize just like all other printing commands. Note: this method is very 
		// fast (especially without arguments), as it only returns an instance property.

			// Make sure to create another copy of the string and not operate on the one in the instance.
			var formated = this.formated, call = this
			if ( arguments.length ) {
				call = this._print_command(call._last_command).apply(call, arguments)
				formated = call.formated 
			}
			else {
				call.setPlatform()
				call.setTheme()
			}
			
			var wrap_start = "", wrap_end = ""

			if ( call._has_open && call.setTheme() ) {

				var wrap_end = ""
				var wrap = ("theme_override" in call._platform) && call._platform.theme_override[call.theme+"_"+call.level]

				if ( wrap === null || typeof wrap !== "object" )
					wrap_end = call._theme.wrap_end||""
				else if ( "wrap_end" in wrap )
					wrap_end = wrap.wrap_end || ""

				wrap_end = wrap_end || call._platform.wrap_end || ""
			}
			return formated + wrap_end
		},
		toString: function() {
		// This member returns a string so no chaining mechanism is utilized (unlike the other API members which use a getter to return a function 
		// which returns the instance). They do accept parameters to serialize just like all other printing commands. Note: this method is very 
		// fast (especially without arguments), as it only returns an instance property.

			var plain = this.plain
			if ( arguments.length )
				plain = this._print_command(this._last_command).apply(this, arguments).plain

			return plain
		},
		option: function() {
		// This member is tasked with setting option data to the instance. It returns the instance to maintain call chains. Objects, Print instances, 
		// and Strings can be passed into it. Any Strings passed in at any argument location will be used to set the log_title option. Objects passed 
		// in after other Objects will override the previous Object data so that the last Object in the parameter/arguments list has the highest priority.

		   // The is_chained property tells any printing commands to create a new instance or use the existing.
			var print = this._is_chained && this || new this.parent(this)

			var contained_string_title = false
			var parse_args = (function(args) {
				// This is called recursively on a arguments Object so that arguments Objects inside of standard Objects are also parsed. This is how
				// arguments as arguments are also accepted by the callee.

				var opt
				for ( var x = 0; x < args.length; x++ ) {
					
					// It is also acceptable to pass arguments inside of objects to the option member.
					if ( Object.prototype.toString.call(args[x]) === "[object Arguments]" )
						parse_args(args[x])
					else if ( typeof args[x] === "object" || typeof args[x] === "string" ) {

						opt = args[x]
						if ( typeof opt === "string" ) {

							contained_string_title = true
							this.log_title = opt 
						}
						else {

							if ( "_is_error" in opt ) {
								this["_is_error"] = opt["_is_error"]
								delete opt["_is_error"]
							}
							for ( var n in opt ) {
								// list returns all of the properties defined into the prototype as option-like data via Brace_option

								if ( n in this.list() ) {
									// The contained_string_title is used to make sure that the log_title is set by any strings passed in only. 
									if ( n !== "log_title" || !contained_string_title )
										this[n] = opt[n]
								}
								else if ( !this._is_error && !(opt instanceof this.parent) ) {

									new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error", character_limit: 300,
										level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
										.s("Option", n, "is not a Bracket Print option. Reference the Brace Option module for option configurations.")
										.line(Object.keys(this.list())).log()
								}
							}
						}
					}
					else if ( !this._is_error ) {

						new this.parent({_is_error: true}, this, {log_title: "Bracket Print Error", character_limit: 300,
						level: parseInt(this.internal_level) === parseInt(this.internal_level) ? parseInt(this.internal_level) : this.level})
						.log("The parameter passed in to option", typeof args[x], args[x], "is not accepted. See docs for more information.")
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
		// Removes all of the text storage from the current instance and also will accept option arguments.

			return (function() {
				// Splices all text storage from the beginning of the bufferize instance.
				this.remove_call(0)
				// Set any option data passed in as well.
				return this.option.apply(this, arguments)
			}).bind(this)
		},
		//----------------------------------------------------------------------------
		get s() { return this._print_command("space") }, 
		get space() { return this._print_command("space") },
		get tab() { return this._print_command("tab") },
		get t() { return this._print_command("tab") },
		get line() { return this._print_command("line") },
		get l() { return this._print_command("line") },
		get add() { return this._print_command("add") },
		get a() { return this._print_command("add") },
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
				if ( !this.setPlatform() )
					return this

				if ( this.style ) {
					
					if ( !this._has_open && this.setTheme() ) {

						var wrap_start = ""
						if ( this._theme ) {

							var wrap = ("theme_override" in this._platform) && this._platform.theme_override[this.theme+"_"+this.level]
							if ( wrap === null || typeof wrap !== "object" )
								wrap_start = this._theme.wrap_start||""
							else if ( "wrap_start" in wrap )
								wrap_start = wrap.wrap_start||""
							wrap_start = wrap_start || this._platform.wrap_start || ""
							this.formated += wrap_start
						}
						this._has_open = true
					}
				}
				else {

					if ( this._has_open && this.setTheme() ) {

						var wrap_end = ""
						var wrap = ("theme_override" in this._platform) && this._platform.theme_override[this.theme+"_"+this.level]

						if ( wrap === null || typeof wrap !== "object" )
							wrap_end = this._theme.wrap_end||""
						else if ( "wrap_end" in wrap )
							wrap_end = wrap.wrap_end||""

						wrap_end = wrap_end || this._platform.wrap_end || ""
						this.formated += wrap_end
					}
					this._has_open = false
				}

				if ( !arguments.length )
					return this

				for ( var x = 0; x < this.log_level.length; x += 2 )
					if ( parseInt(this.level) >= this.log_level[x] && parseInt(this.level) <= this.log_level[x+1] )
						return this._chain.apply(this, arguments)

				return this
			}).bind(print)
		},
		get _chain() {

			return function() {

				var indentation = this.indentation_string		
				if ( this._platform.denote_tab !== "\t" )
					indentation = indentation.replace(/\t/g, this._platform.denote_tab)
				if ( !/^\n$|^\r\n$|^\r$/.test(this._platform.denote_line) )
					indentation = indentation.replace(/\r\n|\n|\r/g, this._platform.denote_line)
				if ( this._platform.denote_space !== " " )
					indentation = indentation.replace(/ /g, this._platform.denote_space)

				for ( var i = 0; i < arguments.length; i++ ) {

					if ( this.plain.length && typeof this._platform["denote_"+this._last_command] !== "undefined" ) {
						// Add the last separator relating to the previous printing command called
						this.plain += this._platform["denote_"+this._last_command]
						this.formated += this._platform["denote_"+this._last_command]
					}
					if ( !this._serializer(arguments[i], indentation) )
						break
				}
				return this
			}
		},
		_title: function() {
			
			var title = ""
			if ( this.title ) {
				var title_stamp = typeof this.title_stamp === "function" && this.title_stamp() || typeof this.title_stamp === "string" && this.title_stamp || ""
				// Only put the hyphen between the title and title_stamp if both are truthy.
				title = "[" + (this.log_title||"") + ( this.auto_hyphen_title && this.log_title && title_stamp && " - " || "" ) + title_stamp + "] "
			}
			return title
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

				if ( arguments.length > 0 )
					this[this._last_command].apply(this, arguments)
				else {
					this.setPlatform()
					this.setTheme()
				}

				if ( this.style ) {

					var formated_title = "", tmp_apply_args = []
 					// Turn the entire output string into an array to pass with the log_output function.
					if ( this.title ) 
						// Use the value from the style map type (example: quote, number), use the base value, or fail returning a true error message. This
						// returns truthy so that the serializer knows that it was not due to a character_limit max-out.
						formated_title = this._platform.format(this._theme["title"] || this._theme.base || "", this._title(), this._platform.format.length >= 3 && tmp_apply_args || undefined)

					this.log_output(([formated_title + this.toStyleString()]).concat(tmp_apply_args.concat(this._apply_arguments)))
				}
				else
					this.log_output([this._title() + this.plain])

				return this
			}).bind(print)
		},
		get log_false() { return (function() { this.log.apply(this, arguments); return false }).bind(this) },
		get log_true() { return (function() { this.log.apply(this, arguments); return true }).bind(this) },
		get log_undefined() { return (function() { this.log.apply(this, arguments); return undefined }).bind(this) },
		get log_null() { return (function() { this.log.apply(this, arguments); return null }).bind(this) },
		get log_nan() { return (function() { this.log.apply(this, arguments); return NaN }).bind(this) },
		get log_empty() { return (function() { this.log.apply(this, arguments); return "" }).bind(this) },
		get log_N9() { return (function() { this.log.apply(this, arguments); return -9 }).bind(this) },
		get log_N8() { return (function() { this.log.apply(this, arguments); return -8 }).bind(this) },
		get log_N7() { return (function() { this.log.apply(this, arguments); return -7 }).bind(this) },
		get log_N6() { return (function() { this.log.apply(this, arguments); return -6 }).bind(this) },
		get log_N5() { return (function() { this.log.apply(this, arguments); return -5 }).bind(this) },
		get log_N4() { return (function() { this.log.apply(this, arguments); return -4 }).bind(this) },
		get log_N3() { return (function() { this.log.apply(this, arguments); return -3 }).bind(this) },
		get log_N2() { return (function() { this.log.apply(this, arguments); return -2 }).bind(this) },
		get log_N1() { return (function() { this.log.apply(this, arguments); return -1 }).bind(this) },
		get log_0() { return (function() { this.log.apply(this, arguments); return 0 }).bind(this) },
		get log_N0() { return (function() { this.log.apply(this, arguments); return 0 }).bind(this) },
		get log_1() { return (function() { this.log.apply(this, arguments); return 1 }).bind(this) },
		get log_2() { return (function() { this.log.apply(this, arguments); return 2 }).bind(this) },
		get log_3() { return (function() { this.log.apply(this, arguments); return 3 }).bind(this) },
		get log_4() { return (function() { this.log.apply(this, arguments); return 4 }).bind(this) },
		get log_5() { return (function() { this.log.apply(this, arguments); return 5 }).bind(this) },
		get log_6() { return (function() { this.log.apply(this, arguments); return 6 }).bind(this) },
		get log_7() { return (function() { this.log.apply(this, arguments); return 7 }).bind(this) },
		get log_8() { return (function() { this.log.apply(this, arguments); return 8 }).bind(this) },
		get log_9() { return (function() { this.log.apply(this, arguments); return 9 }).bind(this) },
	})
})	
