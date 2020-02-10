## The Option Mechanism

---
### Bracket Print help pages
* [Contributor code of conduct](https://github.com/restarian/bracket_print/blob/master/docs/contributor_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/bracket_print/blob/master/docs/guidelines_for_contributing.md)
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/synopsis.md)
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * **Controlling the behaviour via option data**
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)

---

The option mechanism uses [Brace Option](https://github.com/restarian/brace_option) for functionality. See the docs therein for usage which will apply to Bracket Print instances as well.

### Options mechanism
Options can be passed to Bracket Print in many ways. All of the members which accept options use either an Object (or string for the log_title), to set the options. Multiple arguments can be passed in as well for convenience and the last argument values take priority. The constructor itself can be used the set option data, or the *spawn*, *option*, or *empty* members. The options Object passed in can be a literal Object, Bracket Print instance, arguments Object, or a String. If a string parameter is passed in it will be used as the *log_title* value. Any string passed in will take priority over any *log_title* value contained in the Object parameters and passing multiple strings will cause the last one in the parameter list to take priority. For example, in the following command call: .spawn({compression: 5}, {compression: 1}) the compression option value of the resulting instance will be set to 1.

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

**Below is a list of the available configurable options. The options mechinism is supported by [Brace Option](https://npmjs.org/package/brace_option). Further reading on option usage is advised thereof.**

**style** - [*Boolean*], default: **true**

Controls string formatting pertaining to the platform. The formatted string (*toColorString*), will be equal to the plain string (*toString*), if this option is falsey. It can be set anywhere in the call chain to toggle the styling process (which will alter run-time complexity and performance).

**title** - [*Boolean*], default: **true**

Disables the prepending of a title which is used with the *log* member. The *log_title* and *title_stamp* option values will be ignored. The title will not be included in the *toString* or *toStyleString* members.

**log_title** - [*String*], default: **""**

The value of this option will be used as the title string which is inserted before the *title_stamp*.

**title_stamp** - [*Function*], default: **function() { return new Date() }**

The return value of this function call will be inserted after the *log_title* value in the title when using *log* commands.

**auto_hyphen_title** - [*Boolean*], default: **true**

A space and a hyphen (" - "), is inserted between the *log_title* and *title_stamp* text output if both of those option values and this option are truthy.

**theme** - [*String*], default: **"dark"**

The text styling will use this theme which is described in the style map.

**compression** - [*Number, Range, 1,..5*], default: **2**

The compression level of the Object serializations. Lower numbers create more spacious formatting. Level four removes all white space and new lines from the Object. 

**log_output** - [*function*], default: **Function(str_arr) { console.log.apply(console, str_arr) }**
This option must be a callable function and will be passed an Array as the first and only argument when a *log* command is called. This mechanism does not affect the toString or any other concatenation calls.

**indentation_string** - [*String*], default: **"    "**

The string to use as one indentation. A non-white-space value will be colorized by the style map indent value. The *denote_space*, *denote_tab*, and *denote_line* values in the platform style map will be applied to this before it is used.

**platform** - [*string*], default: **(typeof require == "function" && require.isBrowser === false || typeof module === "object" && typeof module.exports === "object" ) && "terminal" || "browser"**,

The platform will control which platform styling to use from the map. It is auto-detected as the default value.

**depth_limit** - [*Number*], default: **800**

This will prevent Object serialization to traverse to a deeper level within Objects which avoids call stack max-out conditions.

**character_limit** - [*Number*], default: **Math.pow(2,28)**

The string storage and serializations will be cut short and truncated to this character limit. It is efficient to use shorter limits as calls will only serialize objects until this limit is reached.

**style_character_limit** - [*Number*], default: **Math.pow(2,25)**

The string storage and serializations will be cut short and truncated to this character limit which also includes the add styling syntax. This limit can not exceed the *character_limit*.

**truncate_function** - [*Boolean*], default: **false**

Do not print function body text. Instead print just the function declaration and ... in-between the opening and closing brackets.

**shift_function_body** - [*Boolean*], default: **true**

Replaces the natural indent of the function body string with an indent which matches the current object parsing indent.

**ensure_escape** - [*Boolean*], default: **true**

When a quote is found inside a string which uses the same quotes, at least two backslashes will be printed to ensure that the string is parsable as json data. If more than one backslash was included in a string than no additional backslashes will be added. Otherwise when set to false, a quote can be printed without a backslash which is not valid json data but may have the desired appearance. This mechanism works when using the *denote_quote* option as well.

**enumerate_all** - [*Boolean*], default: **false**

Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the *enumerate_all* option needs to be set to truthy.

**value_buffer** - [*Boolean*], default: **true**

Use toString when serializing instances of a nodejs Buffer. The buffer members will be printed if this is set falsey.

**denote_quoting** - [*String*], default: **"**

This will be used as the quote around strings in the serializer.

**quote_qualifier** - [*Boolean*], default: **false**

To put quoting around qualifiers in Objects. The *denote_quoting* string will be used in this as well.

**log_level** - [*Number*], default: **1**

This option accepts strings, numbers and Arrays and will convert the value set to it to a string representation of ranges. Arrays should be in pairs denoting ranges. Two Array values of the same value need to be set to denote a single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of Array pairs for more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are separated with commas. E.g. log_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored and strings are parsed as numbers in any case (Array or String). The value of log_level will be set to [*-Infinity, Infinity*] (which will match all levels),  if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.

**level** - [*Number*], default: **1**

The level of the print instance which pertains to the current *log_level*. Continued text processing will not occur if the level is set to a value which is not in one of the *log_level* ranges. All most all call overhead is discharged when the level is (re)set to a value which does not match to the *log_level* ranges.

**internal_level** - [*Number*], default: **false**

This is used to set the level of any messages which are logged internally in Bracket Print. Setting the value false (must ne a non-number) will use the internal level as the current level.
