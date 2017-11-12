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
	Print = require("../lib/bracket_print.js"),
	test = require("test_help")

var remove_cache = test.remove_cache.bind(null, "style_map.js", "bracket_print.js")


describe("Internal storage mapping mechinism", function() {

	var up 
	beforeEach(function() {
		up = Print({compression: 4})
		remove_cache()
	})

	it.skip("returns a null error message when incorrect style map values are used", function() {
	
		var compare = Print({compression:4, style: false, truncate_function: true})
		var style_map_source = require("../lib/style_map.js")
		expect(compare.toString(up.style_map)).to.equal(compare.toString(style_map_source))

		style_map_source.terminal = {}

		//expect(compare.toString(up.style_map)).to.not.equal(compare.toString(style_map_source))

		//up.platform = "html"
		up.platform = "blah"
		up.theme = "light"
		up.level = 2
		//expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
		up.log("ddwewe")

		//up.current_platform
	})

	it("has the proper style_map value", function() {

		var compare = Print({compression:4, style: false, truncate_function: true})
		var style_map_source = require("../lib/style_map.js")

		expect(compare.toString(up.style_map)).to.equal(compare.toString(style_map_source))
		style_map_source.terminal = {}
		expect(compare.toString(up.style_map)).to.not.equal(compare.toString(style_map_source))

	})

	it("returns the proper current_format and current_theme value", function() {

		var compare = Print({compression:4, style: false, truncate_function: true})
		var style_map_source = require("../lib/style_map.js")
		up.plaform = "terminal"
		expect(compare.toString(up.current_platform)).to.equal(compare.toString(style_map_source.terminal))

		up.platform = "html"
		//up.plaform = "blah"
		up.theme = "light"
		up.level = 2
		expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.html.theme.light_2))
		up.clear()
		expect(compare.toString(up.current_theme)).to.equal(compare.toString(style_map_source.terminal.theme.dark_1))

		remove_cache()
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

		remove_cache()

	})
})
