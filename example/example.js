/*
  Brackit Print is a network managager with an asynchronous and structured design.

 Copyright (C) 2016  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 This file is a part of Brackit Print

 Brackit Print is free software: you can redistribute it and/or modify
 it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Brackit DMZ is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/// Author: Robert Edward Steckroth II <RobertSteckroth@gmail.com>

var Print = require("../")

var up = new Print("Example 1").set_option({"debug": "verbose", use_title: false})
var complex_object = {a: {b: 34, cc: 3213}, wa: 32}
up.compress_level = 4
up.quoting = "single"
up.indentation_string = ">"
up.log(complex_object)
up.compress_level = 2

up.line(" "," ").sp("..and compress the object").log("to level", up.compress_level, complex_object)
up.line().line().sp("..and compress the object").set_option({compress_level: 3}).log("to level", 3, complex_object)
up.quoting = "double"
up.line(" "," ").sp("..and compress the object").set_option({compress_level: 2}).log("to level", 2, complex_object)
up.quoting = "none"
up.line(" "," ").sp("..and compress the object").set_option({compress_level: 1}).log("to level", 1, complex_object)

up.sp("The first instance of Print will store the default settings for the others.")
  .line("Here are the configurable settings:", up.mutable_options()).log()

up.log("Calling log with multiple arguments", "will use the", "last known",
  "separator (a space is the default).")

var cont = up.line("Adding lines is easy now").log("These use the last known", "separator (a line now)")
cont.log("We can continue form any point including..", "..log() call.")

// A new copy of the logger is created every time a logging command is called form the base class.
var log_1 = up.sp("Instance one of the logger.")
var log_2 = up.sp("Instance two of the logger.")
log_1.log()
log_2.log()

log_1.log("This is called again after the frst time sense the original text is strored in the logger instance created by the parent class.")
log_1.clear().log("The logger can have its text cleared with the clear() command.")

var logger = up.sp("Some text for example sake.")

up.log("Print also accepts itself as a logging potion other than text", logger)

up.log("The text() method will return a plain string instead of pretty logging ->", logger.toString())

up.line("We can also specify objects").line(complex_object).log()

up.tab("the initial separator is ignored", "like the tab at the", "beginning of this line").log()

var complex_object = {"Test Object": [1,2,3,4,"Test String", {"obj in array": {test_array: ["deep", false, 234]}}]}

up.line("We can also specify objects").line(complex_object).log()
up.indentation_string = ">>"
up.log("..and change the the indentation_string option").log(complex_object)

up.set_option({indentation_string: "        "}).log(complex_object)

up.compress_level = 4
up.set_option({indentation_string:  "-"})

up.line(" "," ").sp("..and compress the object").log("to level", up.compress_level, complex_object)
up.line().line().sp("..and compress the object").set_option({compress_level: 3}).log("to level", 3, complex_object)
up.line(" "," ").sp("..and compress the object").set_option({compress_level: 2}).log("to level", 2, complex_object)
up.line(" "," ").sp("..and compress the object").set_option({compress_level: 1}).log("to level", 1, complex_object)

var example_2 = up.new_copy("Example 2")
example_2.log("Example two was created with new copy and has the exact same options as example 1 but is uniquely threaded.",
  example_2.mutable_options())

var example_3 = new Print(example_2, "Example 3")
example_2.log("Example three was created with the Print constructor and passed a title as a string.",
  "It has the exact same options as example 2 but is uniquely threaded as well.", example_2.mutable_options())
