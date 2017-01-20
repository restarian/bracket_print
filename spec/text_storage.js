var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Internal storage", function() {

	describe("Keeps plain text data correctly", function() {
	var s
	beforeEach(function() {

		s = Print({compress_level: 4}).sp({cool: "joes"})
	})


		it("serializes objects", function() {

			expect(s.set_option({}).toString()).to.equal('{"cool":"joes"}')
			// Todo: add comma before an Object if the last print command was to serialize.
			expect(s.sp({undefined: undefined, null: null, a: "f"*2}).toString())
				.to.equal('{"cool":"joes"}{"undefined":undefined,"null":null,"a":NaN}')
		})
	})
})
