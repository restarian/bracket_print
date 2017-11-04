#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Use_level option", function() {
	var s, s1

	beforeEach(function() {
		s = Print()
		s.compress_level = Infinity // Compression to the max! :)
		s1 = Print()
		s1.compress_level = Infinity // Compression to the max! :)
	})

	describe("parses the value set to the use_level property and convertes it to the appropriate value.", function() {

		it("when set with a string of dashes and commas", function() {

			var default_use_level_value = [-Infinity, Infinity]
			expect(s.use_level).to.deep.equal(default_use_level_value)
			Print.prototype.use_level = "0-5"
			expect(s.use_level).to.deep.equal([0, 5])

			s.use_level = "10, 15"
			expect(s.use_level).to.deep.equal([10,10,15,15])
			expect(s1.use_level).to.deep.equal([0, 5])


			s.use_level = default_use_level_value
			s1.use_level = default_use_level_value
			expect(s.use_level).to.deep.equal(default_use_level_value)
			expect(s1.use_level).to.deep.equal(default_use_level_value)

			s.use_level = "2 -  3"
			expect(s.use_level).to.deep.equal([2, 3])
			s.use_level = "0 -  37,"
			expect(s.use_level).to.deep.equal([0, 37])
			s.use_level = "0 -  37,40"
			expect(s.use_level).to.deep.equal([0, 37, 40, 40])
			s.use_level = "2, 0 -  37,40,"
			expect(s.use_level).to.deep.equal([2, 2, 0, 37, 40, 40])
			s.use_level = "2, 0 -  37,40,70-71"
			expect(s.use_level).to.deep.equal([2, 2, 0, 37, 40, 40, 70, 71])
			s.use_level = "0 -  37,40"
			expect(s.use_level).to.deep.equal([0, 37, 40, 40])

		})
		it("when set with an Array value", function() {
			s.use_level = ["2", "  3"]
			expect(s.use_level).to.deep.equal([2, 3])
			s.use_level = [0, " 37,"]
			expect(s.use_level).to.deep.equal([0, 37])
			s.use_level = [0, 37,40]
			expect(s.use_level).to.deep.equal([0, 37])
			s.use_level = [2, 2, 0,  37,"40",40]
			expect(s.use_level).to.deep.equal([2, 2, 0, 37, 40, 40])

			s.use_level = s.use_level
			expect(s.use_level).to.deep.equal([2, 2, 0, 37, 40, 40])

			Print.prototype.use_level = 7
			var a = Print({level: 7})
			expect(a.sp(false).toString()).to.equal("false")
			var b = Print({level: 8})
			expect(b.sp(false).toString()).to.equal("")

		})
	})

	describe("parses the value set to the use_level property and convertes it to the appropriate value", function() {

		it("use_level controls the print commands", function() {
			Print.prototype.use_level = 3
			var str = s.sp()

			expect(str.set_option({level: 5}).sp("Some text").toString()) .to.equal("")
			expect(str.set_option({level: 4}).sp("Some text").toString()) .to.equal("")
			expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text")
			expect(str.set_option({level: 2}).sp("Some text").toString()) .to.equal("Some text")
			expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text Some text")

			str.clear()
			Print.prototype.use_level = "0-3, 6, 99"

			expect(str.set_option({level: 1}).sp("Some text").toString()) .to.equal("Some text")
			expect(str.set_option({level: 2}).sp("Some text").toString()) .to.equal("Some text Some text")
			expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text Some text Some text")
			expect(str.set_option({level: 4}).sp("Some text").toString()) .to.equal("Some text Some text Some text")
			expect(str.set_option({level: 6}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text")
			expect(str.set_option({level: 7}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text")
			expect(str.set_option({level: 99}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text")

			Print.prototype.use_level = ""
			expect(str.set_option({level: -199}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text")
			expect(str.set_option({level: 420}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text Some text")

			var str = s.sp()
			Print.prototype.use_level = 3
			Print.prototype.use_level = ",0-2, 0-2, 1-3,,6,"

			expect(str.set_option({level: 1}).sp("*").toString()) .to.equal("*")
			expect(str.set_option({level: 2}).sp("*").toString()) .to.equal("* *")
			expect(str.set_option({level: 3}).sp("*").toString()) .to.equal("* * *")
			expect(str.set_option({level: 4}).sp("*").toString()) .to.equal("* * *")
			expect(str.set_option({level: 5}).sp("*").toString()) .to.equal("* * *")
			expect(str.set_option({level: 6}).sp("*").toString()) .to.equal("* * * *")
			expect(str.set_option({level: 7}).sp("*").toString()) .to.equal("* * * *")

		})
	})
})
