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
	intercept = require("intercept-stdout"),
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

	describe("the options mechanism", function() {

		it("works with the prototype as default options in the expected way", function() {
			cache.start()

			var Print = require("bracket_print")
			expect(Print.prototype.log_level).to.deep.equal([-Infinity, Infinity])	

			var up = Print({title: false}).spawn()
			expect(up.log_level).to.deep.equal([-Infinity, Infinity])	
			expect(Print.prototype.log_level).to.deep.equal([-Infinity, Infinity])	
			Print.prototype.log_level = 0
			expect(up.log_level).to.deep.equal([-Infinity, Infinity])
			up.clear("log_level")
			expect(up.log_level).to.deep.equal([0, 0])
			Print.prototype.log_level = "1"
			expect(up.log_level).to.deep.equal([1, 1])
			cache.dump()
		})
		
		var s, Print
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			Print = require("bracket_print")
			s = Print("Heading one")
			Print.prototype.log_level = "" 
			s.compression = 4
			s.quote_qualifier = true 
		})
		afterEach(cache.dump.bind(cache))

		;([true, false]).forEach(function(value) {

			it("setting Print prototype value to "+value, function() {
				Print.prototype.style = value 
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

			it("the log_title, log_title_stamp and auto_hyphen_title options operate together as expected", function() {
			
				expect(s.option({}).title_stamp).to.be.a("function")

				var captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				s.option({log_title: "cool", title_stamp: false}).log()
				expect(captured_text).to.include("[cool]")
				unhook_intercept()

				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				s.option({log_title: "cool", title_stamp: "joes"}).log()
				unhook_intercept()
				expect(captured_text).to.include("[cool - joes]")
					
				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				s.option({log_title: "cool", title_stamp: function() { return "here"}}).log()
				unhook_intercept()
				expect(captured_text).to.include("[cool - here]")

				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				s.option({log_title: "", title_stamp: function() { return "here"}}).log()
				unhook_intercept()
				expect(captured_text).to.include("[here]")

				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				s.option({title: false, log_title: "cool", title_stamp: function() { return "here"}}).log()
				unhook_intercept()
				expect(captured_text).to.include((s.currentTheme.open_with||"") + (s.currentTheme.close_with||""))

				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				var a = s.option({title: true, log_title: "cool", title_stamp: function() { return ""}}).log()
				unhook_intercept()
				expect(captured_text).to.include("[cool]")
				expect(captured_text).to.include(a._title())

				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				a = s.option({title: true, log_title: "", title_stamp: function() { return ""}}).log()
				unhook_intercept()
				expect(captured_text).to.include("[]")
				expect(captured_text).to.include(a._title())
				
				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				a = s.option({auto_hyphen_title: false, log_title: "cool", title_stamp: "joes"}).log()
				unhook_intercept()
				expect(captured_text).to.include("[cooljoes]")
				expect(captured_text).to.include(a._title())
					
				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				a = s.option({auto_hyphen_title: false, log_title: "cool", title_stamp: function() { return "here"}}).log()
				unhook_intercept()
				expect(captured_text).to.include("[coolhere]")
				expect(captured_text).to.include(a._title())

				captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				a = s.option({auto_hyphen_title: false, log_title: "", title_stamp: function() { return "here"}}).log()
				unhook_intercept()
				expect(captured_text).to.include("[here]")
				expect(captured_text).to.include(a._title())
			})
			
			it("store and transfers the log_title in many ways", function() {

				expect(s.option({}).log_title).to.equal("Heading one")
				expect(s.log_title).to.equal("Heading one")
				expect(s.spawn().log_title).to.equal("Heading one")
				expect(s.spawn({}, {}).log_title).to.equal("Heading one")
				expect(s.spawn({}, {}).log_title).to.equal("Heading one")
				expect(s.spawn({}, {}, "COOL TITLE").log_title).to.equal("COOL TITLE")
				expect(s.option({log_title: "Heading two"}, {log_title: "SPLIB"}).log_title).to.equal("SPLIB")
				expect(s.option({log_title: "Heading two"}, {log_title: "SPLIB"}, s).log_title).to.equal(s.log_title)
				expect(s.option("ME", {log_title: "Heading two"}, {log_title: "nope"}).log_title).to.equal("ME")
				expect(s.option("ME", {log_title: "Heading two"}, "HERE").log_title).to.equal("HERE")
				expect(s.spawn({title_stamp: false}).log_title).to.equal("Heading one")
				expect(Print("TITLE B").spawn().spawn({}).option({}).option().log_title).to.equal("TITLE B")
				expect(Print("Cool", {log_title: "Heading two"}).log_title).to.equal("Cool")
				expect(Print("Cool", {log_title: "Heading two"}, "Joe", {log_title: "nope"}, s).log_title).to.equal("Joe")

			})
			it("The log_level property is parsed and assigned the proper value", function() {
				
				var p = Print(s)	

				expect(p.spawn({log_level: "all"}).log_level).to.deep.equal([-Infinity, Infinity])

				s.log_level = "0"
				expect(s.log_level).to.deep.equal([0,0])
				expect(s.option({log_level: "0"}).log_level).to.deep.equal([0,0])
				
			})
			it("The log_output property errors if a non-function is passed in", function() {
				var captured_text = "", unhook_intercept = intercept(function(txt) { captured_text += txt })
				var p = Print(s, {log_output: null}).log_false("cool")
				expect(captured_text).to.include("The value set to log_option is not of the type function")
				unhook_intercept()
				expect(p).to.be.false
			})
			it("The log_output property is accepted and used appropriately", function() {

				var p = Print(s, {style: false, title: false})	
				var text = ""
				var output = function(str) {
					text += str.join()
				}

				expect(p.spawn({}).log_output).to.be.a("function").that.not.deep.equals(output)
				expect(p.spawn({log_output: output}).s("cool").log_undefined()).to.be.undefined
				expect(text).to.equal("cool")
				expect(p.spawn({log_output: output}).log_true("joes")).to.be.true
				expect(text).to.equal("cooljoes")


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

				expect(s.spawn().option({compression: 1, character_limit: 1742}).s(Buffer).toString().length).to.equal(1742)
				expect(s.spawn().option({compression: 1, character_limit: 123}).s(b).toString().length).to.equal(123)
				expect(s.spawn().option({compression: 2, character_limit: 101}).s(b).toString().length).to.equal(101)
				expect(s.spawn().option({compression: 3, character_limit: 189}).s(b).toString().length).to.equal(189)
				expect(s.spawn().option({compression: 4, character_limit: 8}).s(b).toString().length).to.equal(8)
				expect(s.spawn().option({compression: 1, character_limit: 1}).s(b).toString().length).to.equal(1)
				expect(s.spawn().option({compression: 2, character_limit: 1}).s(b).toString().length).to.equal(1)
				expect(s.spawn().option({compression: 3, character_limit: 1}).s(b).toString().length).to.equal(1)
				expect(s.spawn().option({compression: 4, character_limit: 1}).s(b).toString().length).to.equal(1)
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
					.to.equal('{"level":OBJECT WITH 6 PROPERTIES,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
				expect(s.option({depth_limit: 2}).s(a).toString())
					.to.equal('{"level":{"num":5,"level":OBJECT WITH 6 PROPERTIES,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
				expect(s.empty({depth_limit: 3}).s(a).toString())
					.to.equal('{"level":{"num":5,"level":{"num":4,"level":OBJECT WITH 4 PROPERTIES,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
			})
		})
	})
})

