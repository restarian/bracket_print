#!/usr/bin/env node
/*
  Brackit Print is a printing and logging tool for javascript engines which suppies literal ECMA Object serialization.

 Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

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

var up = Print({log_title: "Example 1", level: 2, compress_level: 1})//.et_option({use_title: false})

up.sp("The first instance of Print will store the default settings for the others.")
  .line("Here are the configurable settings:", up._mutable_options).log()

var complex_object = {a: {b: 34, __proto__: {cool: "joes", make: false}, is_null: null, is_not: undefined, b1: true, b2not: false, my_cool_one: [1,2,3, Function, Number, 5, function(cool) {
	this.var = "joes man"
}
], depth: 1, nested: {depth: 2, nested: {depth: 3, nested: {depth: 4}}}}}


up.compress_level = 4
up.denote_quoting = "'"


up.set_option({level: 1}).log("The level option is used to prioritize loging and serializations. It must be lower than the set_level of the instance. The global set_level")
	.sp("can be set with the prototype of any Print instance").log()

var log_them = function() {

	up.set_option({level: 1}).log("This is at level 1")//, complex_object)
	//up.set_option({level: 2}).log("This is at level 2", complex_object)
	//up.set_option({level: 3}).log("This is at level 3", complex_object)
}

Print.prototype.set_level = 1
log_them()
Print.prototype.set_level = 2
log_them()
Print.prototype.set_level = 3
log_them()

Print.prototype.set_level = "0-3"
log_them()
up.compress_level = 1
//Print.prototype.set_level = Infinity

up.set_option({compress_level: 4}).log("Compress the object to level", 4, complex_object)
up.set_option({compress_level: 4}).log("Compress the object to level", 4, complex_object)
up.set_option({compress_level: 3}).log("Compress the object to level", 3, complex_object)
up.denote_quoting = "\'"
up.set_option({compress_level: 2}).log("Start using double quotes and compress the object to level", 2, complex_object)
up.denote_quoting = ""
up.set_option({compress_level: 1}).log("Compress the object to level", 1, complex_object)


var circular_obj = { First: 1, Second: 2}
circular_obj.Third = circular_obj

up.log("Brackit print can also capture circular dependencies with Objects", circular_obj)

circular_obj.Fourth = "more text"
circular_obj.Fith = 5
circular_obj.Fith = 5
circular_obj.Sixth = 6
circular_obj.Seventh = 7
circular_obj.Eight = 8
circular_obj.Ninth = 9
circular_obj.Third = circular_obj
up.log(circular_obj)

// Get the default settings into this copy.
up = up.new_copy(Print())

var example_2 = up.new_copy("Example 2")
example_2.log("Example two was created with new copy and has the exact same options as example 1 but is uniquely threaded.",
  example_2._mutable_options)

var example_3 = example_2.new_copy("Example 3")
example_2.log("Example three was created with the example_2 settings constructor and passed a title as a string.",
  "It has the exact same options as example 2 but is uniquely threaded as well.", example_2._mutable_options)


var a = function(){}
a.prototype = Object.create({cool: function(){}, tmy: "good"})
a.prototype.cool.prototype = {bobo: "this"}
up.log("Prototype chains are also printed literally", new a())
var v = new String("STR_OBJECT")
v.n = 22
v.ss = true
up.log("Native Objects are represented as well", v)

up.set_option({indentation_string: "        "}).log("indentation strings can be used for visuall apppeal", complex_object)
up.set_option({indentation_string: ".."}).line(complex_object).set_option({indentation_string: "-"}).log(complex_object)

// Create an Object with six Object levels.
var a
void function(obj, cnt) {
  if ( cnt > -1 ) {
    obj.level = { "num": --cnt}
    arguments.callee(obj.level, cnt)
  }
}(a = {}, 6)

up.line("Brackit Print can also throttle the nesting level of object parsing using the depth_limit setting")
.set_option({compress_level: 4, depth_limit: 3, indentation_string: "  "}).log(a)

up.new_copy({compress_level: 2, compress_function: true}).line("Check me out serializing the Object structure of the nodejs Buffer bult-in module!", Buffer)
.log().set_option({compress_function: false, character_limit: 2000}).line("Or the entire Buffer module trucncated to 2000 characters.", Buffer).log()
/*
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

up.log("The toString() method will return a plain string instead of pretty logging ->", logger.toString())

up.line("We can also specify objects").line(complex_object).log()

up.tab("the initial separator is ignored", "like the tab at the", "beginning of this line").log()

up.line("We can also specify objects").line(complex_object).log()
up.indentation_string = ">>"
up.log("..and change the the indentation_string option").log(complex_object)

up.set_option({indentation_string: "        "}).log(complex_object)

up.compress_level = 4
up.set_option({indentation_string:  "-"})


*/
