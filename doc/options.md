# Brackit Print
### The Option Mechanism

----

### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/doc/README.md)
* [Callback Functionality](https://github.com/restarian/bracket_print/blob/master/doc/as_callback.md)
* [Console logging ](https://github.com/restarian/bracket_print/blob/master/doc/as_logger.md)
* [Constructing and Using Raw Strings ](https://github.com/restarian/bracket_print/blob/master/doc/as_string.md)
* [License information](https://github.com/restarian/bracket_print/blob/master/doc/license.md)
* [Screenshots of output ](https://github.com/restarian/bracket_print/blob/master/doc/screenshot.md)
* [Constructing Raw Strings ](https://github.com/restarian/bracket_print/blob/master/doc/titles.md)
* [Todo](https://github.com/restarian/bracket_print/blob/master/doc/todo.md)

----

..part of the [bracket suite](https://github.com/restarian/restarian/blob/master/bracket/readme.md)
![bracket](https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png)

The option mechinism uses [Brace Prototype](httpsL//npmjs.org/packages/brace_prototype) for functionality. See the docs therein for usage which will apply to bracket print instances as well.


Options can be passed to bracket print using the constructor, the *clone* member, the *option* member, or the *empty* member. The option object passed in can be an Object, arguments Object, or String. The string will be used as the *log_title*. Any string passed in will take priority over any *log_title* value contained in the Object parameters.
Consider the example below where the String parameter takes priority above the *log_title* set in the Object.

```javascript
var up = bracket_print
up.option({log_title: "not this one"}, "The title")

```


```javascript
var up = bracket_print
up.

```

		style: true,
		title: true,
		// The return value of this option will be used as the title string. This can also be a string value.
		log_title: "",
		title_stamp: function() { return new Date() },
		theme: "light",
		// The compression level of the Object serializations. Higher numbers create more spacious formatting. Level one removes all white space and 
		// new lines from the Object.
		compress_level: 2,
		indentation_string: "   ",
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
		quote_qualifier: true,
		// Note: log_level is contained one level up in the chain and should stay that way.
		// This is the level which needs to be in the range set to log_level. All serializations, logging and storage will be ignored (disabled), if
		// the level is not a match to the log_level.
		level: 1,
		// TODO: this should have an option to keep the same as the level.
		// This is used to set the level of any messages which are logged internally in bracket print.
		internal_level: 2,
