var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("construct", function() {

	beforeEach(function() {

		var up = Print()
	})

	describe("instancing the constructor", function() {

		it("makes an instance of itself", function() {

			expect(up).to.be.an.instanceof(Print)
		})
		it("makes a new_copy() of itself", function() {

			expect(up.new_copy()).to.be.an.instanceof(Print)
		})
		it("makes an instance of itself after command calls", function() {

			expect(up.sp()).to.be.an.instanceof(Print)
			expect(up.add()).to.be.an.instanceof(Print)
			expect(up.line()).to.be.an.instanceof(Print)
			expect(up.set_option({})).to.be.an.instanceof(Print)
			expect(up.log()).to.be.an.instanceof(Print)
		})
	})
})
