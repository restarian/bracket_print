# Bracket Print
### Console logging 

----

### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/README.md)
* [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/benchmarks.md)
* [The option mechanism](https://github.com/restarian/bracket_print/blob/master/docs/options.md)
* Image
* [Screenshots and media](https://github.com/restarian/bracket_print/blob/master/docs/screenshot.md)
* **Console logging**
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license.md)
* Using the logger
  * [Callback functionality](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_callback.md)
  * [Constructing and using raw strings](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_string.md)
  * [Console logging](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_logger.md)
* [Project specification data](https://github.com/restarian/bracket_print/blob/master/docs/specification/specification.md)

----


**Bracket Print makes a wonderful console logger.** The logger will work in the browser console window or to stdout in nodejs environments. ```
try {
	this.will_fail = 2
} 
catch(e) { 
	Print.log(e)
}
```
