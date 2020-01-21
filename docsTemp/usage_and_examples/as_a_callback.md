## Callback functionality

---
### Bracket Print document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docsTemp/synopsis.md)
* [Unit test output](https://github.com/restarian/bracket_print/blob/master/docsTemp/unit_test_output.md)
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docsTemp/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docsTemp/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docsTemp/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docsTemp/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docsTemp/specification/unit_test_output.md)
* Usage and examples
  * **As a_callback**
  * [As a_logger](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/as_a_logger.md)
  * [As a_string](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

### Bracket print instances can be used as a logging callback in functional programming.
The examples/explanations below make for a suitable replacement for the use of *console.log.bind(console)* as a callback parameter.

### Objects passed into Bracket print callbacks as arguments will be printed using safe serialization.
The log message is more informative and will be generated without need worry about stalling the repl or process. The example below only prints the first four hundred character of any Object which may happen to be passed into the logger callback.

```javascript
var do_this = function(cb, err) {

	// Call the logger callback with a masive Object without worring about loop stall or max call stack conditions.
	err("and was passed to callback logger", this.self||this)
}

// Clone the original settings and create the copy with the settings passed in.
var cb = bracket_print.spawn({max_characters: 400})
do_this(cb.line("success callback was called").log, cb.line("error callback was called").log)

// Errors will automatically print as well.
bracket_print.log(new Error("Hello error"))

var send_error = function(cb, err) {

	err("in the send_error method", new Error("Stuff happend oddly"))
}

do_this(cb.line("success callback was called").log, cb.log)
```
