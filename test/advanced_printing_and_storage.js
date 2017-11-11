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

describe("Internal storage", function() {

	var up 
	beforeEach(function() {

		print = new Print({compression: 4}).s({cool: "joes"})
	})

	it.skip("serializes the global Object in the node environment and truncated it to 1.01 megabytes", function() {

		expect(print.spawn({enumerate_all: true, compression: 3, character_limit: 101000}).s(global).toString().length).to.equal(101000)
	})

	it("serializes objects with manually added __proto__ chains", function() {

		var a = {aa: "str", bb: "joes", __proto__: {here: 22, there: 55}}
		var b = {aa: "str", bb: "joes"}//, __proto__: {here: 22, there: 55}}
		var c = {__proto__: {here: 22, there: 55}}
		var d = {__proto__: {here: 22, __proto__: {cool: "joes", yep: 6}, there: 55}}
		// Create a top-level copy of the Print library which does not store text internally untill a print command is used.
		var up = print.spawn({quote_qualifier: true})

		expect(up.s(a).toString()).to.equal('{"aa":"str","bb":"joes","__proto__":{"here":22,"there":55}}')
		expect(up.s(b).toString()).to.equal('{"aa":"str","bb":"joes"}')
		expect(up.s(c).toString()).to.equal('{"__proto__":{"here":22,"there":55}}')
		expect(up.s(d).toString()).to.equal('{"__proto__":{"here":22,"there":55,"__proto__":{"cool":"joes","yep":6}}}')
		expect(up.s({}).toString()).to.equal('{}')

	})

	it("serializes objects with manually added empty __proto__ Objects", function() {

		var up = print.spawn()

		// the __proto__ should always be last in the print.
		expect(up.toString({__proto__:{aa:4}})).to.equal('{__proto__:{aa:4}}')
		expect(up.toString({__proto__:{bob:null},cool:"joes"})).to.equal('{cool:"joes",__proto__:{bob:null}}')
		expect(up.toString({here:undefined,__proto__:{bob:null},cool:"joes"})).to.equal('{here:undefined,cool:"joes",__proto__:{bob:null}}')
		expect(up.toString({__proto__:{aa:[undefined, null, 0]},"0":[1,2,"a"]})).to.equal('{0:[1,2,"a"],__proto__:{aa:[undefined,null,0]}}')
		// Without keys in the prototype it will not be printed.
		expect(up.toString({__proto__:{}})).to.equal('{}')
		expect(up.toString({__proto__:{__proto__:{}}})).to.equal('{}')
	})

	it("serializes objects Object.prototype __proto__ chains", function() {
		
		var up = print.spawn({compression: 4})
		var F = function() {
			this.cool = "joes"
		}

		F.prototype = {
			see: function() {
				Print().log("me")
			}
		}

		expect(up.toString(new F())).to.equal('{cool:"joes",__proto__:{see:function(){Print().log("me")}}}')

		F.prototype = {
			see: function() {
				Print().log("me")
			},
			here: function() {
				Print().log("there")
			}
		}
		expect(up.empty({quote_qualifier: true}).toString(new F())).to.equal('{"cool":"joes","__proto__":{"see":function(){Print().log("me")},"here":function(){Print().log("there")}}}')
		var a = new F()
		a.more = "stuff"
		expect(up.spawn({quote_qualifier: true}).toString(a)).to.equal('{"cool":"joes","more":"stuff","__proto__":{"see":function(){Print().log("me")},"here":function(){Print().log("there")}}}')

	})
})
