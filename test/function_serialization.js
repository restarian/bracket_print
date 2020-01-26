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

	describe("Serializes functions", function() {

		var requirejs, Print, up, ind = "+->"
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			Print = requirejs("bracket_print")
		})
		afterEach(cache.dump.bind(cache))


		var f1, f2, f3, f4, f5, fo1, fo2, fo3, fo4, fo5
			f1 = function(){}
			f2 = function coolJoes(abc, d,  e){}
			f3 = function coolJoes(abc,d)    {

		var d
				
			var a
				
}
			f4 = function coolJoes     ()          {
				  var a = 5;
}
			f5 = function   (abc, d,  				 e)  { 
 var a = 2;   

  var a=2
				
				
			
  }
			fo1 = {a:f1,b:null}
			fo2 = {a:f2,b:null}
			fo3 = {a:f3,b:null}
			fo4 = {a:f4,b:null}
			fo5 = {a:f5,b:null}

		it("serializes functions correctly using compression level 5", function() {

			up = Print({compression: 5, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("function(){}")
			expect(up.toString(fo1)).to.equal("{a:function(){},b:null}")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e){},b:null}")
			expect(up.toString(f2)).to.equal("function coolJoes(abc,d,e){}")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e){},b:null}")
			expect(up.toString(f3)).to.equal("function coolJoes(abc,d){var d\n\t\t\tvar a}")
			expect(up.toString(fo3)).to.equal("{a:function coolJoes(abc,d){var d\n\t\t\tvar a},b:null}")
			expect(up.toString(f4)).to.equal("function coolJoes(){var a = 5;}")
			expect(up.toString(fo4)).to.equal("{a:function coolJoes(){var a = 5;},b:null}")
			expect(up.toString(f5)).to.equal("function(abc,d,e){var a = 2;\n  var a=2}")
			expect(up.toString(fo5)).to.equal("{a:function(abc,d,e){var a = 2;\n  var a=2},b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:function(abc,d,e){...},b:null}")
		})
		it("serializes functions correctly using compression level 5 and the shift_function_body option", function() {

			up = Print({compression: 5, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("function(){}")
			expect(up.toString(fo1)).to.equal("{a:function(){},b:null}")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e){},b:null}")
			expect(up.toString(f2)).to.equal("function coolJoes(abc,d,e){}")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e){},b:null}")
			expect(up.toString(f3)).to.equal("function coolJoes(abc,d){var d\n\tvar a}")
			expect(up.toString(fo3)).to.equal("{a:function coolJoes(abc,d){var d\n\tvar a},b:null}")
			expect(up.toString({AA:fo3})).to.equal("{AA:{a:function coolJoes(abc,d){var d\n\tvar a},b:null}}")
			expect(up.toString(f4)).to.equal("function coolJoes(){var a = 5;}")
			expect(up.toString(fo4)).to.equal("{a:function coolJoes(){var a = 5;},b:null}")
			expect(up.toString(f5)).to.equal("function(abc,d,e){var a = 2;\n var a=2}")
			expect(up.toString(fo5)).to.equal("{a:function(abc,d,e){var a = 2;\n var a=2},b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:function(abc,d,e){...},b:null}")
		})
		it("serializes functions correctly using compression level 4", function() {

			up = Print({compression: 4, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("function() { }")
			expect(up.toString(fo1)).to.equal("{a:function() { },b:null}")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e) { },b:null}")
			expect(up.toString(f2)).to.equal("function coolJoes(abc,d,e) { }")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e) { },b:null}")
			expect(up.toString(f3)).to.equal("function coolJoes(abc,d) { var d\n\t\t\tvar a }")
			expect(up.toString(fo3)).to.equal("{a:function coolJoes(abc,d) { var d\n\t\t\tvar a },b:null}")
			expect(up.toString(f4)).to.equal("function coolJoes() { var a = 5; }")
			expect(up.toString(fo4)).to.equal("{a:function coolJoes() { var a = 5; },b:null}")
			expect(up.toString(f5)).to.equal("function(abc,d,e) { var a = 2;\n  var a=2 }")
			expect(up.toString(fo5)).to.equal("{a:function(abc,d,e) { var a = 2;\n  var a=2 },b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:function(abc,d,e) { ... },b:null}")
		})
		it("serializes functions correctly using compression level 4 with the shift_function_body option set", function() {

			up = Print({compression: 4, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("function() { }")
			expect(up.toString(fo1)).to.equal("{a:function() { },b:null}")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e) { },b:null}")
			expect(up.toString(f2)).to.equal("function coolJoes(abc,d,e) { }")
			expect(up.toString(fo2)).to.equal("{a:function coolJoes(abc,d,e) { },b:null}")

			expect(up.toString(f3)).to.equal("function coolJoes(abc,d) { var d\n\tvar a }")
		
			expect(up.toString(fo3)).to.equal("{a:function coolJoes(abc,d) { var d\n\tvar a },b:null}")
			expect(up.toString(f4)).to.equal("function coolJoes() { var a = 5; }")
			expect(up.toString(fo4)).to.equal("{a:function coolJoes() { var a = 5; },b:null}")
			expect(up.toString(f5)).to.equal("function(abc,d,e) { var a = 2;\n var a=2 }")
			expect(up.toString(fo5)).to.equal("{a:function(abc,d,e) { var a = 2;\n var a=2 },b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:function(abc,d,e) { ... },b:null}")
		})
		it("serializes functions correctly using compression level 3", function() {

			up = Print({title: false, compression: 3, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("function() {\n}")
			expect(up.toString(fo1)).to.equal("{a: function() {\n}, b: null}")
			expect(up.toString(fo2)).to.equal("{a: function coolJoes(abc, d, e) {\n}, b: null}")
			expect(up.toString(f2)).to.equal("function coolJoes(abc, d, e) {\n}")
			expect(up.toString(fo2)).to.equal("{a: function coolJoes(abc, d, e) {\n}, b: null}")
			expect(up.toString(f3)).to.equal("function coolJoes(abc, d) {\nvar d\n\t\t\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{a: function coolJoes(abc, d) {\nvar d\n\t\t\tvar a\n}, b: null}")
			expect(up.toString(f4)).to.equal("function coolJoes() {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{a: function coolJoes() {\nvar a = 5;\n}, b: null}")
			expect(up.toString(f5)).to.equal("function(abc, d, e) {\nvar a = 2;\n  var a=2\n}")
			expect(up.toString(fo5)).to.equal("{a: function(abc, d, e) {\nvar a = 2;\n  var a=2\n}, b: null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a: function(abc, d, e) { ... }, b: null}")
		})
		it("serializes functions correctly using compression level 3 with the shift_function_body option set", function() {

			up = Print({ compression: 3, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("function() {\n}")
			expect(up.toString(fo1)).to.equal("{a: function() {\n}, b: null}")
			expect(up.toString(fo2)).to.equal("{a: function coolJoes(abc, d, e) {\n}, b: null}")
			expect(up.toString(f2)).to.equal("function coolJoes(abc, d, e) {\n}")
			expect(up.toString(fo2)).to.equal("{a: function coolJoes(abc, d, e) {\n}, b: null}")
			expect(up.toString(f3)).to.equal("function coolJoes(abc, d) {\nvar d\n\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{a: function coolJoes(abc, d) {\nvar d\n\tvar a\n}, b: null}")
			expect(up.toString(f4)).to.equal("function coolJoes() {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{a: function coolJoes() {\nvar a = 5;\n}, b: null}")
			expect(up.toString(f5)).to.equal("function(abc, d, e) {\nvar a = 2;\n var a=2\n}")
			expect(up.toString(fo5)).to.equal("{a: function(abc, d, e) {\nvar a = 2;\n var a=2\n}, b: null}")
			expect(up.toString({AA:fo5})).to.equal("{AA: {a: function(abc, d, e) {\nvar a = 2;\n var a=2\n}, b: null}}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a: function(abc, d, e) { ... }, b: null}")
		})
		it("serializes functions correctly using compression level 2", function() {

			up = Print({title: false, compression: 2, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("function() {\n}")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: function() {\n"+ind+"}, b: null\n}")
			expect(up.toString(f2)).to.equal("function coolJoes( abc, d, e ) {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d, e ) {\n"+ind+"}, b: null\n}")
			expect(up.toString(f3)).to.equal("function coolJoes( abc, d ) {\n\t\tvar d\n\t\t\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d ) {\n\t\tvar d\n\t\t\tvar a\n"+ind+"}, b: null\n}")
			expect(up.toString(f4)).to.equal("function coolJoes() {\n\t\t\t\t  var a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: function coolJoes() {\n\t\t\t\t  var a = 5;\n"+ind+"}, b: null\n}")
			expect(up.toString(f5)).to.equal("function( abc, d, e ) {\n var a = 2;\n  var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) {\n var a = 2;\n  var a=2\n"+ind+"}, b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) { ...\n"+ind+"}, b: null\n}")
		})
		it("serializes functions correctly using compression level 2 with the shift_function_body option set", function() {

			up = Print({title: false, compression: 2, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("function() {\n}")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: function() {\n"+ind+ind+"}, b: null\n}")
			expect(up.toString(f2)).to.equal("function coolJoes( abc, d, e ) {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d, e ) {\n"+ind+ind+"}, b: null\n}")
			expect(up.toString(f3)).to.equal("function coolJoes( abc, d ) {\nvar d\n\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d ) {\n"+ind+"var d\n"+ind+"\tvar a\n"+ind+"}, b: null\n}")
			expect(up.toString(f4)).to.equal("function coolJoes() {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: function coolJoes() {\n"+ind+"var a = 5;\n"+ind+"}, b: null\n}")
			expect(up.toString(f5)).to.equal("function( abc, d, e ) {\nvar a = 2;\n var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) {\n"+ind+"var a = 2;\n"+ind+" var a=2\n"+ind+"}, b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) { ...\n"+ind+"}, b: null\n}")
		})
		it("serializes functions correctly using compression level 1", function() {

			up = Print({title: false, compression: 2, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("function() {\n}")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: function() {\n"+ind+"}, b: null\n}")
			expect(up.toString(f2)).to.equal("function coolJoes( abc, d, e ) {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d, e ) {\n"+ind+"}, b: null\n}")
			expect(up.toString(f3)).to.equal("function coolJoes( abc, d ) {\n\t\tvar d\n\t\t\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d ) {\n\t\tvar d\n\t\t\tvar a\n"+ind+"}, b: null\n}")
			expect(up.toString(f4)).to.equal("function coolJoes() {\n\t\t\t\t  var a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: function coolJoes() {\n\t\t\t\t  var a = 5;\n"+ind+"}, b: null\n}")
			expect(up.toString(f5)).to.equal("function( abc, d, e ) {\n var a = 2;\n  var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) {\n var a = 2;\n  var a=2\n"+ind+"}, b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) { ...\n"+ind+"}, b: null\n}")
		})
		it("serializes functions correctly using compression level 1 with the shift_function_body option set", function() {

			up = Print({title: false, compression: 2, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("function() {\n}")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: function() {\n"+ind+ind+"}, b: null\n}")
			expect(up.toString(f2)).to.equal("function coolJoes( abc, d, e ) {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d, e ) {\n"+ind+ind+"}, b: null\n}")
			expect(up.toString(f3)).to.equal("function coolJoes( abc, d ) {\nvar d\n\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: function coolJoes( abc, d ) {\n"+ind+"var d\n"+ind+"\tvar a\n"+ind+"}, b: null\n}")
			expect(up.toString(f4)).to.equal("function coolJoes() {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: function coolJoes() {\n"+ind+"var a = 5;\n"+ind+"}, b: null\n}")
			expect(up.toString(f5)).to.equal("function( abc, d, e ) {\nvar a = 2;\n var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) {\n"+ind+"var a = 2;\n"+ind+" var a=2\n"+ind+"}, b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: function( abc, d, e ) { ...\n"+ind+"}, b: null\n}")
		})


		it("serializes functions within prototypes with various compression levels and options", function() {

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

			expect(Print().option({compression: 4, quote_qualifier: true, truncate_function: true}).toString(new Fun()))
				.to.equal('{"__proto__":{"a":function() { ... },"b":function() { ... }}}')
			expect(Print().option({compression: 4, quote_qualifier: false, truncate_function: true}).toString(Fun, new Fun()))
				.to.equal('function() { ... } {__proto__:{a:function() { ... },b:function() { ... }}}')
	 
			expect(Print().option({compression: 4, quote_qualifier: false, truncate_function: false}).toString(Fun, new Fun()))
				.to.equal('function() { Print().toString("Here") } {__proto__:{a:function() { Print().log("Here is a") },b:function() { Print().log("Here is b") }}}')

			expect(Print().option({truncate_function: false, compression: 4, bad_option: 55, quote_qualifier: false, truncate_function: true}).toString(Fun, new Fun()))
				.to.equal('function() { ... } {__proto__:{a:function() { ... },b:function() { ... }}}')

			expect(Print().option({compression: 2, indentation_string: ind, quote_qualifier: true, truncate_function: true}).log(new Fun()).toString())
				.to.equal('{ \n+->"__proto__": { \n+->+->"a": function() { ...\n+->+->}, "b": function() { ...\n+->+->}\n+->}\n}')
		})

		it("serializes objects Object.prototype __proto__ chains", function() {
			
			var up = Print().spawn({compression: 4})
			var F = function() {
				this.cool = "joes"
			}

			F.prototype = {
				see: function() {
					Print().log("me")
				}
			}


			up.log(new F())
			expect(up.toString(new F())).to.equal('{cool:"joes",__proto__:{see:function() { Print().log("me") }}}')

			F.prototype = {
				see: function() {
					Print().log("me")
				},
				here: function() {
					Print().log("there")
				}
			}
			expect(up.empty({quote_qualifier: true}).toString(new F())).to.equal('{"cool":"joes","__proto__":{"see":function() { Print().log("me") },"here":function() { Print().log("there") }}}')
			var a = new F()
			a.more = "stuff"
			expect(up.spawn({quote_qualifier: true}).toString(a)).to.equal('{"cool":"joes","more":"stuff","__proto__":{"see":function() { Print().log("me") },"here":function() { Print().log("there") }}}')

		})
	})

})
