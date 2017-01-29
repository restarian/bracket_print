var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Internal storage", function() {

	var s
	Print.prototype.set_level = ""
	beforeEach(function() {

		s = Print({compress_level: 4}).sp({cool: "joes"})
	})

		it("serializes native ECMA Objects", function() {

			expect(s.clear().set_option({compress_level: 4}).sp(Function).toString()).to.equal('function Function(){ [native code] }')
			expect(s.clear().set_option({compress_level: 3}).sp(Function).toString()).to.equal('function Function() { \n [native code]  }')
			expect(s.clear().set_option({compress_level: 2}).sp(Function).toString()).to.equal('function Function() { \n    [native code] \n}')
			expect(s.clear().set_option({compress_level: 1}).sp(Function).toString()).to.equal('function Function() { \n    [native code] \n}')

			expect(s.clear().set_option({compress_level: 4}).sp(Object).toString()).to.equal('function Object(){ [native code] }')
			expect(s.clear().set_option({compress_level: 3}).sp(Object).toString()).to.equal('function Object() { \n [native code]  }')
			expect(s.clear().set_option({compress_level: 2}).sp(Object).toString()).to.equal('function Object() { \n    [native code] \n}')
			expect(s.clear().set_option({compress_level: 1}).sp(Object).toString()).to.equal('function Object() { \n    [native code] \n}')

			expect(s.clear().sp(Buffer("Brackit")).toString()).to.equal('Brackit')
			expect(s.clear().set_option({compress_function: true}).sp(Buffer("Brackit")).toString()).to.equal('Brackit')

		})
		it("serializes objects with odd property qualifiers", function() {

			expect(s.set_option({}).toString()).to.equal('{"cool":"joes"}')
			// TODO: add comma before an Object if the last print command was to serialize.
			expect(s.sp({undefined: undefined, null: null, a: "f"*2}).toString())
				.to.equal('{"cool":"joes"} {"undefined":undefined,"null":null,"a":NaN}')
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

		it("Clears stored text data with the clear() command", function() {

			var str = s.sp()
			str.clear()
			expect(str.sp("Brackit Print").toString()).to.equal("Brackit Print")
			str.clear()
			expect(str.sp("Brackit Print").toString()).to.equal("Brackit Print")
			expect(str.sp("Go!").toString()).to.equal("Brackit Print Go!")
			expect(str.clear().sp("Fub").toString()).to.equal("Fub")
			expect(str.clear().toString()).to.equal("")
		})
})
