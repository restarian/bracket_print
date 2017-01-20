var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Options", function() {
	var s

	beforeEach(function() {
		s = Print("Heading one")
	})
	describe("transfer the logging title", function() {

		it("store the log_title correctly in many ways", function() {

			expect(s.set_option({}).log_title).to.equal("Heading one")
			expect(s.log_title).to.equal("Heading one")
			expect(s.new_copy().log_title).to.equal("Heading one")
			expect(s.log_title).to.equal("Heading one")
			expect(s.set_option({log_title: "Heading two"}).log_title).to.equal("Heading two")
			expect(s.log_title).to.equal("Heading one")
		})
		it("copy to new instances", function() {

			expect(s._mutable_options).to.deep.equal(s.new_copy()._mutable_options)
			expect(s._mutable_options).to.deep.equal(Print(s)._mutable_options)
			expect(s._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		})
	})

	describe("instancing the constructor", function() {

	})
})
