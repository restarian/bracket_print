var Print, browser = false
try {
	Print = require("../../bracket_print")
}
catch(e) {
	Print = this["bracket_print"]
	browser = true
}

var up = Print({shift_function_body: true, log_title: "Example 1", level: 2, compression: 1, theme: "light"}), up_html
if ( browser ) {
	document.body.style.backgroundColor = "#bdcacc"
	var ele = document.getElementById("example")
	up_html = Print({shift_function_body: true, log_title: "Example 1", level: 2, compression: 1, theme: "light", platform: "html", 
		log_output: function(str) { ele.innerHTML += str.join() + "\n" }})
}
else
	up_html = Print({style: false, title: false, log_level: 0, level: 1})


up.s("The first instance of Print will store the default settings for the others.").l("Here are the configurable settings:", Object.keys(up.list())).log()

up_html.s("The first instance of Print will store the default settings for the others.").l("Here are the configurable settings:", Object.keys(up.list())).log()

var complex_object = {a: {b: 34, __proto__: {cool: "joes", make: false}, nan: "g"*2, is_null: null, is_not: undefined, b1: true, b2not: false, my_cool_one: [1,2,3, Function, Number, 5, function(cool) {var cool = "joes"

			this.var = "joes man"

		// Added some examples
	// Some more function text here.
	
}
], depth: 1, nested: {depth: 2, nested: {depth: 3, nested: {depth: 4}}}}}


up.compression = 2
up.denote_quoting = "'"
up.shift_function_body = true

up.option({level: 1}).log("The level option is used to prioritize loging and serializations it must be within the range", 
	"log_level option of the instance")

up_html.option({level: 1}).log("The level option is used to prioritize loging and serializations it must be within the range", 
	"log_level option of the instance")

var log_them = function() {

	up.option({level: 1}).log("This is at level 1")
	up.option({level: 2}).log("This is at level 2")
	up_html.option({level: 1}).log("This is at level 1")
	up_html.option({level: 2}).log("This is at level 2")
}

Print.prototype.log_level = 1
log_them()
Print.prototype.log_level = 2
log_them()
Print.prototype.log_level = 3
log_them()

Print.prototype.log_level = "0-3"
log_them()

up.option({compression: 5}).log("Compress the object to level", 5, complex_object)
up.option({compression: 4}).log("Compress the object to level", 4, complex_object)
up.option({compression: 3}).log("Compress the object to level", 3, complex_object)
up.denote_quoting = "\'"
up.option({compression: 2}).log("Start using double quotes and compress the object to level", 2, complex_object)
up.denote_quoting = ""
up.option({compression: 1}).log("Compress the object to level", 1, complex_object)

up_html.option({compression: 5}).log("Compress the object to level", 5, complex_object)
up_html.option({compression: 4}).log("Compress the object to level", 4, complex_object)
up_html.option({compression: 3}).log("Compress the object to level", 3, complex_object)
up_html.denote_quoting = "\'"
up_html.option({compression: 2}).log("Start using double quotes and compress the object to level", 2, complex_object)
up_html.denote_quoting = ""
up_html.option({compression: 1}).log("Compress the object to level", 1, complex_object)


var old_tab = Print().style_map[Print().platform].denote_tab
var old_line = Print().style_map[Print().platform].denote_line
var old_html_tab = Print().style_map["html"].denote_tab
var old_html_line = Print().style_map["html"].denote_line

Print().style_map[Print().platform].denote_tab = "-tab-"
Print.prototype.style_map[Print().platform].denote_line = "\n-newline-\n"
Print().style_map["html"].denote_tab = "-tab-"
Print.prototype.style_map["html"].denote_line = "<br>-newline-<br>"

up.option({compression: 5}).log("Compress the object to level", 5, complex_object)
up.option({compression: 4}).log("Compress the object to level", 4, complex_object)
up.option({compression: 3}).log("Compress the object to level", 3, complex_object)
up.denote_quoting = "\'"
up.option({compression: 2}).log("Start using double quotes and compress the object to level", 2, complex_object)
up.denote_quoting = ""
up.option({compression: 1}).log("Compress the object to level", 1, complex_object)

up_html.option({compression: 5}).log("Compress the object to level", 5, complex_object)
up_html.option({compression: 4}).log("Compress the object to level", 4, complex_object)
up_html.option({compression: 3}).log("Compress the object to level", 3, complex_object)
up_html.denote_quoting = "\'"
up_html.option({compression: 2}).log("Start using double quotes and compress the object to level", 2, complex_object)
up_html.denote_quoting = ""
up_html.option({compression: 1}).log("Compress the object to level", 1, complex_object)

