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
* [Contributor code of conduct](https://github.com/restarian/bracket_print/blob/master/docs/contributor_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/bracket_print/blob/master/docs/guidelines_for_contributing.md)
* **Synopsis**
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/controlling_the_behaviour_via_option_data.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)

---

### Bracket Print is an ECMA serialization and logging tool with colorful and plain text output for terminal, browser, html or custom platforms.

**Bonuses:**

* Works in the browser, console or terminal with the default styles which can be extended to other special uses.
* Can output ECMA Objects in html syntax or any other custom created platforms.
* Supports the ES6 arrow functions.
* Uses AMD (asynchronous module definition), syntax.
* Has full [Brace Umd](https://npmjs.org/packages/brace_umd) integration for ideal, deterministic, and cross-platform deployment builds.
* Can stringify ECMA script (unlike the *JSON* builtin and other serializers)
* Bracket Print can safely serialize massive Objects (like the browser *window* property), without hiccups.
	* Is able to do semantically deep equality tests on ECMA script (not just JSON objects).
	* Output can be configured to be passed into JSON.parse or eval() methods.
* Uses a instance return chain to allow for usage as functional programming callbacks.
* Contains a comprehensive level mechanism to control what (and how) things get logged at run-time with a nearly total overhead discharge.
* Provides configurable syntax mapping with custom individualized styles.
* Well commented, thoroughly unit tested and professionally engineered code.

**Caveats:**

* Does not have browser unit tests.
