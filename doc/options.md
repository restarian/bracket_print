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

Options can be passed to bracket print using the constructor, the *spawn* member, the *option* member, or the *empty* member. The option object passed in can be an Object, arguments Object, or String. The string parameter will be used as the *log_title* value. Any string passed in will take priority over any *log_title* value contained in the Object parameters. And multiple strings will cause the last one in the parameter list to take priority.


Consider the example below where the String parameter takes priority above the *log_title* set in the Object.

```javascript
var up = bracket_print("Title One")
up.log(null)

up.log(null) // <- logs: [Print is here - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  null

up.option("Not me", {log_title: "not this one"}, "This one").log(false) // <-- logs [This one - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  false

up.option("Here I am", {log_title: "not this one"}).log(undefined) // <-- logs [Here I am - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  undefined

up.option({log_title: "This title"}).log(null) // <-- logs [This title - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  null
```

**Below is a list of the available configurable options:**

**style** - *[boolean]*

* Controls string formating pertaining to the set platform. The formatted string will be equal to the plain string if this is false. It can be enabled anywhere in the call chain to start the styling process.

**title** - *[boolean]*

* Disables the prepending of a title which is used with the *log* member. The *log_title* and *title_stamp* option values will be ignored. The title will not be included in the *toString* or *toStyleString* members.

**log_title** - *[string]*
	
* The value of this option will be used as the title string which is inserted before the *title_stamp*.

**title_stamp** - *[function]*
	
* The return value of this function will be inserted after the *log_title* (if it contains a string), in the title. 

**theme** - *[string]* 

* Uses the theme which is described in the style map

**compress_level** - *[number]*

* The compression level of the Object serializations. Lower numbers create more spacious formatting. Level one removes all white space and new lines from the Object.

**indentation_string** - *[string]*

* The string to use as one indentation. A non-white-space value will be colorized by the style map indent value.

**platform** - *[string]*

* The platform will control which style to use from the map. It is auto-detected as the default value.

**depth_limit** - *[number]*

* This will prevent Object serialization to traverse to a deeper level within Objects which avoids call stack max-out conditions.

**character_limit** - *[number]*

* The string storage and serializations will be cut short and truncated to this character limit. 

**style_character_limit** - *[number]*

* The string storage and serializations will be cut short and truncated to this character limit which also includes the add styling syntax. This limit can not exceed the character_limit. 

**truncate_function** - *[boolean]*

* Do not print function body text. Instead print just the function declaration.

**indent_function** - *[boolean]*

* Replaces the natural indent of the function body string with an indent which matches the current object parsing indent.

**enumerate_all** - *[boolean]*

* Objects that are built-in to javascript have the enumerable flag set to false. In order to parse these Objects (and other Objects), the enumerate_all option needs to be set to truthy.

**value_buffer** - *[boolean]*

* Use toString when serializing instances of a nodejs Buffer. The buffer members will be printed if this is set falsey.

**denote_quoting** - *[string]*

* This will be used as the quote around strings in the serializer.

**quote_qualifier** - *[boolean]*

* To put quoting around qualifiers in Objects. The denote_quoting string will be used in this as well.

**level** - *[number]*

* This option accepts strings, numbers and Arrays and will convert the value set to it to a string representation of ranges. Arrays should be in pairs denoting ranges. Two Array values of the same value need to be set to denote a single value. E.g. [1, 1, 4, 6] denotes a level of either 1 or on/between 4 and 6. Strings can be passed in lieu of Array pairs for more human friendly syntax. When strings are passed in: ranges are two numbers separated with a dash and single value levels are separated with commas. E.g. log_level = "1,4-6" denotes a level of either 1 or on/between 4 and 6 like the example above. White space is ignored and strings are parsed as numbers in any case (Array or String). The value of log_level will be set to *[-Infinity, Infinity]* (which will match all levels),  if an empty string or the string "all" is set. Note: The only way to use negative numbers is to passed in Array pairs.
	
**internal_level** - *[number]*

* This is used to set the level of any messages which are logged internally in bracket print.
