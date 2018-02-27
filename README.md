# Bracket Print
## Synopsis

[![Build status](https://ci.appveyor.com/api/projects/status/ubnsgah9goq3ryfu/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/bracket-print/branch/master) [![Build Status](https://travis-ci.org/restarian/bracket_print.svg?branch=master)](https://travis-ci.org/restarian/bracket_print) [![Downloads](https://img.shields.io/npm/dm/bracket_print.svg?svg=true)](https://npmjs.org/package/bracket_print)

| A part of the [Bracket suite](https://github.com/restarian/restarian/blob/master/bracket/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Bracket](https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 

---
### Document pages
* **Synopsis**
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docs/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docs/specification/license_information.md)
  * [Package specification](https://github.com/restarian/bracket_print/blob/master/docs/specification/package_specification.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)

---

### Bracket print is an ECMA serialization and logging tool with colorful and plain text output for the terminal and browser consoles.

**Author: Robert Steckroth, *Bust0ut* [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**
**Licenses under: LGPL-v3**

**Bonuses:**
* Works in the Browser, console or terminal
* Easy to configure for other platforms and environments
* Uses AMD (asynchronous module definition), syntax
* Tested in Linux and/or Windows environments
* Well commented, thoroughly unit tested and professional code
* Has full [Brace UMD](https://npmjs.org/packages/brace_umd) integration for complete deployment unit testing coverage
* Can stringify ECMA script (unlike the *JSON* builtin and other serializers)
* Bracket Print can serialize massive Objects Objects (like the browser *window* property), without hiccups
	* Is able to do semantically deep equality tests on ECMA script (not just JSON objects)
	* Removes superfluous tabs, spaces, and newlines from function strings
	* Output can be configured to be passed into JSON.parse 
* Bracket Print has a collaborative design which sits in the root of large projects to encourage team development
* Uses a prototypal return chain to allow for usage as functional programming callbacks
* Contains a comprehensive level mechanism to control what is logged at run-time with a nearly total overhead discharge
* Provides configurable syntax mapping with custom individualized styles
* Styling can be toggled anywhere in the run-time or call chain with a total overhead discharge

**Caveats:**
* Does not do browser unit testing



