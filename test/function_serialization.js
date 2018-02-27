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
path = require("path"),
utils = require("bracket_utils")

module.paths.unshift(path.join(__dirname, "..", ".."))
var cache = utils.cacheManager(require)
var Print = require("bracket_print")

describe("Functions - " + path.basename(__filename), function() {

	beforeEach(function() {
		cache.start()
	})
	afterEach(cache.dump.bind(cache))

	afterEach(cache.dump.bind(cache))
	it.skip("serializes functions with many tab characters placed around using all compression levels", function() {

		// keep in mind that there is tabs inserted in the empty lines below for testing purposed which should not be removed.
	var f
	f = function(here, there) {

	var a = "dd"
	var b = true




	var c = true



		}

		var up = Print({indentation_string: "---", shift_function_body: false})

		expect(up.option({compression: 4}).toString(f)).to.equal('function(here,there){var a = \"dd\"\nvar b = true\nvar c = true}')

		expect(up.option({compression: 3}).toString(f))
			.to.equal('function(here, there) {\n\tvar a = "dd"\n\tvar b = true\n\tvar c = true}')

		expect(up.option({compression: 2}).toString(f))
			.to.equal('function ( here, there ) {\n\n\tvar a = "dd"\n\tvar b = true\n\n\tvar c = true\n}')

		expect(up.option({compression: 1}).toString(f))
			.to.equal('function ( here, there ) {\n\n\tvar a = "dd"\n\tvar b = true\n\n\n\tvar c = true\n}')
	})

	it.skip("serializes functions within prototypes", function() {

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
			.to.equal('{"__proto__":{"a":function(){...},"b":function(){...}}}')
		expect(Print().option({compression: 4, quote_qualifier: false, truncate_function: true}).toString(Fun, new Fun()))
			.to.equal('function(){...} {__proto__:{a:function(){...},b:function(){...}}}')
 
		expect(Print().option({compression: 4, quote_qualifier: false, truncate_function: false}).toString(Fun, new Fun()))
			.to.equal('function(){Print().toString("Here")} {__proto__:{a:function(){Print().log("Here is a")},b:function(){Print().log("Here is b")}}}')

		expect(Print().option({truncate_function: false, compression: 4, bad_option: 55, quote_qualifier: false, truncate_function: true}).toString(Fun, new Fun()))
			.to.equal('function(){...} {__proto__:{a:function(){...},b:function(){...}}}')
	})


})
