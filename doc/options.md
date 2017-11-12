# Brackit Print
### The Option Mechanism

----

### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/doc/README.md)
* [Callback Functionality](https://github.com/restarian/bracket_print/blob/master/doc/as_callback.md)
* [Console logging ](https://github.com/restarian/bracket_print/blob/master/doc/as_logger.md)
* [Constructing and Using Raw Strings ](https://github.com/restarian/bracket_print/blob/master/doc/as_string.md)
* [License information](https://github.com/restarian/bracket_print/blob/master/doc/license.md)
* [Screenshots and Media](https://github.com/restarian/bracket_print/blob/master/doc/screenshot.md)
* [Todo](https://github.com/restarian/bracket_print/blob/master/doc/todo.md)

----

..part of the [bracket suite](https://github.com/restarian/restarian/blob/master/bracket/readme.md)
![bracket](https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png)

The option mechinism uses [Brace Prototype](httpsL//npmjs.org/packages/brace_prototype) for functionality. See the docs therein for usage which will apply to bracket print instances as well.

Options can be passed to bracket print using the constructor, the *spawn*, *option*, or *empty* members. The option object passed in can be a literal Object, Brackit Print instance, arguments Object, or a String. The string parameter will be used as the *log_title* value. Any string passed in will take priority over any *log_title* value contained in the Object parameters. And multiple strings will cause the last one in the parameter list to take priority. Passing in multiple Object will override the previous values in Objects passed in.

Consider the example below where the String parameter takes priority above the *log_title* set in the Object and Objects override previous Object values passed in.

```javascript

var print = require("bracket_print")("Title One", {character_limit: 999})

// Create a compounding print instance using the space call.
var up = print.s()

up.log(up.character_limit) // <- logs: [Print is here - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)] 999 

up.empty("Not me", {character_limit: 300, log_title: "not this one"}, "This one")
	.log(up.character_limit) // <-- logs [This one - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)] 300 

// Dump the text storage.
up.empty()
up.option("Here I am", {character_limit: 300, log_title: "not this one"}, print)
	.log(up.character_limit) // <-- logs [Here I am - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)] 999

up.empty({log_title: "This title"})
	.log(up.character_limit) // <-- logs [This title - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)] 999

```

**Below is a list of the available configurable options. The options mechinism is supported by [Brace Prototype](https://npmjs.org/package/brace_prototype). Further reading on option usage is directed there.**

**style** - *[boolean]*, default: true

* Controls string formating pertaining to the set platform. The formatted string will be equal to the plain string if this is false. It can be set anywhere in the call chain to toggle the styling process (which will alter run-time complexity).

**title** - *[boolean]*, default: true

* Disables the prepending of a title which is used with the *log* member. The *log_title* and *title_stamp* option values will be ignored. The title will not be included in the *toString* or *toStyleString* members.

**log_title** - *[string]*, default: ""

* The value of this option will be used as the title string which is inserted before the *title_stamp*.

**title_stamp** - *[function]*, default: function() { return new Date() }

* The return value of this function will be inserted after the *log_title* in the title. 

**theme** - *[string]*, default: "dark"

* Uses the theme which is described in the style map

**compression** - *[number, 1,..4]*, default: 2

* The compression level of the Object serializations. Lower numbers create more spacious formatting. Level four removes all white space and new lines from the Object. 

**indentation_string** - *[string]*, default: "    "

* The string to use as one indentation. A non-white-space value will be colorized by the style map indent value. The *denote_space*, *denote_tab*, and *denote_line* values in the platform style map will be applied to this before it is used.

**platform** - *[string]*, default: (typeof require == "function" && require.isBrowser === false || typeof module === "object" && typeof module.exports === "object" ) && "terminal" || "browser",

* The platform will control which style to use from the map. It is auto-detected as the default value.

**depth_limit** - *[number]*, default: 800

* This will prevent Object serialization to traverse to a deeper level within Objects which avoids call stack max-out conditions.

**character_limit** - *[number]*, default: Math.pow(2,25)

* The string storage and serializations will be cut short and truncated to this character limit. 

**style_character_limit** - *[number]*, default: Math.pow(2,25)

* The string storage and serializations will be cut short and truncated to this character limit which also includes the add styling syntax. This limit can not exceed the *character_limit*. 

**truncate_function** - *[boolean]*, default: false

* Do not print function body text. Instead print just the function declaration and ... in-between the opening and closing brackets.

**shift_function_body** - *[boolean]*, default: true

* Replaces the natural indent of the function body string with an indent which matches the current object parsing indent.

**enumerate_all** - *[boolean]*, default: false

* Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the enumerate_all option needs to be set to truthy.

**value_buffer** - *[boolean]*, default: true

* Use toString when serializing instances of a nodejs Buffer. The buffer members will be printed if this is set falsey.

**denote_quoting** - *[string]*, default: "

* This will be used as the quote around strings in the serializer.

**quote_qualifier** - *[boolean]*, default: false

* To put quoting around qualifiers in Objects. The *denote_quoting* string will be used in this as well.

**log_level** - *[number]*, default: 1

* This option accepts strings, numbers and Arrays and will convert the value set to it to a string representation of ranges. Arrays should be in pairs denoting ranges. Two Array values of the same value need to be set to denote a single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of Array pairs for more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are separated with commas. E.g. log_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored and strings are parsed as numbers in any case (Array or String). The value of log_level will be set to *[-Infinity, Infinity]* (which will match all levels),  if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.

**level** - *[number]*, default: 1 

* The level of the print instance which pertains to the current *log_level*. Continued text processing will not occur if the level is set to a value which is not in one of the *log_level* ranges.

**internal_level** - *[number]*, default: false

* This is used to set the level of any messages which are logged internally in bracket print. Setting the value falsey will use the value level as the current level.


