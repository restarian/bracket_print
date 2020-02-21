/* Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com> Bracket Print resides under the LGPL version 3
Bracket Print is a cross-platform printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

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

		var msg = ""
		;([0,1,2,3]).forEach(function(value) {

			var up
			beforeEach(function() {

				cache.start()
				var r
				if ( value === 0 ) {
					r = require("requirejs")
					r.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
					up = r("bracket_print")({log_level: 1,level: 1,quote_qualifier: true,denote_quoting: "\"",style: true,title: false,platform: "terminal",compression: 5})
				}
				else if ( value === 1 ) {
					r = require("requirejs")
					r.config({baseUrl: path.join(__dirname, "..", "build"), nodeRequire: require})
					up = r("bracket_print_umd")({log_level: 1,level: 1,quote_qualifier: true,denote_quoting: "\"",style: true,title: false,platform: "terminal",compression: 5})
				}
				else if ( value === 2 ) {
					r = require("requirejs")
					r.config({baseUrl: path.join(__dirname, "..", "build"), nodeRequire: require})
					up = r("bracket_print")({log_level: 1,level: 1,quote_qualifier: true,denote_quoting: "\"",style: true,title: false,platform: "terminal",compression: 5})
				}
				else if ( value === 3 )
					up = require("bracket_print")({log_level: 1,level: 1,quote_qualifier:true,denote_quoting: "\"",style: true,title: false,platform: "terminal",compression: 5})
			})
			afterEach(cache.dump.bind(cache))

			if ( value === 0 )
				msg = "Testing using requirejs and the lib directory"
			else if ( value === 1 )
				msg = "Testing using requirejs and the build directory with the umd version"
			else if ( value === 2 )
				msg = "Testing using requirejs and the build directory"
			else if ( value === 3 ) {
				var p_path = require.resolve("bracket_print")
				msg = "Testing using commonjs which and the package.json entry of " + path.basename(path.dirname(p_path)) + "/"+ path.basename(p_path)
			}
			
			describe(msg, function() {

				it("creates the appropriate wrappers when using various command chains", function() {
					
					up.spawn({platform: "terminal", theme: "sss"}).s("ss").log("cool")
					
					return
					var s_map = up.style_map[up.platform]
					expect(s_map).to.be.an("object").that.has.any.keys("format")
					s_map.wrap_start = "<"
					s_map.wrap_end = ">"
					s_map.theme.test_theme_1 = {
						string: "str:"
					}

					var l = up.spawn({theme: "test_theme"})
					expect(l.toStyleString("cool")).to.equal("<str:cool>")
					expect(l.s("cool").toStyleString("joes")).to.equal("<str:cool str:joes>")
					expect(l.s("cool").option({style: false}).toStyleString("joes")).to.equal("<str:cool> joes")
					expect(l.s("cool").option({style: false}).a("joes").option({style: true}).a("here").toStyleString()).to.equal("<str:cool>joes<str:here>")
					expect(l.s("cool").option({style: false}).l("joes").option({style: true}).l("here").toStyleString()).to.equal("<str:cool>\njoes<\nstr:here>")
				})
			})
		})
	})
})