Print().style_map[Print().platform].denote_tab = old_tab
Print.prototype.style_map[Print().platform].denote_line = old_line
Print().style_map["html"].denote_tab = old_html_tab
Print.prototype.style_map["html"].denote_line = old_html_line

var circular_obj = { First: 1, Second: 2}
circular_obj.Third = circular_obj

up.log("Bracket print can also capture circular dependencies with Objects", circular_obj)

circular_obj.Fourth = "more text"
circular_obj.Fith = 5
circular_obj.Fith = 5
circular_obj.Sixth = 6
circular_obj.Seventh = 7
circular_obj.Eight = 8
circular_obj.Ninth = 9
circular_obj.Third = circular_obj
up.log(circular_obj)
up_html.log(circular_obj)

// Get the default settings into this copy.
up = up.spawn(Print())

var a = function(){}
a.prototype = Object.create({cool: function(){}, tmy: "good"})
a.prototype.cool.prototype = {bobo: "this"}
up.log("Prototype chains are also printed literally", new a())
up_html.log("Prototype chains are also printed literally", new a())
var v = new String("STR_OBJECT")
v.n = 22
v.ss = true
up.log("Native Objects are represented as well", v)
up_html.log("Native Objects are represented as well", v)

up.option({indentation_string: "        ", shift_function_body: true}).log("indentation strings can be used for visual apppeal", complex_object)
up.option({indentation_string: "..", shift_function_body: true}).line(complex_object).option({indentation_string: "-"}).log(complex_object)

up_html.option({indentation_string: "        ", shift_function_body: true}).log("indentation strings can be used for visual apppeal", complex_object)
up_html.option({indentation_string: "..", shift_function_body: true}).line(complex_object).option({indentation_string: "-"}).log(complex_object)

// Create an Object with six Object levels.
var a
void function(obj, cnt) {
  if ( cnt > -1 ) {
    obj.level = { "num": --cnt}
    arguments.callee(obj.level, cnt)
  }
}(a = {}, 6)

up.line("Bracket Print can also throttle the nesting level of object parsing using the depth_limit setting")
.option({compression: 4, depth_limit: 3, indentation_string: "  "}).log(a)

up_html.line("Bracket Print can also throttle the nesting level of object parsing using the depth_limit setting")
.option({compression: 4, depth_limit: 3, indentation_string: "  "}).log(a)

var b = typeof Buffer !== "undefined" && Buffer || new Float32Array().buffer
up.spawn({compression: 1, truncate_function: true}).line("Check me out serializing the Object structure of the nodejs Buffer bult-in module!", b)
.log().option({truncate_function: false, shift_function_body: true, character_limit: 2000}).empty().line("Or the entire Buffer module trucncated to 2000 characters.", b).log()

up.spawn({compression: 1, truncate_function: true}).line("Or without chainging the function body indentation using shift_function body.", b)
.log().option({truncate_function: false, character_limit: 2000, shift_function_body: true}).empty().line("Or the entire Buffer module trucncated to 2000 characters.", b).log()

up_html.spawn({compression: 1, truncate_function: true}).line("Check me out serializing the Object structure of the nodejs Buffer bult-in module!", b)
.log().option({truncate_function: false, shift_function_body: true, character_limit: 2000}).empty().line("Or the entire Buffer module trucncated to 2000 characters.", b).log()

up_html.spawn({compression: 1, truncate_function: true}).line("Or without chainging the function body indentation using shift_function body.", b)
.log().option({truncate_function: false, character_limit: 2000, shift_function_body: true}).empty().line("Or the entire Buffer module trucncated to 2000 characters.", b).log()

up.log("Calling log with multiple arguments", "will use the", "last known",
  "separator (a space is the default).")
var cont = up.line("Adding lines is easy now").log("These use the last known", "separator (a line now)")
cont.log("We can continue form any point including..", "..log() call.")

// A new copy of the logger is created every time a logging command is called form the base class.
var log_1 = up.s("Instance one of the logger.")
var log_2 = up.s("Instance two of the logger.")
log_1.log()
log_2.log()

log_1.log("This is called again after the frst time sense the original text is strored in the logger instance created by the parent class.")
log_1.empty().log("The logger can have its text emptyed with the empty() command.")

var logger = up.s("Some text for example sake.")

up.log("Print also accepts itself as a logging potion other than text", logger)

up.log("The toString() method will return a plain string instead of pretty logging ->", logger.toString())

up.line("We can also specify objects").line(complex_object).log()

up.tab("the initial separator is ignored", "like the tab at the", "beginning of this line").log()

up.line("We can also specify objects").line(complex_object).log()
up.indentation_string = ">>"
up.log("..and change the the indentation_string option").log(complex_object)

up.option({indentation_string: "        "}).log(complex_object)

up.compression = 4
up.option({indentation_string:  "-"})

