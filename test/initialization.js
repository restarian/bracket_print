/* Bracket Print resides under the LGPL v3

 Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

 Bracket Print is a Printing and logging tool for javascript engines which supplies literal ECMA serialization.

 this file is a part of Bracket Print

Bracket Print is free software: you can redistribute it and/or modify it under the terms of the 
GNU LESSER GENERAL PUBLIC LICENSE as published by the Free Software Foundation, either version 3 
of the License, or (at your option) any later version.

Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  
If not, see <http://www.gnu.org/licenses/>. */

var expect = require("chai").expect,
	path = require("path"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

module.paths.unshift(path.join(__dirname, "..", ".."))
var cache = utils.cacheManager(require)
var it_will = global
global.module = module

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("Checking for dependencies..", function() { 

		it("r_js in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true; } catch(e) { return e; }})()).to.be.true 
			it_will.stop = false 
			done()
		})

	})


	describe("the constructor", function() {

		var requirejs, Print, up, s
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			Print = require("bracket_print")
			s = Print()
		})
		afterEach(cache.dump.bind(cache))

		it("makes an instance of itself", function() {

			expect(s).to.be.an.instanceof(Print)
			expect(s).to.be.an.instanceof(Print().parent)
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

			expect(s.s()).to.be.an.instanceof(Print().parent)
			expect(s.add()).to.be.an.instanceof(Print().parent)
			expect(s.line()).to.be.an.instanceof(Print().parent)
			expect(s.tab()).to.be.an.instanceof(Print().parent)
			expect(s.t()).to.be.an.instanceof(Print().parent)
			expect(s.line().s()).to.be.an.instanceof(Print().parent)
			expect(s.line().tab().s().line().space()).to.be.an.instanceof(Print().parent)
			expect(s.l().tab().s().line().space()).to.be.an.instanceof(Print().parent)
			expect(s.option({})).to.be.an.instanceof(Print().parent)
			expect(s.option({}).spawn()).to.be.an.instanceof(Print().parent)
			expect(s.option({}).spawn().s()).to.be.an.instanceof(Print().parent)
			expect(s.option({}).spawn().line().s().line().spawn()).to.be.an.instanceof(Print().parent)
			expect(s.spawn().spawn().spawn()).to.be.an.instanceof(Print().parent)
			expect(s.log()).to.be.an.instanceof(Print().parent)
		})

		it("makes a new instances of itself when chained to a rooted print object", function() {

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

			expect(up.s().log().log_title).to.equal("But me")
		})
	})
})
