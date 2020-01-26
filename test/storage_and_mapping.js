/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

var chai = require("chai"),
	expect = chai.expect,
	fs = require("fs"),
	path = require("path")
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

//module.paths.unshift(path.join(__dirname, ".."))
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
		it("r_js will build the program", function(done) {
			it_will.stop = true 

			utils.Exec("r_js", ["-o", "rjs_build.js"], {cwd: __dirname}, (exit_code, stdout, stderr) => {

				expect(!stderr, stderr).to.be.true
				it_will.stop = false 
				done()
			}, err_msg)
		})

		it("r_js will build the program using the UMD rjs build", function(done) {
			it_will.stop = true 

			utils.Exec("r_js", ["-o", "rjs_build_umd.js"], {cwd: __dirname}, (exit_code, stdout, stderr) => {

				expect(!stderr, stderr).to.be.true
				it_will.stop = false 
				done()
			}, err_msg)
		})
	})

	describe("Internal storage mapping mechinism", function() {

		var Print, s, up

		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			Print = requirejs("bracket_print")
			snippet = Print({platform: "none", style: false}).line("var Print = require('bracket_print');")
			compare = Print({platform: "none", compression: 4, style: false, truncate_function: !true})
			up = Print({compression: 4})
		})
		afterEach(cache.dump.bind(cache))

		it("has the proper style_map value", function() {

			var style_map_source = require("bracket_print/lib/style_map.js")
			expect(compare.spawn({platform: "terminal"}).toString(up.style_map)).to.equal(compare.spawn({platform: "terminal"}).toString(style_map_source))

		})

		it("returns a null error message when incorrect style map values are used", function(done) {
		
			snippet
			.l("var test = Print({platform: 'shmeh'})")
				.l("test.s({cool:'joes'});")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The requested platform shmeh is not included in the style mapping.")
				done()
			}, err_msg) 
		})
		
		it("returns an error message when incorrect style map values are used", function(done) {

			expect(up.style_map.terminal).to.be.an("object")

			snippet
				.l("var test = Print({platform: 'terminal'})")
				.l("delete test.style_map.terminal")
				.l("test.s({cool:'joes'})")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The requested platform terminal is not included in the style mapping.\n")
				done()
			}, err_msg)
		})

		it("returns an error message when incorrect style map values are used 2", function(done) {

			expect(Print().style_map.terminal).to.be.an("object")

			snippet
				.l("var test = Print({style: false, platform: 'terminal'})")
				.l("test.style_map.terminal = null")
				.l("test.s({cool:'joes'})")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The requested platform terminal is not included in the style mapping.")
				done()
			}, err_msg)
		})

		it("returns the proper current_format and currentTheme value", function() {

			var style_map_source = require("bracket_print/lib/style_map.js")
			compare.platform = "terminal"
			expect(compare.toString(compare.currentPlatform)).to.equal(compare.toString(style_map_source.terminal))

			up.platform = "html"
			up.theme = "light"
			up.level = 2
			expect(compare.toString(up.currentTheme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
			up.clear()
			up.level = 1
			expect(compare.toString(up.currentTheme)).to.equal(compare.toString(style_map_source.terminal.theme.light_1))
		})

		it("returns the proper current_format and currentTheme value with the import_theme_from value set in the style map", function() {

			var compare = Print({compression: 4, style: false, truncate_function: true})
			var style_map_source = require("bracket_print/lib/style_map.js")
			up.platform = "browser"
			expect(compare.toString(up.currentPlatform)).to.equal(compare.toString(style_map_source.browser))

			up.theme = "dark"
			up.level = 2
			expect(compare.toString(up.currentTheme)).to.equal(compare.toString(style_map_source.html.theme.dark_2))
			up.clear()
			expect(compare.toString(up.currentTheme)).to.equal(compare.toString(style_map_source.terminal.theme.light_1))
		})

		it("returns an error message when incorrect style map theme values are used", function(done) {

			expect(up.style_map.terminal).to.be.an("object")

			snippet
				.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
				.l("test.style_map.terminal.theme.dark_1 = undefined")
				.l("test.s()")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The theme specified is not found in the terminal style mapping.")
				done()
			}, err_msg)
		})

		it("returns an error message when incorrect style map theme values are used", function(done) {

			expect(up.style_map.terminal).to.be.an("object")

			snippet
				.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
				.l("delete test.style_map.terminal.theme.dark_1")
				.l("test.log()")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The default theme dark_1 specified is not found in the terminal style mapping.")
				done()
			}, err_msg)
		})
	})
})
