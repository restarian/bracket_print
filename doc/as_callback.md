# Brackit Print
### Callback Functionality

----
### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/doc/README.md)
* [Console logging ](https://github.com/restarian/bracket_print/blob/master/doc/as_logger.md)
* [Constructing and Using Raw Strings ](https://github.com/restarian/bracket_print/blob/master/doc/as_string.md)
* [License information](https://github.com/restarian/bracket_print/blob/master/doc/license.md)
* [The Option Mechanism](https://github.com/restarian/bracket_print/blob/master/doc/options.md)
* [Screenshots and Media](https://github.com/restarian/bracket_print/blob/master/doc/screenshot.md)
* [Todo](https://github.com/restarian/bracket_print/blob/master/doc/todo.md)

----

..part of the [bracket suite](https://github.com/restarian/restarian/blob/master/bracket/readme.md)
![bracket](https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png)


Print instances can be used as callbacks in functional programming. The examples and explanation's is a suitable replacement for *console.log.bind(console)* as a callback parameter.

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


