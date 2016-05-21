var Print = require("../")

var up = new Print("Example 1").set_option({"debug": "verbose"})

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

log_1.log("This is called again after the first time sense the original text is strored in the logger instance created by the parent class.")
log_1.clear().log("The logger can have its text cleared with the clear() command.")

var logger = up.sp("Some text for example sake.")

up.log("Print also accepts itself as a logging potion other than text", logger)

up.log("The text() method will return a plain string instead of pretty logging ->", logger.text())

up.log("The contains_text property will tell us if the logger is holding anything (which can be cleared)",
  up.sp("Some text").contains_text, up.sp("Some text").clear().contains_text)

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
