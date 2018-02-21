#  Bracket Print
## Project Specification Data


---
### Document pages
* [Synopsis](https://github.com/restarian/bracket_print/blob/master/docs/README.md)
* [Benchmarking](https://github.com/restarian/bracket_print/blob/master/docs/benchmarks.md)
* [License information](https://github.com/restarian/bracket_print/blob/master/docs/license.md)
* [The option mechanism](https://github.com/restarian/bracket_print/blob/master/docs/options.md)
* [Screenshots and media](https://github.com/restarian/bracket_print/blob/master/docs/screenshot.md)
* [Console logging](https://github.com/restarian/bracket_print/blob/master/docs/style_map.md)
* Using the logger
  * [Callback functionality](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_callback.md)
  * [Console logging](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_logger.md)
  * [Constructing and using raw strings](https://github.com/restarian/bracket_print/blob/master/docs/using_the_logger/as_string.md)
* **Project specification data**

---
###  Comprehensive logging, printing and serialization for ECMA script.

**Version**: 0.9.11

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)[https://restarian.com](https://restarian.com)

**Technologies used in development**:
  * [VIM](https://vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) As the development operating environment
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage
  * [Blender](https://blender.org) For logo design and rendering

**License**: LGPL-3.0

**Dependencies**: [serialize-javascript](https://npmjs.org/package/serialize-javascript)

**Development dependencies**: [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [brace_prototype](https://npmjs.org/package/brace_prototype) [brace_umd](https://npmjs.org/package/brace_umd) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [intercept-stdout](https://npmjs.org/package/intercept-stdout) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**:

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | mocha |
 | build | r_js -o ./rjs_build.js; r_js -o ./rjs_build_umd.js |