
---
### Bracket print document pages
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
  * Advanced usage
    * [Accessing the style map](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/accessing_the_style_map.md)
    * [Controlling the behaviour via option data](https://github.com/restarian/bracket_print/blob/master/docs/usage_and_examples/advanced_usage/controlling_the_behaviour_via_option_data.md)
 
 
**Version**: 0.9.17

**Description**: Comprehensive logging, printing and serialization for ECMA script.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)[https://restarian.com](https://restarian.com)

**Development dependencies**: [mocha](https://npmjs.org/package/mocha) [chai](https://npmjs.org/package/chai) [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [brace_prototype](https://npmjs.org/package/brace_prototype) [brace_umd](https://npmjs.org/package/brace_umd) [bracket_utils](https://npmjs.org/package/bracket_utils) [intercept-stdout](https://npmjs.org/package/intercept-stdout) [serialize-javascript](https://npmjs.org/package/serialize-javascript) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | build | ```r_js -o rjs_build.js; r_js -o rjs_build_umd.js``` |
 | make_docs | ```brace_document --navlink -r -i docs_raw -b docs --force-title --title 'Bracket print document pages' --sort depth``` |
 | make_docs_extra | ```npm run make_docs --silent -- --batten-document-specification --batten-document-mocha``` |

**Keywords**: *printing*, *console*, *logger*, *logging*, *serialize*

**Technologies used in development**:
  * [VIM](https://www.vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) As the development operating environment
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and rendering