[![Build status](https://ci.appveyor.com/api/projects/status/fgkk45xrm8yv7av0/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/bracket-print/branch/master) [![Downloads](https://img.shields.io/npm/dm/bracket_print.svg?svg=true)](https://npmjs.org/package/bracket_print)

| **The [Bracket Suite]** | **[Ubuntu on Windows]**   |
|:-----------------------:|:-------------------------:|
| ![Bracket logo]         | ![Ubuntu on Windows logo] |         |

[Bracket Suite]: https://github.com/restarian/restarian/tree/master/bracket/
[Ubuntu on Windows]: https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6?activetab=pivot%3aoverviewtab

[Ubuntu on Windows logo]: https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png
[Bracket logo]: https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png

## Synopsis

---
### Bracket Print help pages
* **Synopsis**
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
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

### Bracket Print is an ECMA serialization and logging tool with colorful and plain text output for the terminal and browser consoles.

**Bonuses:**

* Now supports the ES6 arrow functions.
* Works in the browser, console or terminal with the default styles which can be extended to other special uses.
* Can output ECMA Objects in html syntax or any other custom created platforms.
* Uses AMD (asynchronous module definition), syntax.
* Well commented, thoroughly unit tested and professionally engineered code.
* Has full [Brace Umd](https://npmjs.org/packages/brace_umd) integration for ideal and deterministic deployment builds.
* Can stringify ECMA script (unlike the *JSON* builtin and other serializers)
* Bracket Print can serialize massive Objects (like the browser *window* property), without hiccups.
	* Is able to do semantically deep equality tests on ECMA script (not just JSON objects).
	* Output can be configured to be passed into JSON.parse or eval() methods.
* Uses a instance return chain to allow for usage as functional programming callbacks.
* Contains a comprehensive level mechanism to control what is logged at run-time with a nearly total overhead discharge.
* Provides configurable syntax mapping with custom individualized styles.

**Caveats:**

* Does not have browser unit tests.
