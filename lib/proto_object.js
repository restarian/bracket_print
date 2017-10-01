
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require", "./serializer", "brace_prototype"], function(require, serializer) {

	var proto = require("brace_prototype")	

	var p = proto({

	  use_style: true,
	  use_title_stamp: function() { return new Date() },
	  log_title: "",
	  theme: "light",
	  // The compression level of the Object serializations. Higher numbers mean more sparce formating. Level one removes all white space and new lines from the Object.
	  compress_level: 2,
	  use_title: true,
	  indentation_string: "   ",
	  // TODO: Add controls so the JSON.parse will evaluate correctly
	  //parsing false,
	  //platform: typeof module === "object" && typeof process === "object" && typeof process.env === "object" && "terminal" || "browser",
	  platform: "terminal",
	  // This will prevent Object serialization to traverse to a deeper level with Objects (it avoids call stack max-out conditions).
	  depth_limit: 130,
	  // The logging storage and serializations will be cut short and trucncated to this character_limit.
	  character_limit: Math.pow(2,28),
	  truncate_function: false,
	  // Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the
	  // enumerate_all flag needs to be set.
	  enumerate_all: false,
	  denote_quoting: "\"",
	  // Note: use_level is contained one level up in the chain and should stay that way.
	  // This is the level which needs to be in the range set to use_level. All serializations, logging and storage will be ignored (disabled), if
	  // the level is not a match to the use_level.
	  level: 1,
	  // TODO: this should have an option to keep the same as the level.
	  // This is used to set the level of any messages which are logged internally in the p library.
	  internal_level: 2,
	})

	return p.extend({
		_serializer: serializer,
		get use_level() {
		  // Always used from this prototype level. The next_level (__proto__), also uses the same _use_level property. This is to the setter functionality
		  // while still providing multi-layered configurations.

		  return this._use_level
		},
		set use_level(value) {
		  // This setter accepts strings, numbers and Arrays. Arrays should be in pairs denoting ranges. Two Array values of the same value need to be set
		  // to denote a single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of Array pairs for
		  // more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are separated
		  // with commas. E.g. use_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored and strings
		  // are parsed as numbers in any case (Array or String). The value of use_level will be set to [-Infinity, Infinity] (which will match all levels),
		  // if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.

		  if ( value === "all" || value === "" )
			 return this._use_level = [-Infinity, Infinity]

		  if ( Object.prototype.toString.call(value) === "[object Array]" ) {
			 // Arrays can only be passed in as pairs of ranges (which is what non-Array values set to use_level are converted to.

			 if ( value.length % 2 )
				value.pop()
		  } else {
			 // All proccessing is utilized with Arrays in this function.
			 value = [value]
		  }

		  value = value.join("-")
		  this._use_level = parsed = []

		  // Split the commas and dashes into a uniform parsable Array.
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
				  return new this.parent({level: this.internal_level}).log("The value set to use_level can not be parsed as an integer:", range)

				// If the string contained a negitve number (the range dash is already compensated for).
				if ( first_is_negative )
				  range[x] *= -1
				if ( second_is_negative )
				  range[x+1] *= -1

			 }
			 parsed = parsed.concat(range)
		  })
		  this._use_level = parsed
		},

		// Dont delete me! This is expected to always exist internally.
		_use_level: [-Infinity, Infinity], // The default use_level option will initially be altered by this getter until the parent level prototype chain
		toColorString: function() {
		  // These two members return strings so no chaining mechanism is uitlized (like a getter returning a function which returns the instance). They
		  // do accept parameters to serialize just like all other printing commands. Note: this method is very fast (especially without arguments), as
		  // it only returns an Object property.

		  var uses_apply = this.style_map[this.platform].format.length >= 3
		  return this._print_command(this._last_command || "space").apply(this, arguments).formated + (uses_apply &&
				this.apply_arguments.length && this.apply_arguments.join(" ") || "")
		},
		toString: function() {
		  // These two members return strings so no chaining mechanism is uitlized (like a getter returning a function which returns the instance). They
		  // do accept parameters to serialize just like all other printing commands. Note: this method is very fast (especially without arguments), as
		  // it only returns an Object property.

		  return this._print_command(this._last_command || "space").apply(this, arguments).plain
		},
		set_option: function() {
		  // The other way of setting the options which resturns this to maintain call chains. Objects, p() instances and Strings can be passed into
		  // the set_option method. Any Strings will be used to set the log_title options. Objects passed in after other Objects will overide the previous
		  // Object data set so that the last Object in the parameter list is has the highest priority.

		  var print = ((this._is_chained || this._from_constructor) && this) || new this.parent(this)
		  // The is_chained property tells any printing commands to create a new instance or use the existing.
		  if ( !this._from_constructor )
			 print._is_chained = true
		  for ( var i = 0; i < arguments.length; i++ ) {

			 // Log titles can be passed in as strings (this is the only allowable non-Object parameter.
			 if ( typeof arguments[i] === "string" )
				arguments[i] = {log_title: arguments[i]}
			 if ( arguments[i] instanceof this.parent ) {
				arguments[i] = arguments[i].list()
			}

			 var mutable = print.list()

			 for ( var n in arguments[i] ) {
				if ( n in mutable || n === "use_level" ) {
				  if ( this._from_constructor )
					 p[n] = arguments[i][n]
				  else
					 p[n] = arguments[i][n]
				} else {
				  new this.parent({use_level: "", level: this.internal_level})
					 .sp("Option", n, "is not a brackit print option. Use .list() to see all user configurable options:")
					 .line(mutable).log()
				}
			 }
		  }
		  this._from_constructor = false
		  return print
		},
		new_copy: function() {
			// This is how bracket print transfers options to other Print instances. It is best to make a single print instance and then and pass the copy 
			// into another Print copy. It is in this way that all of the p objects contain inherit settings and then can have the options changed 
			// individually if nessesary. The function parameters work the same way as the set_option member and p constructor.
			return new this.parent(this, arguments)
		},
		get clear() {
			// Remove all of the text storage from the current p instance.

			return (function() {
			  // Splices all text storage from the beginning of the bufferize instance.
			  this.remove_call(0)
			  return this
			}).bind(this)
		},
		//----------------------------------------------------------------------------
		get sp() {

		 return this._print_command("space")
		},
		get space() {

		 return this._print_command("space")
		},
		get tab() {

		 return this._print_command("tab")
		},
		get line() {

		 return this._print_command("line")
		},
		get add() {

		 return this._print_command("add")
		},
		// ---------------------------------------------------------------------------
		// Here are all of the print commands which ease string formation.
		_print_command: function(call_name) {

		 // This is used internally whenever a input member is called. The _chain is a pre-cursor for the _serialize memeber which converts Objects to text.
		 // this is passed into the p constructor so that the current settings will be saved.
		 var print = this._is_chained && this || new this.parent(this)
		 print._is_chained = true
		 print._last_command = call_name

		 return (function() {

			// No need to process if no arguments were passed in. As long as the _print_command returns a function which returns the instance.
			if ( !arguments.length )
			 return this
			for ( var x = 0; x < this.use_level.length; x += 2 )
			  if ( parseInt(this.level) >= this.use_level[x] && parseInt(this.level) <= this.use_level[x+1] ) {
				 return this._chain.apply(this, arguments)
			 }
			 return this

		 }).bind(print)
		},
		get _chain() {
		 // This is the main printing member.
		 return function() {
			// This happens when the platform option is changed after the constructing (first), print command is called.
			if ( this._old_platform.toLowerCase() !== this.platform.toLowerCase() ) {
			  this._old_platform = this.platform
			  // Every instance of this needs to have its own intance of the bufferize prototype so that text can be stored using the internal buffer.
			  //this.style_map[this.platform] = new this.parent[this.platform.toLowerCase()]
			}

			var indentation = this.indentation_string.replace(/\t/g, this.style_map[this.platform].denote_tab).replace(/\n/g, this.style_map[this.platform].denote_line).replace(/\ /g, this.style_map[this.platform].denote_space)

			this._cache = []
			for ( var i = 0; i < arguments.length; i++ ) {

			  if ( this.plain.length && typeof this.style_map[this.platform]["denote_"+this._last_command] !== "undefined" ) {
				 // Add the last separator relating to the previous printing command called
				 this.plain += this.style_map[this.platform]["denote_"+this._last_command]
				 this.formated += this.style_map[this.platform]["denote_"+this._last_command]
			  }

			  this._serializer(arguments[i], indentation)
			  //this.style_map[this.platform].formated += this.style_map[this.platform].closing_tag||""
			  // Empty the Object processing cache which is used to ensure Circular object references do not occur within printing.
			  this._cache = []
			}
			return this
		 }
		},
		get log() {

		 // this is passed into the this (p), contstuctor so that the current settings will be saved.
		 var print = this._is_chained && this || new this.parent(this)
		 print._is_chained = true
		 return (function() {
			var in_range = false
			for ( var x = 0; x < this.use_level.length; x += 2 )
			  if ( parseInt(this.level) >= this.use_level[x] && parseInt(this.level) <= this.use_level[x+1] ) {
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

			if ( this.formated ) {

			  // Append the logging title if there is one set and then turn the entire output string
			  // into an array to pass with the console.log.apply
			  var style = this.style_map[this.platform]
			  //color_copy = new this.parent[this.platform.toLowerCase()]
			  var theme = this.theme + "_level_" + this.level
			  var title = ""
			  if ( this.use_title && (this.log_title || this.use_title_stamp) )
				  title = "[" + (typeof this.use_title_stamp === "function" && this.use_title_stamp() || "") + (this.use_title_stamp && this.log_title&&" - "||"") + this.log_title + "] "

			  this.append_string("title", title)

			  var c_args = [(this.formated||this.plain)+this.formated]
			  // append any css arguments if the browser segment of our custom bufferize object was utilized
		  	  var uses_apply = this.style_map[this.platform].format.length >= 3
			  if ( uses_apply )
				 c_args = c_args.concat(this.apply_arguments).concat(this.apply_arguments)

			  console.log.apply(console, c_args)
			}
			return this
		 }).bind(print)
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
		get log_null() {
		 // These will return true/false regardless of the debuffing state as well.

		 return (function() {
			this.log.apply(this, arguments)
			return null
		 }).bind(this)
		},
		get log_empty() {
		 // These will return true/false regardless of the debuffing state as well.

		 return (function() {
			this.log.apply(this, arguments)
			return ""
		 }).bind(this)
		},

	})

})	
