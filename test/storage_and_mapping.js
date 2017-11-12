/*Bracket Print resides under the LGPL v3 
  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

var chai = require("chai"),
	expect = chai.expect,
	fs = require("fs"),
	test = require("test_help")

var remove_cache = test.remove_cache.bind(null, "amdefine.js", "r.js", "style_map.js", "bracket_print.js")
var Spinner = test.Spinner

Spinner.prototype.default_command = "node" 
Spinner.prototype.log_stdout = true 
Spinner.prototype.log_stderr = true 
Spinner.prototype.log_err = true 

var Print = require("../lib/bracket_print.js")
describe("Internal storage mapping mechinism", function() {

	var up, snippet, compare
	beforeEach(function() {

		remove_cache()
		snippet = Print({platform: "none", style: false}).line("var Print = require('../lib/bracket_print.js')")
		compare = Print({platform: "none", compression:4, style: false, truncate_function: true})
		up = Print({compression: 4})
	})

	it("has the proper style_map value", function() {

		var style_map_source = require("../lib/style_map.js")
		expect(compare.toString(up.style_map)).to.equal(compare.toString(style_map_source))

	})

	it("returns a null error message when incorrect style map values are used", function(done) {
	
		snippet
			.l("var test = Print({platform: 'shmeh'})")
			.l("test.s({cool:'joes'})")

		new Spinner("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, function(exit_code) {
			
		   expect(parseInt(exit_code)).to.equal(42)
			expect(this.stdout).to.equal("The requested platform shmeh is not included in the style mapping.\n")
			done()
		}, function() {
			expect(false, "The spinner process failed").to.be.true	
			done()
		})
	})
	
	it("returns an error message when incorrect style map values are used", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal'})")
			.l("delete test.style_map.terminal")
			.l("test.s({cool:'joes'})")

		new Spinner("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, function(exit_code) {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(this.stdout).to.equal("The requested platform terminal is not included in the style mapping.\n")
			done()
		}, function() {
			expect(false, "The spinner process failed").to.be.true	
			done()
		})
	})

	it.skip("returns an error message when incorrect style map values are used 2", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal'})")
			.l("test.style_map.terminal = {}")
			.l("test.s({cool:'joes'})")

		new Spinner("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, function(exit_code) {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(this.stdout).to.equal("The requested platform terminal is not included in the style mapping.\n")
			done()
		}, function() {
			expect(false, "The spinner process failed").to.be.true	
			done()
		})
	})

	it("returns the proper current_format and current_theme value", function() {

		var style_map_source = require("../lib/style_map.js")
		up.platform = "terminal"
		expect(compare.toString(up.current_platform)).to.equal(compare.toString(style_map_source.terminal))

		up.platform = "html"
		up.theme = "light"
		up.level = 2
		expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
		up.clear()
		expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.terminal.theme.dark_1))

	})

	it("returns the proper current_format and current_theme value with the import_theme_from value set in the style map", function() {

		var compare = Print({compression:4, style: false, truncate_function: true})
		var style_map_source = require("../lib/style_map.js")
		up.platform = "browser"
		expect(compare.toString(up.current_platform)).to.equal(compare.toString(style_map_source.browser))

		up.theme = "light"
		up.level = 2
		expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
		up.clear()
		expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.terminal.theme.dark_1))

	})

	it("returns an error message when incorrect style map theme values are used", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
			.l("test.style_map.terminal.theme.dark_1 = undefined")
			.l("test.s()")

		new Spinner("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, function(exit_code) {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(this.stdout).to.equal("The theme specified is not found in the terminal style mapping.\n")
			done()
		}, function() {
			expect(false, "The spinner process failed").to.be.true	
			done()
		})
	})

	it("returns an error message when incorrect style map theme values are used", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
			.l("delete test.style_map.terminal.theme.dark_1")
			.l("test.log()")

		new Spinner("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, function(exit_code) {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(this.stdout).to.equal("The default theme dark_1 specified is not found in the terminal style mapping.\n")
			done()
		}, function() {
			expect(false, "The spinner process failed").to.be.true	
			done()
		})
	})
})
