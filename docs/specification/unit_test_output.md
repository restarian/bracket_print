

---
### Document pages
* [Benchmarks](https://github.com/restarian/bracket_print/blob/master/docs/benchmarks.md)
* [License](https://github.com/restarian/bracket_print/blob/master/docs/license.md)
* [Options](https://github.com/restarian/bracket_print/blob/master/docs/options.md)
* [Screenshot](https://github.com/restarian/bracket_print/blob/master/docs/screenshot.md)
* [Style map](https://github.com/restarian/bracket_print/blob/master/docs/style_map.md)
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/synopsis.md)
* Specification
  * [Package specification](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_specification.md)
  * **Unit test output**
* Using the logger
  * [As callback](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_callback.md)
  * [As logger](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_logger.md)
  * [As string](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_string.md)

---
## Output of the unit testing


  * Internal storage - advanced_printing_and_storage.js

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

    * ✓ returns the proper current_format and current_theme value

    * ✓ returns the proper current_format and current_theme value with the import_theme_from value set in the style map

    * ✓ returns an error message when incorrect style map theme values are used

    * ✓ returns an error message when incorrect style map theme values are used



  * 48 passing


