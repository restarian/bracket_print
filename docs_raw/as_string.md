# Bracket Print
### Constructing and Using Raw Strings 

---
### Document pages

---

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
