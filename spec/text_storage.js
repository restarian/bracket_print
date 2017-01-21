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
			// TODO: add comma before an Object if the last print command was to serialize.
			expect(s.sp({undefined: undefined, null: null, a: "f"*2}).toString())
				.to.equal('{"cool":"joes"}{"undefined":undefined,"null":null,"a":NaN}')
		})

		it("serializes objects with __proto__ chains", function() {
			var a = {aa: "str", bb: "joes", __proto__: {here: 22, there: 55}}
			var b = {aa: "str", bb: "joes"}//, __proto__: {here: 22, there: 55}}
			var c = {__proto__: {here: 22, there: 55}}
			var d = {__proto__: {here: 22, __proto__: {cool: "joes", yep: 6}, there: 55}}
			// Create a top-level copy of the Print library which does not store text internally untill a print command is used.
			var up = s.new_copy()

			expect(up.sp(a).toString()).to.equal('{"aa":"str","bb":"joes",__proto__:{"here":22,"there":55}}')
			expect(up.sp(b).toString()).to.equal('{"aa":"str","bb":"joes"}')
			expect(up.sp(c).toString()).to.equal('{__proto__:{"here":22,"there":55}}')
			expect(up.sp(d).toString()).to.equal('{__proto__:{"here":22,"there":55,__proto__:{"cool":"joes","yep":6}}}')
			expect(up.sp({}).toString()).to.equal('{}')

		})

	})
})
