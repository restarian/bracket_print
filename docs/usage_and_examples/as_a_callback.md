## Callback functionality

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
  * **As a_callback**
  * [As a_logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a_string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

### Bracket Print instances can be used as a logging callback in functional programming.
A "bound and return" methodology is used with Bracket Print. This means that data is kept within almost all the members to be appended or used again. Even the log() member returns itself and can be called multiple times. Therefore, member like *spawn* and *empty* are used to create new instances or remove internally stored data. Note: this enables a suitable replacement for the use of *console.log.bind(console)* as a callback parameter.

### Objects passed into Bracket print callbacks as arguments will be printed using safe serialization.
The created log message is more informative than console logging and will be generated without worry of stalling the repl or run process. The example below only prints the first four hundred characters of any Object which may happen to be passed into the logger callback.

Note: the *depth_limit* option is also useful in reducing Object print out. Setting this two one will only print the top level Objects.

```javascript
var do_this = function(cb, err) {

	// Call the logger callback with a masive Object without worring about loop stall or max call stack conditions.
	err("and was passed to callback logger", this.self||this)
}

// Clone the original settings and create the copy with the settings passed in.
var cb = bracket_print.spawn({characters_limit: 400})
do_this(cb.line("success callback was called").log, cb.line("error callback was called").log)

// Errors will automatically print as well.
bracket_print.log(new Error("Hello error"))

var send_error = function(cb, err) {

	err("in the send_error method", new Error("Stuff happend oddly"))
}

do_this(cb.line("success callback was called").log, cb.log)
```
