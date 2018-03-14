
---
### Bracket print document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/synopsis.md)
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
  * **Unit test output**
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)
## Output of the unit testing

  * Internal storage - advanced_printing_and_storage.js
    * ✓ serializes the global Object in the node environment and truncated it to 1.01 megabytes
    * ✓ serializes objects with manually added __proto__ chains
    * ✓ serializes objects with manually added empty __proto__ Objects

  * Internal storage - basic_printing_and_storage.js
    * ✓ serializes the ECMA Object types while also using toString correctly
    * ✓ serializes the ECMA arguments object
    * ✓ serializes Error instances and Objects
    * ✓ serializes native ECMA Objects
    * ✓ serializes objects with odd property qualifiers
    * ✓ serializes primitve Objects
    * ✓ serializes primitve Objects with added properties
    * ✓ clears stored text data with the empty() command

  * Performing benchmarks which do not have a failing condition
    * with the style option set to true
      * ✓ using a large random assigned object
      * ✓ using a small random assigned object
      * ✓ when parsing the nodejs path module
    * with the style option set to false
      * ✓ using a large random assigned object
      * ✓ using a small random assigned object
      * ✓ when parsing the nodejs path module

  * the constructor
    * ✓ makes an instance of itself
    * ✓ makes an instance of itself after command calls
    * ✓ makes a new instances of itself when chained to a rooted Print object

  * The log_level optionlog_level.js
    * parses the value set to the log_level property and convertes it to the appropriate value.
      * ✓ when set with a string of dashes and commas
      * ✓ when set with an Array value
    * parses the value set to the log_level property and convertes it to the appropriate value
      * ✓ log_level controls the print commands

  * the options - option_handling.js
    * ✓ works with the prototype as default options in the expected way
    * ✓ setting Print prototype value to true
    * ✓ create the desired prototype chain and utilize redundancy
    * ✓ the log_title, log_title_stamp and auto_hyphen_title options operate together as expected
    * ✓ store and transfers the log_title in many ways
    * ✓ The log level property is parsed and assigned the proper value
    * ✓ quoting can be changed and is used properly
    * ✓ enumerate_all option has desire effect
    * ✓ max_character setting is adhered to
    * ✓ utilize the depth_limit
    * ✓ setting Print prototype value to false
    * ✓ create the desired prototype chain and utilize redundancy
    * ✓ the log_title, log_title_stamp and auto_hyphen_title options operate together as expected
    * ✓ store and transfers the log_title in many ways
    * ✓ The log level property is parsed and assigned the proper value
    * ✓ quoting can be changed and is used properly
    * ✓ enumerate_all option has desire effect
    * ✓ max_character setting is adhered to
    * ✓ utilize the depth_limit

  * Internal storage mapping mechinism - storage_and_mapping.js
    * ✓ has the proper style_map value
    * ✓ returns a null error message when incorrect style map values are used
    * ✓ returns an error message when incorrect style map values are used
    * ✓ returns an error message when incorrect style map theme values are used
    * ✓ returns an error message when incorrect style map theme values are used

  * 47 passing

�� returns an error message when incorrect style map theme values are used

  * 48 passing

