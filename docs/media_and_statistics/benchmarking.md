# Bracket Print
## Benchmarking

---
### Bracket Print help pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/synopsis.md)
* Media and statistics
  * **Benchmarking**
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a_callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a_logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a_string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---


### Performing benchmarks against the Yahoo serialize-json module and internal JSON.stringify.

* With the style option set to true
	* Using a large random assigned object (687ms)
		* Bracket print: 119.114ms
		* Bracket print: 99.861ms
		* Bracket print: 92.244ms
		* Bracket print: 73.575ms
		* Bracket print: 69.352ms
		* Bracket print: 77.389ms
		-----------------------------
		* Yahoo stringify: 11.698ms
		* Yahoo stringify: 12.574ms
		* Yahoo stringify: 12.397ms
		* Yahoo stringify: 18.911ms
		* Yahoo stringify: 13.873ms
		* Yahoo stringify: 14.368ms
		-----------------------------
		* JSON.stringify: 10.183ms
		* JSON.stringify: 7.583ms
		* JSON.stringify: 9.187ms
		* JSON.stringify: 6.130ms
		* JSON.stringify: 6.191ms
		* JSON.stringify: 11.417ms
	* Using a small random assigned object
		* Bracket print: 2.399ms
		* Bracket print: 1.655ms
		* Bracket print: 6.294ms
		* Bracket print: 1.743ms
		* Bracket print: 2.064ms
		* Bracket print: 4.666ms
		-----------------------------
		* Yahoo stringify: 0.361ms
		* Yahoo stringify: 0.217ms
		* Yahoo stringify: 0.230ms
		* Yahoo stringify: 0.204ms
		* Yahoo stringify: 0.221ms
		* Yahoo stringify: 0.204ms
		-----------------------------
		* JSON.stringify: 0.153ms
		* JSON.stringify: 0.109ms
		* JSON.stringify: 0.117ms
		* JSON.stringify: 0.126ms
		* JSON.stringify: 0.107ms
		* JSON.stringify: 0.107ms
	* When parsing the nodejs path module (107ms)
		* Bracket print: 22.432ms
		* Bracket print: 13.101ms
		* Bracket print: 8.613ms
		* Bracket print: 13.744ms
		* Bracket print: 18.096ms
		* Bracket print: 13.649ms
		-----------------------------
		* Yahoo stringify: unable to do this
		* Yahoo stringify: 5.776ms
		-----------------------------
		* JSON.stringify: unable to do this
		* JSON.stringify: 0.270ms
	* When parsing a large populated byte array buffer (499ms)
		* Bracket print: 93.742ms
		* Bracket print: 52.574ms
		* Bracket print: 59.222ms
		* Bracket print: 49.483ms
		* Bracket print: 57.161ms
		* Bracket print: 47.934ms
		-----------------------------
		* Yahoo stringify: 13.687ms
		* Yahoo stringify: 8.791ms
		* Yahoo stringify: 7.470ms
		* Yahoo stringify: 11.401ms
		* Yahoo stringify: 9.841ms
		* Yahoo stringify: 10.005ms
		-----------------------------
		* JSON.stringify: 7.904ms
		* JSON.stringify: 6.619ms
		* JSON.stringify: 5.789ms
		* JSON.stringify: 6.592ms
		* JSON.stringify: 7.336ms
		* JSON.stringify: 5.900ms
* With the style option set to false
	* Using a large random assigned object (543ms)
		* Bracket print: 81.991ms
		* Bracket print: 58.943ms
		* Bracket print: 60.754ms
		* Bracket print: 58.494ms
		* Bracket print: 57.883ms
		* Bracket print: 63.389ms
		-----------------------------
		* Yahoo stringify: 9.063ms
		* Yahoo stringify: 9.275ms
		* Yahoo stringify: 12.428ms
		* Yahoo stringify: 18.309ms
		* Yahoo stringify: 13.776ms
		* Yahoo stringify: 21.237ms
		-----------------------------
		* JSON.stringify: 5.141ms
		* JSON.stringify: 12.339ms
		* JSON.stringify: 8.702ms
		* JSON.stringify: 8.949ms
		* JSON.stringify: 6.027ms
		* JSON.stringify: 10.085ms
	* Using a small random assigned object (46ms)
		* Bracket print: 8.259ms
		* Bracket print: 2.902ms
		* Bracket print: 1.227ms
		* Bracket print: 2.064ms
		* Bracket print: 3.571ms
		* Bracket print: 2.565ms
		-----------------------------
		* Yahoo stringify: 0.438ms
		* Yahoo stringify: 0.343ms
		* Yahoo stringify: 0.275ms
		* Yahoo stringify: 0.298ms
		* Yahoo stringify: 0.233ms
		* Yahoo stringify: 0.230ms
		-----------------------------
		* JSON.stringify: 0.112ms
		* JSON.stringify: 0.108ms
		* JSON.stringify: 0.151ms
		* JSON.stringify: 0.282ms
		* JSON.stringify: 0.180ms
		* JSON.stringify: 0.171ms
	* When parsing the nodejs path module (70ms)
		* Bracket print: 11.207ms
		* Bracket print: 8.227ms
		* Bracket print: 8.090ms
		* Bracket print: 6.679ms
		* Bracket print: 9.406ms
		* Bracket print: 8.830ms
		-----------------------------
		* Yahoo stringify: unable to do this
		* Yahoo stringify: 0.705ms
		-----------------------------
		* JSON.stringify: unable to do this
		* JSON.stringify: 0.386ms
	* When parsing a large populated byte array buffer (398ms)
		* Bracket print: 54.598ms
		* Bracket print: 41.187ms
		* Bracket print: 47.932ms
		* Bracket print: 39.737ms
		* Bracket print: 49.944ms
		* Bracket print: 39.841ms
		-----------------------------
		* Yahoo stringify: 12.592ms
		* Yahoo stringify: 12.762ms
		* Yahoo stringify: 9.633ms
		* Yahoo stringify: 8.536ms
		* Yahoo stringify: 10.294ms
		* Yahoo stringify: 8.306ms
		-----------------------------
		* JSON.stringify: 5.649ms
		* JSON.stringify: 5.570ms
		* JSON.stringify: 7.017ms
		* JSON.stringify: 6.051ms
		* JSON.stringify: 6.548ms
		* JSON.stringify: 5.414ms


