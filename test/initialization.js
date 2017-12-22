/*Bracket Print resides under the LGPL v3

  Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2018 Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Bracket print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

var chai = require("chai"),
expect = chai.expect,
path = require("path")

module.paths.unshift(path.join(__dirname, "/..", "/.."))
var Print = require("bracket_print")

describe("Constructor", function() {

	var s
	beforeEach(function() {

		s = Print()
	})

	it("makes an instance of itself", function() {

		expect(s).to.be.an.instanceof(Print)
	})
	it("makes an instance of itself after command calls", function() {

		expect(s.s()).to.be.an.instanceof(Print)
		expect(s.add()).to.be.an.instanceof(Print)
		expect(s.line()).to.be.an.instanceof(Print)
		expect(s.tab()).to.be.an.instanceof(Print)
		expect(s.t()).to.be.an.instanceof(Print)
		expect(s.line().s()).to.be.an.instanceof(Print)
		expect(s.line().tab().s().line().space()).to.be.an.instanceof(Print)
		expect(s.l().tab().s().line().space()).to.be.an.instanceof(Print)
		expect(s.option({})).to.be.an.instanceof(Print)
		expect(s.option({}).spawn()).to.be.an.instanceof(Print)
		expect(s.option({}).spawn().s()).to.be.an.instanceof(Print)
		expect(s.option({}).spawn().line().s().line().spawn()).to.be.an.instanceof(Print)
		expect(s.spawn().spawn().spawn()).to.be.an.instanceof(Print)
		expect(s.log()).to.be.an.instanceof(Print)
	})

	it("makes a new instances of itself when chained to a rooted Print object", function() {

		var up = Print({})
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.s("Cool").toString()).to.equal("Cool")
		expect(up.s("Cool").toString()).to.equal("Cool")
		expect(up.s("Cool").log().toString()).to.equal("Cool")
		expect(up.s("Cool").log().toString()).to.equal("Cool")
		expect(up.log().toString().toString()).to.equal("")
		expect(up.s().toString().toString()).to.equal("")

		var up = Print(up, {log_title: "Not me"}, "But me")
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.s("Cool").toString()).to.equal("Cool")
		expect(up.s("Cool").toString()).to.equal("Cool")
		expect(up.s("Cool").log().toString()).to.equal("Cool")
		expect(up.s("Cool").log().toString()).to.equal("Cool")
		expect(up.log().toString().toString()).to.equal("")
		expect(up.s().toString().toString()).to.equal("")

		expect(up.s().log().log_title.toString()).to.equal("But me")
	})
})
