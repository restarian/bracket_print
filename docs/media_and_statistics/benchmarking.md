## Benchmarking

---
### Bracket print document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/synopsis.md)
* Media and statistics
  * **Benchmarking**
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

**The following document was created using the output of running the unit *test -> benchmark.js* unit test. It uses Bracket print, JSON.stringify and [serialize-javascript](https://www.npmjs.com/package/serialize-javascript) modules.**

## Performing benchmarks which do not have a failing condition

## With the style option set to true
### Using a large random assigned object

Bracket print: 125.026ms, 104.044ms, 77.880ms, 65.827ms, 66.925ms

JSON.stringify: 6.126ms, 5.630ms, 10.881ms, 2.463ms, 2.269ms

Yahoo stringify: 8.673ms, 11.784ms, 4.285ms, 5.406ms, 5.243ms

### Using a small random assigned object

Bracket print: 0.160ms, 0.093ms, 0.084ms, 0.067ms, 0.082ms

Yahoo stringify: 0.081ms, 0.027ms, 0.011ms, 0.013ms, 0.016ms

JSON.stringify: 0.011ms, 0.010ms, 0.009ms, 0.007ms, 0.006ms

### When parsing the nodejs path module

Bracket print: 20.235ms, 13.946ms, 13.934ms, 14.210ms, 11.874ms

Yahoo stringify: unable to do this

JSON.stringify: unable to do this

## With the style option set to false
### Using a large random assigned object

Bracket print: 51.808ms, 25.228ms, 35.969ms, 33.154ms, 33.085ms

JSON.stringify: 2.637ms, 3.941ms, 6.260ms, 2.468ms, 2.582ms

Yahoo stringify: 10.873ms, 4.629ms, 10.596ms, 3.863ms, 7.172ms

### Using a small random assigned object

Bracket print: 0.086ms, 0.063ms, 0.061ms, 0.055ms, 0.064ms

Yahoo stringify: 0.023ms, 0.014ms, 0.014ms, 0.026ms, 0.015ms

JSON.stringify: 0.009ms, 0.006ms, 0.006ms, 0.006ms, 0.005ms

### When parsing the nodejs path module

Bracket print: 8.673ms, 10.199ms, 7.042ms, 13.189ms, 9.997ms

Yahoo stringify: unable to do this

JSON.stringify: unable to do this

