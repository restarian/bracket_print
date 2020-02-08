# Bracket Print
### Output of unit testing
 
----
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
  * **Unit test output**
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/controlling_the_behaviour_via_option_data.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
----
 
### ---------- Start of unit testing ----------

  * Using stop further progression methodology for dependencies in: advanced_printing_and_storage.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * Internal storage
      * √ serializes the global Object in the node environment and truncated it to 1.01 megabytes
      * √ serializes objects with manually added __proto__ chains
      * √ serializes objects with manually added empty __proto__ Objects

  * Using stop further progression methodology for dependencies in: basic_printing_and_storage.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * Internal storage
      * Testing using requirejs and the lib directory
        * √ Escapes double quotes in strings which are encapsulated with single quotes
        * √ Escapes double quotes in strings which are encapsulated with single quotes with the ensure_escape option set to false
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to true
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to false
        * √ Escapes single quotes in strings which are encapsulated with double quotes with the ensure_escape option set to false
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to true
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to false
        * √ Properly inserts newlines into strings with the ensure_escape option set to false
        * √ serializes the ECMA Object types while also using toString correctly
        * √ serializes the ECMA arguments object
        * √ serializes Error instances and Objects
        * √ serializes native ECMA Objects
        * √ serializes objects with odd property qualifiers
        * √ serializes primitve Objects
        * √ serializes primitve Objects with added properties
        * √ clears stored text data with the empty() command
      * Testing using requirejs and the build directory with the umd version
        * √ Escapes double quotes in strings which are encapsulated with single quotes
        * √ Escapes double quotes in strings which are encapsulated with single quotes with the ensure_escape option set to false
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to true
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to false
        * √ Escapes single quotes in strings which are encapsulated with double quotes with the ensure_escape option set to false
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to true
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to false
        * √ Properly inserts newlines into strings with the ensure_escape option set to false
        * √ serializes the ECMA Object types while also using toString correctly
        * √ serializes the ECMA arguments object
        * √ serializes Error instances and Objects
        * √ serializes native ECMA Objects
        * √ serializes objects with odd property qualifiers
        * √ serializes primitve Objects
        * √ serializes primitve Objects with added properties
        * √ clears stored text data with the empty() command
      * Testing using requirejs and the build directory
        * √ Escapes double quotes in strings which are encapsulated with single quotes
        * √ Escapes double quotes in strings which are encapsulated with single quotes with the ensure_escape option set to false
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to true
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to false
        * √ Escapes single quotes in strings which are encapsulated with double quotes with the ensure_escape option set to false
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to true
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to false
        * √ Properly inserts newlines into strings with the ensure_escape option set to false
        * √ serializes the ECMA Object types while also using toString correctly
        * √ serializes the ECMA arguments object
        * √ serializes Error instances and Objects
        * √ serializes native ECMA Objects
        * √ serializes objects with odd property qualifiers
        * √ serializes primitve Objects
        * √ serializes primitve Objects with added properties
        * √ clears stored text data with the empty() command
      * Testing using commonjs which and the package.json entry of lib/bracket_print.js
        * √ Escapes double quotes in strings which are encapsulated with single quotes
        * √ Escapes double quotes in strings which are encapsulated with single quotes with the ensure_escape option set to false
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to true
        * √ The denote_quoting option works with an empty value set with the ensure_escape option set to false
        * √ Escapes single quotes in strings which are encapsulated with double quotes with the ensure_escape option set to false
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to true
        * √ Escapes single or double quotes which are encapsulated in single or double quotes with the ensure_escape option set to false
        * √ Properly inserts newlines into strings with the ensure_escape option set to false
        * √ serializes the ECMA Object types while also using toString correctly
        * √ serializes the ECMA arguments object
        * √ serializes Error instances and Objects
        * √ serializes native ECMA Objects
        * √ serializes objects with odd property qualifiers
        * √ serializes primitve Objects
        * √ serializes primitve Objects with added properties
        * √ clears stored text data with the empty() command

  * Performing benchmarks against the Yahoo serialize-json module and internal JSON.stringify.
    * with the style option set to true
      * √ using a large random assigned object
      * √ using a small random assigned object
      * √ when parsing the nodejs path module
      * √ when parsing a large populated byte array buffer
    * with the style option set to false
      * √ using a large random assigned object
      * √ using a small random assigned object
      * √ when parsing the nodejs path module
      * √ when parsing a large populated byte array buffer

  * Using stop further progression methodology for dependencies in: builtin_checking.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * Built in objects will serialize correctly
      * √ serializes functions correctly using compression level 5

  * Using stop further progression methodology for dependencies in: es6_function_serialization.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * Serializes functions
      * √ serializes functions correctly using compression level 5
      * √ serializes functions correctly using compression level 5 and the shift_function_body option
      * √ serializes functions correctly using compression level 4 with the shift_function_body option set
      * √ serializes functions correctly using compression level 3 with the shift_function_body option set
      * √ serializes functions correctly using compression level 2
      * √ serializes functions correctly using compression level 2 with the shift_function_body option set
      * √ serializes functions correctly using compression level 1
      * √ serializes functions correctly using compression level 1 with the shift_function_body option set

  * Using stop further progression methodology for dependencies in: function_serialization.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * Serializes functions
      * √ serializes functions correctly using compression level 5
      * √ serializes functions correctly using compression level 5 and the shift_function_body option
      * √ serializes functions correctly using compression level 4
      * √ serializes functions correctly using compression level 4 with the shift_function_body option set
      * √ serializes functions correctly using compression level 3
      * √ serializes functions correctly using compression level 3 with the shift_function_body option set
      * √ serializes functions correctly using compression level 2
      * √ serializes functions correctly using compression level 2 with the shift_function_body option set
      * √ serializes functions correctly using compression level 1
      * √ serializes functions correctly using compression level 1 with the shift_function_body option set
      * √ serializes functions within prototypes with various compression levels and options
      * √ serializes objects Object.prototype __proto__ chains

  * Using stop further progression methodology for dependencies in: initialization.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * the constructor
      * √ makes an instance of itself
      * √ makes an instance of itself after command calls
      * √ makes a new instances of itself when chained to a rooted print object

  * Using stop further progression methodology for dependencies in: log_level.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * The log_level option
      * parses the value set to the log_level property and convertes it to the appropriate value.
        * √ when set with a string of dashes and commas
        * √ when set with an Array value
      * parses the value set to the log_level property and convertes it to the appropriate value
        * √ log_level controls the print commands

  * Using stop further progression methodology for dependencies in: option_handling.js
    * Checking for dependencies..
      * √ r_js in the system as a program
    * the options mechanism
      * √ works with the prototype as default options in the expected way
      * √ setting Print prototype value to true
      * √ create the desired prototype chain and utilize redundancy
      * √ the log_title, log_title_stamp and auto_hyphen_title options operate together as expected
      * √ store and transfers the log_title in many ways
      * √ The log level property is parsed and assigned the proper value
      * √ quoting can be changed and is used properly
      * √ enumerate_all option has desire effect
      * √ max_character setting is adhered to
      * √ utilize the depth_limit
      * √ setting Print prototype value to false
      * √ create the desired prototype chain and utilize redundancy
      * √ the log_title, log_title_stamp and auto_hyphen_title options operate together as expected
      * √ store and transfers the log_title in many ways
      * √ The log level property is parsed and assigned the proper value
      * √ quoting can be changed and is used properly
      * √ enumerate_all option has desire effect
      * √ max_character setting is adhered to
      * √ utilize the depth_limit

  * Using stop further progression methodology for dependencies in: storage_and_mapping.js
    * Checking for dependencies..
      * √ requirejs in the system as a program
      * √ r_js in the system as a command line program
      * √ r_js will build the program
      * √ r_js will build the program using the UMD rjs build
    * Internal storage mapping mechinism
      * √ has the proper style_map value
      * √ returns a null error message when incorrect style map values are used
      * √ returns an error message when incorrect style map values are used
      * √ returns an error message when incorrect style map values are used 2
      * √ returns the proper current_format and currentTheme value
      * √ returns the proper current_format and currentTheme value with the import_theme_from value set in the style map
      * √ returns an error message when incorrect style map theme values are used
      * √ returns an error message when incorrect style map theme values are used

  * 141 passing


### ---------- End of unit testing ----------