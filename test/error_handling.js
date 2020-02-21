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
	describe("Error messages are handled correctly", function() {

		var err_msg = function(msg) { expect(false, msg).to.be.true; done() }
		var requirejs, Print, up, ind = "+->", snippet, root = path.join(__dirname, "..")
		beforeEach(function() {

			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			Print = requirejs("bracket_print")
			up = Print({title: false, style: false})
			snippet = Print({platform: "terminal", style: false, title: false}).line("var Print = require('../bracket_print');")
		})
		afterEach(cache.dump.bind(cache))

		it("has the proper style_map value", function() {

			var style_map_source = requirejs("style_map")
			expect(up.spawn({platform: "terminal"}).toString(up.style_map)).to.equal(up.spawn({platform: "terminal"}).toString(style_map_source))
			expect(up.spawn({platform: "html"}).toString(up.style_map)).to.not.equal(up.spawn({platform: "terminal"}).toString(style_map_source))
		})
		it("returns a proper error message when incorrect style map values are used with a process spawn", function(done) {
		
			snippet
				.l("var test = Print({platform: 'shmeh'})")
				.l("test.s({cool:'joes'});")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: root}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stdout+stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The requested platform shmeh is not included in the style mapping")
				done()
			}, err_msg) 
		})
		it("returns an error message when incorrect style map values are used", function(done) {

			expect(up.style_map.terminal).to.be.an("object")

			snippet
				.l("var test = Print({platform: 'terminal'})")
				.l("delete test.style_map.terminal")
				.l("test.s({cool:'joes'})")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: root}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stdout+stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The requested platform terminal is not included in the style mapping")
				done()
			}, err_msg)
		})
		it("returns an error message when incorrect style map values are used 2", function(done) {

			expect(Print().style_map.terminal).to.be.an("object")

			snippet
				.l("var test = Print({style: false, platform: 'terminal'})")
				.l("test.style_map.terminal = null")
				.l("test.s({cool:'joes'})")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: root}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stdout+stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The requested platform terminal is not included in the style mapping")
				done()
			}, err_msg)
		})
		it("returns an error message when incorrect style map theme values are used", function(done) {

			expect(up.style_map.terminal).to.be.an("object").that.has.any.keys("theme")
			expect(up.style_map.terminal.theme).to.be.an("object").that.has.any.keys("dark_1")

			snippet
				.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
				.l("test.style_map.terminal.theme.dark_1 = undefined")
				.l("test.s()")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: root}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stdout+stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The theme specified is not found in the terminal style mapping")
				done()
			}, err_msg)
		})
		it("returns an error message when incorrect style map theme values are used", function(done) {

			expect(up.style_map.terminal).to.be.an("object").that.has.any.keys("theme")
			expect(up.style_map.terminal.theme).to.be.an("object").that.has.any.keys("dark_1")

			snippet
				.l("var test = Print({platform: 'terminal', theme: 'dark', level: 1, log_level: 1})")
				.l("delete test.style_map.terminal.theme.dark_1")
				.l("test.log()")

			utils.Spawn("node", ["-p", snippet.toString("process.exit(42)")], {cwd: root}, (exit_code, stdout, stderr) => {
				
				expect(!stderr, stdout+stderr).to.be.true
				expect(parseInt(exit_code)).to.equal(42)
				expect(stdout).to.include("The default theme dark_1 specified is not found in the terminal style mapping")
				done()
			}, err_msg)
		})
	})
})
