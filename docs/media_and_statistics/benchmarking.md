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
	* Using a large random assigned object (670ms)
		* Bracket Print:
			* : 118.999ms
			* : 97.998ms
			* : 88.299ms
			* : 71.143ms
			* : 70.296ms
			* : 74.965ms
		---------------------
		* Yahoo stringify:
			* : 9.876ms
			* : 13.017ms
			* : 11.219ms
			* : 17.288ms
			* : 13.644ms
			* : 12.104ms
		---------------------
		* JSON.stringify:
			* : 10.935ms
			* : 5.993ms
			* : 9.214ms
			* : 7.658ms
			* : 8.831ms
			* : 5.661ms
	* Using a small random assigned object (49ms)
		* Bracket Print:
			* : 3.942ms
			* : 1.795ms
			* : 1.841ms
			* : 4.842ms
			* : 3.788ms
			* : 2.896ms
		---------------------
		* Yahoo stringify:
			* : 0.294ms
			* : 0.342ms
			* : 0.394ms
			* : 0.262ms
			* : 0.244ms
			* : 0.230ms
		---------------------
		* JSON.stringify:
			* : 0.132ms
			* : 0.127ms
			* : 0.125ms
			* : 0.172ms
			* : 0.123ms
			* : 0.122ms
	* When parsing the nodejs path module (73ms)
		* Bracket Print:
			* : 16.437ms
			* : 11.750ms
			* : 11.161ms
			* : 8.436ms
			* : 10.049ms
			* : 7.558ms
		---------------------
		* Yahoo stringify:
			* ..unable to do this
		---------------------
		* JSON.stringify:
			* ..unable to do this
	* When parsing a large populated byte array buffer (476ms)
		* Bracket Print:
			* : 93.862ms
			* : 47.334ms
			* : 54.657ms
			* : 48.155ms
			* : 54.214ms
			* : 48.133ms
		---------------------
		* Yahoo stringify:
			* : 13.607ms
			* : 8.901ms
			* : 8.451ms
			* : 8.505ms
			* : 8.819ms
			* : 10.818ms
		---------------------
		* JSON.stringify:
			* : 6.069ms
			* : 7.265ms
			* : 5.213ms
			* : 7.005ms
			* : 6.418ms
			* : 8.329ms
* With the style option set to false
	* Using a large random assigned object (524ms)
		* Bracket Print:
			* : 79.774ms
			* : 60.589ms
			* : 59.244ms
			* : 58.197ms
			* : 59.416ms
			* : 59.258ms
		---------------------
		* Yahoo stringify:
			* : 10.283ms
			* : 8.147ms
			* : 13.179ms
			* : 17.458ms
			* : 14.415ms
			* : 10.870ms
		---------------------
		* JSON.stringify:
			* : 13.746ms
			* : 4.314ms
			* : 8.089ms
			* : 7.882ms
			* : 5.746ms
			* : 10.179ms
	* Using a small random assigned object (46ms)
		* Bracket Print:
			* : 4.017ms
			* : 3.231ms
			* : 3.154ms
			* : 1.673ms
			* : 2.306ms
			* : 1.534ms
		---------------------
		* Yahoo stringify:
			* : 0.434ms
			* : 0.282ms
			* : 0.445ms
			* : 0.252ms
			* : 0.319ms
			* : 0.238ms
		---------------------
		* JSON.stringify:
			* : 0.314ms
			* : 0.122ms
			* : 0.250ms
			* : 0.249ms
			* : 0.122ms
			* : 0.116ms
	* When parsing the nodejs path module (58ms)
		* Bracket Print:
			* : 9.762ms
			* : 10.019ms
			* : 7.845ms
			* : 8.748ms
			* : 8.761ms
			* : 6.483ms
		---------------------
		* Yahoo stringify:
			* ..unable to do this
		---------------------
		* JSON.stringify:
			* ..unable to do this
	* When parsing a large populated byte array buffer (386ms)
		* Bracket Print:
			* : 51.436ms
			* : 40.533ms
			* : 47.312ms
			* : 41.727ms
			* : 46.926ms
			* : 37.769ms
		---------------------
		* Yahoo stringify:
			* : 11.166ms
			* : 10.133ms
			* : 7.699ms
			* : 8.947ms
			* : 8.976ms
			* : 7.881ms
		---------------------
		* JSON.stringify:
			* : 7.793ms
			* : 5.013ms
			* : 7.114ms
			* : 6.391ms
			* : 6.099ms
			* : 6.736ms
