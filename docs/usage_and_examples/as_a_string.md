## Constructing and Using Raw Strings

---
### Bracket Print help pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/synopsis.md)
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a_callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a_logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * **As a_string**
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

### Concatenation:
It is easy and programmatically efficient to assemble strings using bracket print. The process can be made the most efficient by turning off style formatting via the option member like below.

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

The *toStyleString* call above returns the non-styled text sense the *style* option was set falsey. There is no increase in resource overhead to use it instead of *toString* when styling is disabled via the *style* option.


Any parameters that are passed into *toString* or *toStyleString* will be added to the call chain using the last command used for separation. The default command of *space* will be used when *toString* or *toStyleString* is called before a separation command.

Given the fact that toString returns a String Object, the print instance itself can be passed in as an parameter *(shown below)*.

```javascript
var up = require("bracket_print")({style: false})

var str1 = up.log("Hello world!")
var str2 = up.s("This is Bracket Print", str1).toString()

console.log(str2) // <- Logs  This is Bracket Print Hello world!

```

#### Members:

Below are the members which concatenate strings. All of them return complete and bound instances with any string data from the previous calls.
* *space()* or *s()*:
  * adds a space between string parameters and member calls.
* *line()* or *l()*:
  * adds a newline between string parameters and member calls.
* *tab()* or *t()*:
  * adds a tab between string parameters and member calls.
* *add()* or *a()*:
  * does not add any characters between string parameters and member calls.



  
