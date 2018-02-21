# Bracket Print
### Callback Functionality

----
### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/README.md)
* [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/benchmarks.md)
* [License information](https://github.com/restarian/bracket_print/blob/master/docs/license.md)
* [The option mechanism](https://github.com/restarian/bracket_print/blob/master/docs/options.md)
* [Screenshots and media](https://github.com/restarian/bracket_print/blob/master/docs/screenshot.md)
* [Console logging](https://github.com/restarian/bracket_print/blob/master/docs/style_map.md)
* Using the logger
  * **Callback functionality**
  * [Console logging](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_logger.md)
  * [Constructing and using raw strings](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_string.md)
* [Project specification data](https://github.com/restarian/bracket_print/blob/master/docs/specification.md)

----

Print instances can be used as a logging callback in functional programming. The examples/explanations below make for a suitable replacement to the use of *console.log.bind(console)* as a callback parameter.

Objects passed into Bracket print callbacks as arguments will be printed using safe serialization. The log message is more informative and will be generated without need worry about stalling the repl. The example below only prints the first four hundred character of any Object which may happen to be passed into the logger callback. 


```javascript
var do_this = function(cb, err) {

	// Call the logger callback with a masive Object without worring about loop stall.
	err("and was passed to callback logger", this.self||this)
}

// Clone the original settings and create the copy with the settings passed in.
var cb = bracket_print.clone({max_characters: 400})
do_this(cb.line("success callback was called").log, cb.line("error callback was called").log)

// Errors will automatically print as well.
bracket_print.log(new Error("Hello error")

var send_error = function(cb, err) {

	err("in the send_error method", new Error("Stuff happend oddly"))
}

do_this(cb.line("success callback was called").log, cb.log)
```


