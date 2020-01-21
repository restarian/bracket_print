# Bracket Print
### Package Specifications

----

### Bracket Print document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docsTemp/synopsis.md)
* [Unit test output](https://github.com/restarian/bracket_print/blob/master/docsTemp/unit_test_output.md)
* [Unit test output](https://github.com/restarian/bracket_print/blob/master/docsTemp/unit_test_output.md)
* Cspecification
  * **Package information**
* Media and statistics
  * [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docsTemp/media_and_statistics/benchmarking.md)
  * [Screeenshots of output](https://github.com/restarian/bracket_print/blob/master/docsTemp/media_and_statistics/screeenshots_of_output.md)
* Specification
  * [License information](https://github.com/restarian/bracket_print/blob/master/docsTemp/specification/license_information.md)
  * [Package information](https://github.com/restarian/bracket_print/blob/master/docsTemp/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docsTemp/specification/unit_test_output.md)
* Usage and examples
  * [As a_callback](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/as_a_callback.md)
  * [As a_logger](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/as_a_logger.md)
  * [As a_string](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/as_a_string.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docsTemp/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)
----

**Version**: 0.9.26

**Description**: Comprehensive logging, printing and serialization for ECMA script.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)[https://restarian.xyz](https://restarian.xyz)

**Development dependencies**: [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [brace_prototype](https://npmjs.org/package/brace_prototype) [brace_umd](https://npmjs.org/package/brace_umd) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [intercept-stdout](https://npmjs.org/package/intercept-stdout) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs) [serialize-javascript](https://npmjs.org/package/serialize-javascript)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | build | ```r_js -o rjs_build.js; r_js -o rjs_build_umd.js``` |
 | make_docs | ```brace_document -i docs --navlink -r --force-title --title "Bracket Print document pages" --sort depth``` |
 | make_docs_extra | ```npm run make_docs --silent -- --specification --mocha``` |

**Keywords**: *printing*, *console*, *logger*, *logging*, *serialize*

**Technologies used in development**:
  * [VIM](https://www.vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) As the development operating environment
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and rendering