# Brackit Print
### Constructing and Using Raw Strings 

----

### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/doc/README.md)
* [Callback Functionality](https://github.com/restarian/bracket_print/blob/master/doc/as_callback.md)
* [Console logging ](https://github.com/restarian/bracket_print/blob/master/doc/as_logger.md)
* [License information](https://github.com/restarian/bracket_print/blob/master/doc/license.md)
* [The Option Mechanism](https://github.com/restarian/bracket_print/blob/master/doc/options.md)
* [Screenshots and Media](https://github.com/restarian/bracket_print/blob/master/doc/screenshot.md)
* [Todo](https://github.com/restarian/bracket_print/blob/master/doc/todo.md)

----

..part of the [bracket suite](https://github.com/restarian/restarian/blob/master/bracket/readme.md)
![bracket](https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png)


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


The *toString* member is cheap to call (it simple returns an instance value if no parameters are provided), so the above example has very little CPU impact. The *toStyleString* call above returns the non-styled text sense the *style* option was set falsey. There is not an increase in performance overhead to use it instead of *toString* when *style* is disabled.


Any parameters that are passed into *toString* or *toStyleString* will be added to the call chain using the last command used for separation. The default command of *space* will be used when *toString* or *toStyleString* is called before a separation command.

Given the fact that toString returns a String Object, the print instance itself can be passed in as an parameter *(shown below)*.

```javascript
var up = require("bracket_print")({style: false})

var str1 = up.log("Hello world!")
var str2 = up.s("This is Bracket Print", str1).toString()

console.log(str2) // <- Logs  This is Bracket Print Hello world!

```
