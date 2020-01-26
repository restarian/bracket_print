/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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

	describe("Internal storage", function() {


		var requirejs, Print, up, ind = "+->"
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			Print = requirejs("bracket_print")({compression: 4, level: 1}).s({cool: "joes"})
		})
		afterEach(cache.dump.bind(cache))

		it("serializes the global Object in the node environment and truncated it to 1.01 megabytes", function() {

			expect(Print.spawn({enumerate_all: true, compression: 3, character_limit: 101000}).s(global).toString().length).to.equal(101000)
		})

		it("serializes objects with manually added __proto__ chains", function() {

			var a = {aa: "str", bb: "joes", __proto__: {here: 22, there: 55}}
			var b = {aa: "str", bb: "joes"}//, __proto__: {here: 22, there: 55}}
			var c = {__proto__: {here: 22, there: 55}}
			var d = {__proto__: {here: 22, __proto__: {cool: "joes", yep: 6}, there: 55}}
			// Create a top-level copy of the Print library which does not store text internally untill a Print command is used.
			var up = Print.spawn({quote_qualifier: true})

			expect(up.s(a).toString()).to.equal('{"aa":"str","bb":"joes","__proto__":{"here":22,"there":55}}')
			expect(up.s(b).toString()).to.equal('{"aa":"str","bb":"joes"}')
			expect(up.s(c).toString()).to.equal('{"__proto__":{"here":22,"there":55}}')
			expect(up.s(d).toString()).to.equal('{"__proto__":{"here":22,"there":55,"__proto__":{"cool":"joes","yep":6}}}')
			expect(up.s({}).toString()).to.equal('{}')

		})

		it("serializes objects with manually added empty __proto__ Objects", function() {

			var up = Print.spawn()

			// the __proto__ should always be last in the Print.
			expect(up.toString({__proto__:{aa:4}})).to.equal('{__proto__:{aa:4}}')
			expect(up.toString({__proto__:{bob:null},cool:"joes"})).to.equal('{cool:"joes",__proto__:{bob:null}}')
			expect(up.toString({here:undefined,__proto__:{bob:null},cool:"joes"})).to.equal('{here:undefined,cool:"joes",__proto__:{bob:null}}')
			expect(up.toString({__proto__:{aa:[undefined, null, 0]},"0":[1,2,"a"]})).to.equal('{0:[1,2,"a"],__proto__:{aa:[undefined,null,0]}}')
			// Without keys in the prototype it will not be Printed.
			expect(up.toString({__proto__:{}})).to.equal('{}')
			expect(up.toString({__proto__:{__proto__:{}}})).to.equal('{}')
		})
	})
})
