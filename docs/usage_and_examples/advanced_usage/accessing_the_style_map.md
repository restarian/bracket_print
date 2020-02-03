## Accessing the style map object data 

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
  * [As a_callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a_logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a_string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/controlling_the_behaviour_via_option_data.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * **Accessing the style map**

---

Syntax styling is applied via an ECMA object which is mapped according to a specific platform. An internal error message is provided if a incorrect platform or theme is set and attempted to be used.

### Using custom style maps 
The style map Object is returned by the *style_map* property which is available in any of the bracket print instances. A updated (or replacement), style map can be used which contains any (or all), of the original style map. An object extend method can be used the combine the original style map with a custom style map. Below is an example of such practice.
```javascript
var print = require("bracket_print")()
print.style_map = extend(print.style_map, your_custom_style_map)
```

### Style map assessors

**prototype.currentPlatform**

This member returns the platform object which is in use given the current instances set option data. The current platform is automatically detected when the module is imported and can also be changed with the *platform* option. It is safe to use (and recommended), as it gracefully returns a log message if the current platform is not available in the style map.

**prototype.currentTheme**

This member returns the current theme object of of the current platform. Sense style themes are place within the platform objects, platform will be first checked for availability and then the theme will be returned. This member will also gracefully return a log a message if either the platform or theme is unavailable.

Note: the style map can be altered by changing the value returned by the assessors above.
