/* Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com> Bracket Print resides under the LGPL version 3
Bracket Print is a cross-platform printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

var chai = require("chai"),
	expect = chai.expect,
	path = require("path")
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
	var err_msg = function(msg) { expect(false, msg).to.be.true; done() }

	describe("Checking for dependencies..", function() { 

		it("requirejs in the system as a program", function(done) {
			it_will.stop = true 

			expect((function() {try { require("requirejs"); return true; } catch(e) { return e; }})()).to.be.true 
			it_will.stop = false 
			done()
		})
		it("r_js in the system as a command line program", function(done) {
			it_will.stop = true 

				utils.Exec("r_js", [], {cwd: __dirname}, (exit_code, stdout, stderr) => {

				expect(!stderr, stderr).to.be.true
				it_will.stop = false 
				done()
			}, err_msg)
		})
		it("npm will build the program using the amd build", function(done) {
			it_will.stop = true 

			utils.Exec("npm", ["run", "build_amd"], {cwd: __dirname}, (exit_code, stdout, stderr) => {

				expect(!stderr, stdout+stderr).to.be.true
				it_will.stop = false 
				done()
			}, err_msg)
		})
		it("npm will build the program using the umd build", function(done) {
			it_will.stop = true 

			utils.Exec("npm", ["run", "build_umd"], {cwd: __dirname}, (exit_code, stdout, stderr) => {

				expect(!stderr, stdout+stderr).to.be.true
				it_will.stop = false 
				done()
			}, err_msg)
		})
	})
	describe("Internal storage mapping mechinism", function() {

		var Print, s, up
		var root = path.join(__dirname, "..")

		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(root, "lib"), nodeRequire: require})
			Print = requirejs("bracket_print")
			snippet = Print({platform: "terminal", style: false}).line("var Print = require('../bracket_print');")
			compare = Print({platform: "terminal", compression: 4, style: false, truncate_function: false})
			up = Print({compression: 4})
		})
		afterEach(cache.dump.bind(cache))

		it("stores the proper platform and theme value", function() {

			var style_map_source = requirejs("style_map")
			compare.platform = "terminal"
			expect(compare.toString(compare.l()._platform)).to.equal(compare.toString(style_map_source.terminal))

			up.platform = "html"
			up.theme = "light"
			up.level = 2
			expect(compare.toString(up.s()._theme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
			up.clear()
			up.level = 1
			expect(compare.toString(up.a()._theme)).to.equal(compare.toString(style_map_source.terminal.theme.light_1))
		})
		it("stores the proper theme value with the import_theme_from value set in the style map", function() {

			var style_map_source = requirejs("style_map")
			up.platform = "browser"
			expect(compare.toString(up.s()._platform)).to.equal(compare.toString(style_map_source.browser))

			up.theme = "dark"
			up.level = 2
			expect(compare.toString(up.l()._platform)).to.equal(compare.toString(style_map_source.browser))
			expect(up.log()._theme).to.deep.equal(style_map_source.html.theme.dark_2)
			up.clear()
			expect(compare.toString(up.log()._theme)).to.equal(compare.toString(style_map_source.terminal.theme.light_1))
		})
	})
})
