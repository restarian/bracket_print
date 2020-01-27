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


		var f1, f2, f3, f4, f5, f6, f7, f8, fo1, fo2, fo3, fo4, fo5
			f1 = ()=>({})
			f2 = (abc, d,  e)=>{}
			f3 = (abc,d) 	=>

		{

		var d
				
			var a
				
}
			f4 = 		()          =>{
				  var a = 5;
}
			f5 = (abc, d,  				 e)  => { 
 var a = 2;   

  var a=2
				
				
			
  }

f6 = { bob(a,	b,c) {} }
f7 = { bob(a,b, c	 ){var a}	 }
f8 = { bob(	 ){ 


	 var a
	   var a


} }

			fo1 = {a:f1,b:null}
			fo2 = {a:f2,b:null}
			fo3 = {a:f3,b:null}
			fo4 = {a:f4,b:null}
			fo5 = {a:f5,b:null}

		it("serializes functions correctly using compression level 5", function() {

			up = Print({compression: 5, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("()=>({})")
			expect(up.option({truncate_function: true}).toString(f1)).to.equal("()=>({})")
			expect(up.toString(fo1)).to.equal("{a:()=>({}),b:null}")
			expect(up.toString(f2)).to.equal("(abc,d,e)=>{}")
			expect(up.toString(fo2)).to.equal("{a:(abc,d,e)=>{},b:null}")
			expect(up.toString(f3)).to.equal("(abc,d)=>{var d\n\n\t\t\tvar a}")
			expect(up.option({truncate_function: true}).toString(f3)).to.equal("(abc,d)=>{...}")
			expect(up.toString(fo3)).to.equal("{a:(abc,d)=>{var d\n\n\t\t\tvar a},b:null}")
			expect(up.toString(f4)).to.equal("()=>{var a = 5;}")
			expect(up.toString(fo4)).to.equal("{a:()=>{var a = 5;},b:null}")
			expect(up.toString(f5)).to.equal("(abc,d,e)=>{var a = 2;\n\n  var a=2}")
			expect(up.toString(fo5)).to.equal("{a:(abc,d,e)=>{var a = 2;\n\n  var a=2},b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:(abc,d,e)=>{...},b:null}")

			up = Print({compression: 5, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f6)).to.equal("{bob:bob(a,b,c){}}")
			expect(up.toString(f7)).to.equal("{bob:bob(a,b,c){var a}}")
			expect(up.toString(f8)).to.equal("{bob:bob(){var a\n\t   var a}}")
		})
		it("serializes functions correctly using compression level 5 and the shift_function_body option", function() {

			up = Print({compression: 5, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("()=>({})")
			expect(up.toString(fo1)).to.equal("{a:()=>({}),b:null}")
			expect(up.toString(fo2)).to.equal("{a:(abc,d,e)=>{},b:null}")
			expect(up.toString(f2)).to.equal("(abc,d,e)=>{}")
			expect(up.toString(fo2)).to.equal("{a:(abc,d,e)=>{},b:null}")
			expect(up.toString(f3)).to.equal("(abc,d)=>{var d\n\n\tvar a}")
			expect(up.toString(fo3)).to.equal("{a:(abc,d)=>{var d\n\n\tvar a},b:null}")
			expect(up.toString({AA:fo3})).to.equal("{AA:{a:(abc,d)=>{var d\n\n\tvar a},b:null}}")
			expect(up.toString(f4)).to.equal("()=>{var a = 5;}")
			expect(up.toString(fo4)).to.equal("{a:()=>{var a = 5;},b:null}")
			expect(up.toString(f5)).to.equal("(abc,d,e)=>{var a = 2;\n\n var a=2}")
			expect(up.toString(fo5)).to.equal("{a:(abc,d,e)=>{var a = 2;\n\n var a=2},b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:(abc,d,e)=>{...},b:null}")

			up = Print({compression: 5, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f6)).to.equal("{bob:bob(a,b,c){}}")
			expect(up.toString(f7)).to.equal("{bob:bob(a,b,c){var a}}")
			expect(up.toString(f8)).to.equal("{bob:bob(){var a\n  var a}}")
		})
		it("serializes functions correctly using compression level 4 with the shift_function_body option set", function() {

			up = Print({compression: 4, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("() => ({})")
			expect(up.toString(fo1)).to.equal("{a:() => ({}),b:null}")
			expect(up.toString(fo2)).to.equal("{a:(abc,d,e) => { },b:null}")
			expect(up.toString(f2)).to.equal("(abc,d,e) => { }")
			expect(up.toString(fo2)).to.equal("{a:(abc,d,e) => { },b:null}")
			expect(up.toString(f3)).to.equal("(abc,d) => { var d\n\n\tvar a }")
			expect(up.toString(fo3)).to.equal("{a:(abc,d) => { var d\n\n\tvar a },b:null}")
			expect(up.toString({AA:fo3})).to.equal("{AA:{a:(abc,d) => { var d\n\n\tvar a },b:null}}")
			expect(up.toString(f4)).to.equal("() => { var a = 5; }")
			expect(up.toString(fo4)).to.equal("{a:() => { var a = 5; },b:null}")
			expect(up.toString(f5)).to.equal("(abc,d,e) => { var a = 2;\n\n var a=2 }")
			expect(up.toString(fo5)).to.equal("{a:(abc,d,e) => { var a = 2;\n\n var a=2 },b:null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a:(abc,d,e) => { ... },b:null}")

			up = Print({compression: 4, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f6)).to.equal("{bob:bob(a,b,c) { }}")
			expect(up.toString(f7)).to.equal("{bob:bob(a,b,c) { var a }}")
			expect(up.toString(f8)).to.equal("{bob:bob() { var a\n  var a }}")
		})
		it("serializes functions correctly using compression level 3 with the shift_function_body option set", function() {

			up = Print({title: false, compression: 3, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("() => ({})")
			expect(up.toString(fo1)).to.equal("{a: () => ({}), b: null}")
			expect(up.toString(fo2)).to.equal("{a: (abc, d, e) => {\n}, b: null}")
			expect(up.toString(f2)).to.equal("(abc, d, e) => {\n}")
			expect(up.toString(fo2)).to.equal("{a: (abc, d, e) => {\n}, b: null}")
			expect(up.toString(f3)).to.equal("(abc, d) => {\nvar d\n\n\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{a: (abc, d) => {\nvar d\n\n\tvar a\n}, b: null}")
			expect(up.toString({AA:fo3})).to.equal("{AA: {a: (abc, d) => {\nvar d\n\n\tvar a\n}, b: null}}")
			expect(up.toString(f4)).to.equal("() => {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{a: () => {\nvar a = 5;\n}, b: null}")
			expect(up.toString(f5)).to.equal("(abc, d, e) => {\nvar a = 2;\n\n var a=2\n}")
			expect(up.toString(fo5)).to.equal("{a: (abc, d, e) => {\nvar a = 2;\n\n var a=2\n}, b: null}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{a: (abc, d, e) => { ... }, b: null}")


			up = Print({compression: 3, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f6)).to.equal("{bob: bob(a, b, c) {\n}}")
			expect(up.toString(f7)).to.equal("{bob: bob(a, b, c) {\nvar a\n}}")
			expect(up.toString(f8)).to.equal("{bob: bob() {\nvar a\n  var a\n}}")
		})
		it("serializes functions correctly using compression level 2", function() {

			up = Print({title: false, compression: 2, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("() => ({})")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: () => ({}), b: null\n}")
			expect(up.toString(f2)).to.equal("( abc, d, e ) => {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n"+ind+"}, b: null\n}")
			expect(up.toString(f3)).to.equal("( abc, d ) => {\n\t\tvar d\n\n\t\t\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: ( abc, d ) => {\n\t\tvar d\n\n\t\t\tvar a\n"+ind+"}, b: null\n}")
			expect(up.toString(f4)).to.equal("() => {\n\t\t\t\t  var a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: () => {\n\t\t\t\t  var a = 5;\n"+ind+"}, b: null\n}")
			expect(up.toString(f5)).to.equal("( abc, d, e ) => {\n var a = 2;\n\n  var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n var a = 2;\n\n  var a=2\n"+ind+"}, b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => { ...\n"+ind+"}, b: null\n}")
		})
		it("serializes functions correctly using compression level 2 with the shift_function_body option set", function() {

			up = Print({title: false, compression: 2, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("() => ({})")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: () => ({}), b: null\n}")
			expect(up.toString(f2)).to.equal("( abc, d, e ) => {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n"+ind+ind+"}, b: null\n}")
			expect(up.toString(f3)).to.equal("( abc, d ) => {\nvar d\n\n\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: ( abc, d ) => {\n"+ind+"var d\n\n"+ind+"\tvar a\n"+ind+"}, b: null\n}")
			expect(up.toString(f4)).to.equal("() => {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: () => {\n"+ind+"var a = 5;\n"+ind+"}, b: null\n}")
			expect(up.toString(f5)).to.equal("( abc, d, e ) => {\nvar a = 2;\n\n var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n"+ind+"var a = 2;\n\n"+ind+" var a=2\n"+ind+"}, b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => { ...\n"+ind+"}, b: null\n}")
		})
		it("serializes functions correctly using compression level 1", function() {

			up = Print({title: false, compression: 1, indentation_string: ind, shift_function_body: false})
			expect(up.toString(f1)).to.equal("() => ({})")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: () => ({}), \n"+ind+"b: null\n}")
			expect(up.toString(f2)).to.equal("( abc, d, e ) => {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.toString(f3)).to.equal("( abc, d ) => {\n\t\tvar d\n\n\t\t\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: ( abc, d ) => {\n\t\tvar d\n\n\t\t\tvar a\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.toString(f4)).to.equal("() => {\n\t\t\t\t  var a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: () => {\n\t\t\t\t  var a = 5;\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.toString(f5)).to.equal("( abc, d, e ) => {\n var a = 2;\n\n  var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n var a = 2;\n\n  var a=2\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => { ...\n"+ind+"}, \n"+ind+"b: null\n}")
		})
		it("serializes functions correctly using compression level 1 with the shift_function_body option set", function() {

			up = Print({title: false, compression: 1, indentation_string: ind, shift_function_body: true})
			expect(up.toString(f1)).to.equal("() => ({})")
			expect(up.toString(fo1)).to.equal("{ \n"+ind+"a: () => ({}), \n"+ind+"b: null\n}")
			expect(up.toString(f2)).to.equal("( abc, d, e ) => {\n}")
			expect(up.toString(fo2)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n"+ind+ind+"}, \n"+ind+"b: null\n}")
			expect(up.toString(f3)).to.equal("( abc, d ) => {\nvar d\n\n\tvar a\n}")
			expect(up.toString(fo3)).to.equal("{ \n"+ind+"a: ( abc, d ) => {\n"+ind+"var d\n\n"+ind+"\tvar a\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.toString(f4)).to.equal("() => {\nvar a = 5;\n}")
			expect(up.toString(fo4)).to.equal("{ \n"+ind+"a: () => {\n"+ind+"var a = 5;\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.toString(f5)).to.equal("( abc, d, e ) => {\nvar a = 2;\n\n var a=2\n}")
			expect(up.toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => {\n"+ind+"var a = 2;\n\n"+ind+" var a=2\n"+ind+"}, \n"+ind+"b: null\n}")
			expect(up.option({truncate_function: true}).toString(fo5)).to.equal("{ \n"+ind+"a: ( abc, d, e ) => { ...\n"+ind+"}, \n"+ind+"b: null\n}")
		})
	})

})
