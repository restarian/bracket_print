var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Constructor", function() {

	var s
	beforeEach(function() {

		s = Print()
	})

	it("makes an instance of itself", function() {

		expect(s).to.be.an.instanceof(Print)
	})
	it("makes a new_copy() of itself", function() {

		expect(s.new_copy()).to.be.an.instanceof(Print)
	})
	it("makes an instance of itself after command calls", function() {

		expect(s.sp()).to.be.an.instanceof(Print)
		expect(s.add()).to.be.an.instanceof(Print)
		expect(s.line()).to.be.an.instanceof(Print)
		expect(s.set_option({})).to.be.an.instanceof(Print)
		expect(s.log()).to.be.an.instanceof(Print)
	})

})
