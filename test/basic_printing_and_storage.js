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
			Print = requirejs("bracket_print")//({compression: 4, level: 1})
			s = requirejs("bracket_print")({compression: 4, level: 1}).s({cool: "joes"})
		})
		afterEach(cache.dump.bind(cache))


		it("serializes the ECMA Object types while also using toString correctly", function() {

			s = s.option({quote_qualifier: true, denote_quoting: "^^"})
			expect(s.toString(true, {cool: "joes"})).to.equal('{cool:"joes"} true {^^cool^^:^^joes^^}')
			expect(s.spawn().toString(0)).to.equal('0')
			expect(s.spawn().toString(-0)).to.equal('0')
			expect(s.toString(1)).to.equal('{cool:"joes"} true {^^cool^^:^^joes^^} 1')
			expect(s.empty().toString(-99)).to.equal('-99')
			expect(s.spawn().toString(null)).to.equal('null')
			expect(s.spawn().toString(undefined)).to.equal('undefined')
			expect(s.spawn().toString(5*"f")).to.equal('NaN')
		})

		it("serializes the ECMA arguments object", function() {

			void function() {
				expect(s.empty({quote_qualifier: true}).toString(arguments)).to.to.equal('{"0":null,"1":1,"2":true,"3":"A string","4":"","5":undefined}')
				expect(s.empty().spawn({quote_qualifier: false}).toString(arguments)).equal('{0:null,1:1,2:true,3:"A string",4:"",5:undefined}')
				expect(s.spawn({quote_qualifier: false, denote_quoting: ""}).toString(arguments)).to.equal('{0:null,1:1,2:true,3:A string,4:,5:undefined}')
			}(null, 1,true, "A string", "", undefined)
		})

		it("serializes Error instances and Objects", function() {

			expect(s.empty().toString(new Error("Cool error"))).to.include("Cool error")
			expect(s.empty().toString(new Error("more error"))).to.include(__filename)
		})

		it("serializes native ECMA Objects", function() {

			s.shift_function_body = false
			expect(s.empty().option({compression: 4}).s(Function).toString()).to.equal('function Function() { [native code] }')
			expect(s.empty().option({compression: 3}).s(Number).toString()).to.equal('function Number() {\n[native code]\n}')
			expect(s.empty().option({compression: 2}).s(String).toString()).to.equal('function String() {\n [native code]\n}')
			//expect(s.empty().option({compression: 2}).s(RegExp).toString()).to.equal('function RegExp() {\n[native code]\n}')

			expect(s.empty().option({compression: 4}).toString(Object).toString()).to.equal('function Object() { [native code] }')
			expect(s.empty().option({compression: 3}).s(Object).toString()).to.equal('function Object() {\n[native code]\n}')
			expect(s.empty().option({compression: 2}).s(Object).toString()).to.equal('function Object() {\n [native code]\n}')
			expect(s.empty().option({compression: 1}).toString(Object).toString()).to.equal('function Object() {\n [native code]\n}')

			expect(s.empty().s(Buffer("Bracket")).toString()).to.equal('Bracket')
			expect(s.empty().option({truncate_function: true}).s(Buffer("Bracket")).toString()).to.equal('Bracket')
		})

		it("serializes objects with odd property qualifiers", function() {

			expect(s.toString()).to.equal('{cool:"joes"}')
			// TODO: add comma before an Object if the last print command was to serialize.
			expect(s.option({quote_qualifier: true}).s({undefined: undefined, null: null, a: "f"*2}).toString())
				.to.equal('{cool:"joes"} {"undefined":undefined,"null":null,"a":NaN}')
		})

		it("serializes primitve Objects", function() {
			s.empty()
			expect(s.spawn({compression: 4}).toString(new Number(43))).to.equal('{PRIMITIVE VALUE>43}')
			expect(s.spawn({compression: 4, quote_qualifier: false }).toString(new String("B"))).to.equal('{PRIMITIVE VALUE>"B",0:"B",length:1}')
			expect(s.spawn({compression: 4, quote_qualifier: true}).toString(new String("B"))).to.equal('{PRIMITIVE VALUE>"B","0":"B","length":1}')
			expect(s.spawn({compression: 4}).toString(new Boolean("BOB"))).to.equal('{PRIMITIVE VALUE>true}')
			expect(s.spawn({compression: 4}).toString(new Boolean(0))).to.equal('{PRIMITIVE VALUE>false}')
			expect(s.spawn({compression: 4}).toString(new Number("33"))).to.equal('{PRIMITIVE VALUE>33}')
			expect(s.spawn({compression: 4}).toString(new Number())).to.equal('{PRIMITIVE VALUE>0}')
			expect(s.spawn({compression: 4, quote_qualifier: true}).toString(new Object("dd"))).to.equal('{PRIMITIVE VALUE>"dd","0":"d","1":"d","length":2}')
			expect(s.spawn({compression: 4}).toString(new Object({"aa": 4}))).to.equal('{aa:4}')
			expect(s.spawn({compression: 4}).toString(new Object())).to.equal('{}')
			expect(s.spawn({compression: 4}).toString(new Object(undefined))).to.equal('{}')
			expect(s.spawn({compression: 4}).toString(new Object(null))).to.equal('{}')
		})

		it("serializes primitve Objects with added properties", function() {

			var obj = new Number()
			obj.one = 1
			var obj_a = new Object("aa")
			obj_a.prop_a = true
			expect(Print().option({compression: 4}).toString(obj)).to.equal('{PRIMITIVE VALUE>0,one:1}')
			expect(Print().option({compression: 4, quote_qualifier: true}).toString(obj_a))
					.to.equal('{PRIMITIVE VALUE>"aa","0":"a","1":"a","prop_a":true,"length":2}')
		})

		it("clears stored text data with the empty() command", function() {

			s.empty()
			expect(s.s("Bracket Print").toString()).to.equal("Bracket Print")
			s.empty()
			expect(s.s("Bracket Print").toString()).to.equal("Bracket Print")
			expect(s.s("Go!").toString()).to.equal("Bracket Print Go!")
			expect(s.empty().s("Fub").toString()).to.equal("Fub")
			expect(s.empty().toString()).to.equal("")
		})
	})
})
