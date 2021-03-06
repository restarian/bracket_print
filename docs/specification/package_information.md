# Bracket Print
### Package Specifications

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
  * **Package information**
  * [Unit test output](https://github.com/restarian/bracket_print/blob/master/docs/specification/unit_test_output.md)
* Usage and examples
  * [As a callback](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_callback.md)
  * [As a logger](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_logger.md)
  * [As a string](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/as_a_string.md)
  * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/controlling_the_behaviour_via_option_data.md)
  * [How the level correlates to styling](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/how_the_level_correlates_to_styling.md)
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
----

**Version**: 0.11.7

**Description**: Comprehensive logging, printing and serialization for ECMA script.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)[https://restarian.xyz](https://restarian.xyz)

**Dependencies**: [brace_option](https://npmjs.org/package/brace_option)

**Development dependencies**: [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [brace_umd](https://npmjs.org/package/brace_umd) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [intercept-stdout](https://npmjs.org/package/intercept-stdout) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs) [serialize-javascript](https://npmjs.org/package/serialize-javascript)

**Optional Dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_document_link](https://npmjs.org/package/brace_document_link) [brace_document_mocha](https://npmjs.org/package/brace_document_mocha) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink) [brace_document_specification](https://npmjs.org/package/brace_document_specification)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | build_config | ```build_umd --config-file uglify_option.json``` |
 | build_umd | ```r_js -o ./rjs_build_first.js && r_js -o ./rjs_build_second.js suffix="_umd"``` |
 | build_amd | ```r_js -o ./rjs_build_first.js && r_js -o ./rjs_build_second.js``` |
 | build_example | ```r_js -o ./example/rjs_build_example.js``` |
 | build | ```npm run build_config && npm run build_umd && npm run build_amd && npm run build_example``` |
 | make_docs | ```brace_document --navlink --link --link-dest ../Readme.md --link-path ../docs/synopsis.md -r -i docs --force-title --title "Bracket Print help pages" --sort depth --specification --mocha``` |

**Keywords**: *printing*, *console*, *logging*, *eval*, *serialize*

**Technologies used in development**:
  * [VIM](https://www.vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) As the development operating environment
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and rendering