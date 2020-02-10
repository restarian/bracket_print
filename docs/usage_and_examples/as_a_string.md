## Constructing and Using Raw Strings

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
  * **As a string**
  * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/controlling_the_behaviour_via_option_data.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)

---

### Concatenation:
It is easy and programmatically efficient to assemble strings using Bracket Print. The process is made more efficient by setting the *style* option to false via the option member like in the example below. 

```javascript
var up = require("bracket_print")({style: false})

// The string can still be logged to console using log.
up.s("bracket_print", "can", "assemble").l("complex strings with minimal effort.", "This will make logging more pleasant").log()

// The string is returned using toString.
var log_string = up.toString()
// This returns the same string as above.
// The *toStyleString* member returns the same string as *toString* when the *style* option is false.
var log_string_a = up.toStyleString()

```

The *toString* member is cheap to call (it simply returns an instance value if no parameters are provided), so the above example has little system resource impact.

The *toStyleString* call above returns the non-styled text sense the *style* option was set false. There is no increase in resource overhead to use it instead of *toString* when styling is disabled via the *style* option.

Any parameters that are passed into *toString* or *toStyleString* will be added to the call chain using the last command used for separation. The default command of *space* will be used when *toString* or *toStyleString* is called before a separation command.

Given the fact that toString returns a String Object, the print instance itself can be passed in as an parameter *(shown below)*.

```javascript
var up = require("bracket_print")({style: false})

var str1 = up.log("Hello world!")
var str2 = up.s("This is Bracket Print", str1).toString()

console.log(str2) // <- Logs  This is Bracket Print Hello world!

```

#### String concatenation members

Below are the members which concatenate strings into the stored instance data. 

For members that do not return the instance, the last member called which specifies a separater will be used for its separater. The *space* member is used if no separater member was called before it. E.g. .line("cool").log("joes", "man") will put all of those words on seperate lines.

* All the members below return complete and bound instances with any string data from the previous calls.
	* *space()* or *s()*:
		* adds a space between string parameters and member calls and returns the instance.
	* *line()* or *l()*:
		* adds a newline between string parameters and member calls and returns the instance.
	* *tab()* or *t()*:
		* adds a tab between string parameters and member calls and returns the instance.
	* *add()* or *a()*:
		* does not add any characters between string parameters and member calls and returns the instance.
	* *log()*
		* runs the *log_output* option function and returns the instance.

* The members below also concatenate the stored instance string data (like the above), but will not return the instance. 
	* *log_true()*
		* runs the *log_output* option function and returns true.
	* *log_false()*
		* runs the *log_output* option function and returns false.
	* *log_undefined()*
		* runs the *log_output* option function and returns undefined.
	* *log_null()*
		* runs the *log_output* option function and returns null.
	* *log_empty()*
		* runs the *log_output* option function and returns an empty string.
	* *log_**[0-9]**()*
		* runs the *log_output* option function and returns the specifed number Example *.log_4()* returns the number 4 after calling the *log_output* function.
	* *log_N**[0-9]**()*
		* runs the *log_output* option function and returns the specifed number Example *.log_N4()* returns the number -4 after calling the *log_output* function.
	* *toString()*
		* adds the last command separater (or space if none), and returns the stored string. 
	* *toStyleString()*
		* adds the last command separater (or space if none), and returns the stored styled string. 
