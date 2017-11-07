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

describe("Options", function() {

	var s

	beforeEach(function() {
		s = Print("Heading one")
		Print.prototype.log_level = "" 
		s.compress_level = Infinity // Compression to the max! :)
	})

	it("create the desired prototype chain and utilize redundancy", function() {

		var up = Print({level: 1})

		expect(up.level).to.equal(Print.prototype.level)
		Print.prototype.log_level = 15
		expect(up.log_level).to.deep.equal([15, 15])

		var a = up.spawn({level: 8, enumerate_all: true, character_limit: 1332})
		var b = a.spawn({level: 12})

		expect(a.level).to.equal(8)
		expect(b.level).to.equal(12)
		expect(up.level).to.equal(1)
	})

	it("store and transfers the log_title in many ways", function() {

		expect(s.option({}).log_title).to.equal("Heading one")
		expect(s.log_title).to.equal("Heading one")
		expect(s.spawn().log_title).to.equal("Heading one")
		expect(s.spawn({}, {}).log_title).to.equal("Heading one")
		expect(s.spawn({}, {}).log_title).to.equal("Heading one")
		expect(s.spawn({}, {}, "COOL TITLE").log_title).to.equal("COOL TITLE")
		expect(s.option({log_title: "Heading two"}).log_title).to.equal("Heading two")
		expect(s.spawn({use_title_stamp: false}).log_title).to.equal("Heading one")
		expect(Print("TITLE B").spawn().spawn({}).option({}).option().log_title).to.equal("TITLE B")

	})

	it("quoting can be changed and is used properly", function() {

		expect(s.option({denote_quoting: "\'"}).s({15: 44,here: "there"}).toString()) .to.equal("{'15':44,'here':'there'}")
		expect(s.option({denote_quoting: "\""}).s({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
		expect(s.option({denote_quoting: ""}).s({1:44,here: "there"}).toString()) .to.equal("{1:44,here:there}")
		s.denote_quoting = "~"
		expect(s.option({denote_quoting: "~"}).s({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")
		s.denote_quoting = "\""
		expect(s.s({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
	})

	it("enumerate_all option has desire effect", function() {

		expect(s.empty().option({denote_quoting: "~"}).s({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")

	})
	it("max_character setting is adhered to", function() {

		var b = []
		for ( var a = 0; a < 100; a++ )
			b[Math.random()] = Math.random()

		expect(s.spawn().option({compress_level: 1, character_limit: 1742}).s(Buffer).toString().length).to.equal(1742)
		expect(s.spawn().option({compress_level: 1, character_limit: 123}).s(b).toString().length).to.equal(123)
		expect(s.spawn().option({compress_level: 2, character_limit: 101}).s(b).toString().length).to.equal(101)
		expect(s.spawn().option({compress_level: 3, character_limit: 189}).s(b).toString().length).to.equal(189)
		expect(s.spawn().option({compress_level: 4, character_limit: 8}).s(b).toString().length).to.equal(8)
		expect(s.spawn().option({compress_level: 1, character_limit: 1}).s(b).toString().length).to.equal(1)
		expect(s.spawn().option({compress_level: 2, character_limit: 1}).s(b).toString().length).to.equal(1)
		expect(s.spawn().option({compress_level: 3, character_limit: 1}).s(b).toString().length).to.equal(1)
		expect(s.spawn().option({compress_level: 4, character_limit: 1}).s(b).toString().length).to.equal(1)
	})
	it("utilize the depth_limit", function() {

		var a
		void function make(obj, cnt) {

		  if ( cnt > -1 ) {
		    obj.level = { "num": --cnt}
        for ( var x = 0; x < cnt; x+=2 ) {
		      obj["prop_"+x] = "a property"
		      obj["prop_"+(x+1)] = x*x
        }

		    make(obj.level, cnt)
		  }
		}(a = {}, 6)

		expect(s.option({depth_limit: 1}).s(a).toString())
			.to.equal('{"level":<..object with 6 properties>,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
		expect(s.option({depth_limit: 2}).s(a).toString())
			.to.equal('{"level":{"num":5,"level":<..object with 6 properties>,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
		expect(s.empty({depth_limit: 3}).s(a).toString())
			.to.equal('{"level":{"num":5,"level":{"num":4,"level":<..object with 4 properties>,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
	})
})
