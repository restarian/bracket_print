#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Internal storage", function() {

	var s, str
	Print.prototype.set_level = ""
	beforeEach(function() {

		s = Print({compress_level: 4}).sp({cool: "joes"})
		str = s.new_copy({enumerate_all: true})
	})

	it("serializes the global Object in the node environment and truncated it to 1.01 megabytes", function() {

//		expect(s.new_copy({use_color: false, compress_level: 3, character_limit: 101000}).sp(global).toString().length).to.equal(101000)
	})
	it("serializes objects with manually added __proto__ chains", function() {

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
	it("serializes objects with manually added empty __proto__ Objects", function() {

		expect(up.toString({__proto__:{aa:4}})).to.equal('{__proto__:{"aa":4}}')
		expect(up.toString({__proto__:{}})).to.equal('')
		expect(up.toString({__proto__:{__proto__:{}}})).to.equal('{}')
		expect(up.toString({__proto__:{bob:null},cool:"joes"})).to.equal('{__proto__:{"bob":null}}')
		expect(up.toString({__proto__:{},cool:"joes"})).to.equal('{__proto__:{"aa":4}}')
	})
	it("serializes objects Object.prototype __proto__ chains", function() {

		var F = function() {
			this.cool = "joes"
		}

		expect(str.toString(new F())).to.equal('{"cool":"joes",__proto__:{"see":function (){\t\t\t\tPrint().log("me")}}}')
		F.prototype = {
			see: function() {
				Print().log("me")
			}
		}
		expect(str.toString(new F())).to.equal('{"cool":"joes",__proto__:{"see":function (){\t\t\t\tPrint().log("me")}}}')

		F.prototype = {
			see: function() {
				Print().log("me")
			},
			here: function() {
				Print().log("there")
			}
		}
		expect(str.toString(new F())).to.equal('{"cool":"joes",__proto__:{"see":function (){\t\t\t\tPrint().log("me")},"here":function (){\t\t\t\tPrint().log("there")}}}')
		var a = new F()
		a.more = "stuff"
		expect(str.toString(a)).to.equal('{"cool":"joes","more":"stuff",__proto__:{"see":function (){\t\t\t\tPrint().log("me")},"here":function (){\t\t\t\tPrint().log("there")}}}')

	})
})
