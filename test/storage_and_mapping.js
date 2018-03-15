/*Bracket Print resides under the LGPL v3

  Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

 this file is a part of Bracket print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Steckroth, Bustout, <RobertSteckroth@gmail.com> */

var chai = require("chai"),
	expect = chai.expect,
	fs = require("fs"),
	path = require("path")
	utils = require("bracket_utils")

module.paths.unshift(path.join(__dirname, "..", ".."))
var cache = utils.cacheManager(require)
var Print

describe("Internal storage mapping mechinism - " + path.basename(__filename), function() {

	var up, snippet, compare
	beforeEach(function() {
		cache.start()
		Print = require("bracket_print")
		snippet = Print({platform: "none", style: false}).line("var Print = require('bracket_print');")
		compare = Print({platform: "none", compression: 4, style: false, truncate_function: true})
		up = Print({compression: 4})
	})
	afterEach(cache.dump.bind(cache))

	it("has the proper style_map value", function() {

		var style_map_source = require("../lib/style_map.js")
		expect(compare.spawn().toString(up.style_map)).to.equal(compare.spawn().toString(style_map_source))

	})

	it("returns a null error message when incorrect style map values are used", function(done) {
	
		snippet
			.l("var test = Print({platform: 'shmeh'})")
			.l("test.s({cool:'joes'});")

		utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
			
		   expect(parseInt(exit_code)).to.equal(42)
			expect(stdout).to.include("The requested platform shmeh is not included in the style mapping.")
			done()
		}, function(error) { expect(false, error).to.be.true;	done() })
	})
	
	it("returns an error message when incorrect style map values are used", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal'})")
			.l("delete test.style_map.terminal")
			.l("test.s({cool:'joes'})")

		utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(stdout).to.include("The requested platform terminal is not included in the style mapping.\n")
			done()
		}, function(error) { expect(false, error).to.be.true;	done() })
	})

	it.skip("returns an error message when incorrect style map values are used 2", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal'})")
			.l("test.style_map.terminal = {}")
			.l("test.s({cool:'joes'})")

		utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(stdout).to.equal("The requested platform terminal is not included in the style mapping.\n")
			done()
		}, function(error) { expect(false, error).to.be.true;	done() })
	})

	it("returns the proper current_format and currentTheme value", function() {

		var style_map_source = require("../lib/style_map.js")
		up.platform = "terminal"
		expect(compare.toString(up.currentPlatform)).to.equal(compare.toString(style_map_source.terminal))

		up.platform = "html"
		up.theme = "light"
		up.level = 2
		expect(compare.toString(up.currentTheme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
		up.clear()
		expect(compare.toString(up.currentTheme)).to.equal(compare.toString(style_map_source.terminal.theme.light_1))

	})

	it("returns the proper current_format and currentTheme value with the import_theme_from value set in the style map", function() {

		var compare = Print({compression:4, style: false, truncate_function: true})
		var style_map_source = require("../lib/style_map.js")
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
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(stdout).to.include("The theme specified is not found in the terminal style mapping.\n")
			done()
		}, function(error) { expect(false, error).to.be.true;	done() })
	})

	it("returns an error message when incorrect style map theme values are used", function(done) {

		expect(up.style_map.terminal).to.be.an("object")

		snippet
			.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
			.l("delete test.style_map.terminal.theme.dark_1")
	.l("test.log()")

		utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: __dirname}, (exit_code, stdout, stderr) => {
			
			expect(parseInt(exit_code)).to.equal(42)
			expect(stdout).to.include("The default theme dark_1 specified is not found in the terminal style mapping.\n")
			done()
		}, function(error) { expect(false, error).to.be.true;	done() })
	})
})
