#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Internal memeber", function() {

	var up
	Print.prototype.set_level = ""

	it("bufferize instances are created according to platform", function() {

		var up = Print().set_option({platform: "browser"})
		//console.log(111, Print[up.platform])
		expect(up.bufferize).to.be.an.instanceof(Print[Print().platform])
		expect(up.sp("").bufferize).to.be.an.instanceof(Print[up.platform])
		expect(up.bufferize).to.be.an.instanceof(Print[up.platform])
		up.set_option({platform: "html"})
		expect(up.sp(null).bufferize).to.be.an.instanceof(Print[up.platform])
	})
	it.skip("bufferize uses themes according to set option", function() {

		var up = Print({platform: "browser"})
		expect(up.sp("TEXT").toColorString()).to.equal("%cTEXT"+up.bufferize.__proto__.__proto__[up.bufferize.theme].string)
	})
})
