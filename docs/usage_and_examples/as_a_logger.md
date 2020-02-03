### Console logging

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
  * **As a_logger**
  * [As a_string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

### Bracket print makes for a wonderful console logger
#### The logger will output to the browser console or to stdout in nodejs environments.

### Practice:
The greatest strength of logging lies with tracing back steps to diagnose problems. This can be boosted when using a logger which passes down into other scrips and functions with the initial options and data intact. The example below demonstrates this simple methodology by using a function inside of another function. The logger is able to keep all of the initial settings while altering the *title* and *level* for use in the secondary function.

Note: passing in incorrect option keys will result in an message printed with the currently available option listed. This may not show depending if the *internal_level* option value as well.

```javascript
var cnt = 0
var up = require("bracket_print")({log_title: "Main", level: 1, title_stamp: function() {  return "#"+ cnt++ }})
;(function() {

	up.s("In function main with level set to", 1).log()
	up.log("Calling internal function:")

	;(function(up) {

		up = up.spawn({level: 2, log_title: up.log_title + " -> " + "Internal Funtion"})
		up.l("Inside internal function").l("Which has the level set to").s(2).log()
		up.log("Note that the title_stamp is still incrementing globally")

	})(up)

	up.log("Ending with a final message.")

})(up)

/*
Output of above script:

[Main - #0] In function main with level set to 1
[Main - #1] Calling internal function:                                            
[Main -> Internal Funtion - #2] Inside internal function
Which has the level set to 2
[Main -> Internal Funtion - #3] Note that the title_stamp is still incrementing globally
[Main - #4] Ending with a final message.
*/

```
