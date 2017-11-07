/*Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

var chai = require("chai"),
expect = chai.expect
var Print = require("../build/bracket_print_umd.js")

describe("Functions", function() {
	var s

	beforeEach(function() {
		s = Print({compress_level: 4}).s({cool: 'joes'})
	})

	it.skip("serializes functions and function Objects", function() {

		var a = function() {
			var a = "dd"
			var b = true

		}
		var up = s.spawn()
		//expect(up.option({compress_level: 1}).toString(a)).to.equal('function () { \n\n   var a = \"dd\"\n\n\n   var b = true\n\n\n\n}')
		//expect(up.option({compress_level: 2}).toString(a)).to.equal('function () { \n\n   var a = \"dd\"\n\n   var b = true\n\n\n}')
		//expect(up.option({compress_level: 3}).toString(a)).to.equal('function () { \n\nvar a = \"dd\"\n\nvar b = true\n\n }')
		expect(up.option({compress_level: 4}).toString(a)).to.equal('function (){\t\t\tvar a = \"dd\"\n\t\t\tvar b = true}')

		expect(up.option({compress_level: 4, truncate_function: true}).toString(a)).to.equal('function (){...}')

	})

	it.skip("serializes functions within JSON like data", function() {

		var Fun = function() {
		  Print().toString("Here")

		}
		Fun.prototype = {
		  a: function() {
			 Print().log("Here is a")
		  },
		  b: function() {
			 Print().log("Here is b")
		  }
		}

		expect(s.option({compress_level: 4, truncate_function: true}).toString(new Fun())).to.equal('{__proto__:{"a":function (){...},"b":function (){...}}}')
		expect(s.option({compress_level: 4, truncate_function: true}).toString(Fun, new Fun())).to.equal('function (){...} {__proto__:{"a":function (){...},"b":function (){...}}}')
	})
})
