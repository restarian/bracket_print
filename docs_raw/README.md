# Bracket Print
### Synopsis

[![Build status](https://ci.appveyor.com/api/projects/status/ubnsgah9goq3ryfu/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/bracket-print/branch/master) [![Build Status](https://travis-ci.org/restarian/bracket_print.svg?branch=master)](https://travis-ci.org/restarian/bracket_print) [![Downloads](https://img.shields.io/npm/dm/bracket_print.svg?svg=true)](https://npmjs.org/package/bracket_print)

| A part of the [Bracket suite](https://github.com/restarian/restarian/blob/master/bracket/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Bracket](https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 


------

### Document pages

* [Callback Functionality](https://github.com/restarian/bracket_print/blob/master/doc/as_callback.md)
* [Console logging ](https://github.com/restarian/bracket_print/blob/master/doc/as_logger.md)
* [Constructing and Using Raw Strings ](https://github.com/restarian/bracket_print/blob/master/doc/as_string.md)
* [License Information](https://github.com/restarian/bracket_print/blob/master/doc/license.md)
* [The Option Mechanism](https://github.com/restarian/bracket_print/blob/master/doc/options.md)
* [Screenshots and Media](https://github.com/restarian/bracket_print/blob/master/doc/screenshot.md)
* [Console logging ](https://github.com/restarian/bracket_print/blob/master/doc/style_map.md)
* [Todo](https://github.com/restarian/bracket_print/blob/master/doc/todo.md)

----

### Bracket print is an ECMA serialization and logging tool with colorful and plain text output for the terminal and browser consoles.

**Author: Robert Steckroth, *Bust0ut* [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**
**Licenses under: LGPL-v3**

**Bonuses:**
* Vast and deep unit tests on Windows 10 and Ubuntu 16
* Cross platform for nodejs and browser with windows or linux.
* Works with requirejs, amdefine, or without any dependencies with the same file.
* Bracket Print can serialize massive ECMA scripts (like the browser *window* property), without hiccups.
	* Is able to do semantically deep equality tests on ECMA script (not just JSON objects).
	* Removes superfluous tabs, spaces, and newlines from function strings.
	* Output can be configured to be passed into JSON.parse 
* Bracket Print has a collaborative design which sits in the root of large projects to encourage team development.
* Uses a prototypal return chain to allow for usage as functional programming callbacks.
* Contains a comprehensive level mechanism to control what is logged at run-time with a nearly total overhead discharge.
* Provides configurable syntax mapping with custom individualized styles.
* Styling can be toggled anywhere in the run-time or call chain with a total overhead discharge.

**Caveats:**
* Does not do browser unit testing



