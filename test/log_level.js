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
expect = chai.expect
var Print = require("../build/bracket_print_umd.js")

describe("Use_log_level option", function() {
	var s, s1

	beforeEach(function() {
		s = Print()
		s.compress_log_level = Infinity // Compression to the max! :)
		s1 = Print()
		s1.compress_log_level = Infinity // Compression to the max! :)
	})

	describe("parses the value set to the log_level property and convertes it to the appropriate value.", function() {

		it("when set with a string of dashes and commas", function() {

			var default_log_level_value = [-Infinity, Infinity]
			expect(s.log_level).to.deep.equal(default_log_level_value)
			Print.prototype.log_level = "0-5"
			expect(s.log_level).to.deep.equal([0, 5])

			s.log_level = "10, 15"
			expect(s.log_level).to.deep.equal([10,10,15,15])
			expect(s1.log_level).to.deep.equal([0, 5])


			s.log_level = default_log_level_value
			s1.log_level = default_log_level_value
			expect(s.log_level).to.deep.equal(default_log_level_value)
			expect(s1.log_level).to.deep.equal(default_log_level_value)

			s.log_level = "2 -  3"
			expect(s.log_level).to.deep.equal([2, 3])
			s.log_level = "0 -  37,"
			expect(s.log_level).to.deep.equal([0, 37])
			s.log_level = "0 -  37,40"
			expect(s.log_level).to.deep.equal([0, 37, 40, 40])
			s.log_level = "2, 0 -  37,40,"
			expect(s.log_level).to.deep.equal([2, 2, 0, 37, 40, 40])
			s.log_level = "2, 0 -  37,40,70-71"
			expect(s.log_level).to.deep.equal([2, 2, 0, 37, 40, 40, 70, 71])
			s.log_level = "0 -  37,40"
			expect(s.log_level).to.deep.equal([0, 37, 40, 40])

		})

		it("when set with an Array value", function() {
			s.log_level = ["2", "  3"]
			expect(s.log_level).to.deep.equal([2, 3])
			s.log_level = [0, " 37,"]
			expect(s.log_level).to.deep.equal([0, 37])
			s.log_level = [0, 37,40]
			expect(s.log_level).to.deep.equal([0, 37])
			s.log_level = [2, 2, 0,  37,"40",40]
			expect(s.log_level).to.deep.equal([2, 2, 0, 37, 40, 40])

			s.log_level = s.log_level
			expect(s.log_level).to.deep.equal([2, 2, 0, 37, 40, 40])

			Print.prototype.log_level = 7
			var a = Print({level: 7})
			expect(a.s(false).toString()).to.equal("false")
			var b = Print({level: 8})
			expect(b.s(false).toString()).to.equal("")

		})
	})

	describe("parses the value set to the log_level property and convertes it to the appropriate value", function() {

		it("log_level controls the print commands", function() {
			Print.prototype.log_level = 3
			var str = s.s()

			expect(str.option({level: 5}).s("Some text").toString()) .to.equal("")
			expect(str.option({level: 4}).s("Some text").toString()) .to.equal("")
			expect(str.option({level: 3}).s("Some text").toString()) .to.equal("Some text")
			expect(str.option({level: 2}).s("Some text").toString()) .to.equal("Some text")
			expect(str.option({level: 3}).s("Some text").toString()) .to.equal("Some text Some text")

			str.empty()
			Print.prototype.log_level = "0-3, 6, 99"

			expect(str.option({level: 1}).s("Some text").toString()) .to.equal("Some text")
			expect(str.option({level: 2}).s("Some text").toString()) .to.equal("Some text Some text")
			expect(str.option({level: 3}).s("Some text").toString()) .to.equal("Some text Some text Some text")
			expect(str.option({level: 4}).s("Some text").toString()) .to.equal("Some text Some text Some text")
			expect(str.option({level: 6}).s("Some text").toString()) .to.equal("Some text Some text Some text Some text")
			expect(str.option({level: 7}).s("Some text").toString()) .to.equal("Some text Some text Some text Some text")
			expect(str.option({level: 99}).s("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text")

			Print.prototype.log_level = ""
			expect(str.option({level: -199}).s("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text")
			expect(str.option({level: 420}).s("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text Some text")

			var str = s.s()
			Print.prototype.log_level = 3
			Print.prototype.log_level = ",0-2, 0-2, 1-3,,6,"

			expect(str.option({level: 1}).s("*").toString()) .to.equal("*")
			expect(str.option({level: 2}).s("*").toString()) .to.equal("* *")
			expect(str.option({level: 3}).s("*").toString()) .to.equal("* * *")
			expect(str.option({level: 4}).s("*").toString()) .to.equal("* * *")
			expect(str.option({level: 5}).s("*").toString()) .to.equal("* * *")
			expect(str.option({level: 6}).s("*").toString()) .to.equal("* * * *")
			expect(str.option({level: 7}).s("*").toString()) .to.equal("* * * *")

		})
	})
})
