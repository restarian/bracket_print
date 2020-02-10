### Console logging

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
  * **As a logger**
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/controlling_the_behaviour_via_option_data.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)

---

### Logging the stored strings
The output mechanism itelf is controlled with the *log_output* option value. The default value of the function simply applies the passed in array of strings to a console.log call. Note: The defualt value of *log_output* can be found in the options documentation. Any function which is set to the *log_output* option will need to join the argumemt array together or ouput it with a loop. See the example below for usage of a *log_output* function. Note: The array will only be of length 1 unless the browser platform is used or a custom plaftorm style was added that uses format array complementing.

```javascript
function(output) {
	//Method 1:
	document.write.apply(document, output)
	//Method 2: (which is the default)
	console.log.apply(console, output)
	//Method 3:
	document.body.innerHtml += output.join()
}
```

### Practice
The greatest strength of software logging lies within tracing steps to diagnose problems. This can be boosted when using a logger which passes down into other scrips and functions with the initial options and data intact. The example below demonstrates this simple methodology by using a function inside of another function. The logger is able to keep all of the initial settings while altering the *title* and *level* for use in the secondary function.

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
