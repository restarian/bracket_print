var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Internal storage", function() {

	describe("Keeps plain text data correctly", function() {
	var s
	beforeEach(function() {

		s = Print()
		s.sp({cool: "joe"})
	})


		it("serializes objects", function() {

			expect(s.toString()).to.equal('{"cool": "joe"}')
		})
	})
})
