#!/usr/bin/env npm test
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
	it("makes an instance of itself after command calls", function() {

		expect(s.sp()).to.be.an.instanceof(Print)
		expect(s.add()).to.be.an.instanceof(Print)
		expect(s.line()).to.be.an.instanceof(Print)
		expect(s.tab()).to.be.an.instanceof(Print)
		expect(s.line().sp()).to.be.an.instanceof(Print)
		expect(s.line().tab().sp().line().space()).to.be.an.instanceof(Print)
		expect(s.set_option({})).to.be.an.instanceof(Print)
		expect(s.set_option({}).new_copy()).to.be.an.instanceof(Print)
		expect(s.set_option({}).new_copy().sp()).to.be.an.instanceof(Print)
		expect(s.set_option({}).new_copy().line().sp().line().new_copy()).to.be.an.instanceof(Print)
		expect(s.new_copy().new_copy().new_copy()).to.be.an.instanceof(Print)
		expect(s.log()).to.be.an.instanceof(Print)
	})

	it("makes a new instances of itself when chained to a rooted Print object", function() {

		var up = Print({})
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.sp("Cool").toString()).to.equal("Cool")
		expect(up.sp("Cool").toString()).to.equal("Cool")
		expect(up.sp("Cool").log().toString()).to.equal("Cool")
		expect(up.sp("Cool").log().toString()).to.equal("Cool")
		expect(up.log().toString().toString()).to.equal("")
		expect(up.sp().toString().toString()).to.equal("")

		var up = Print(up, {log_title: "Not me"}, "But me")
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.toString("Cool")).to.equal("Cool")
		expect(up.sp("Cool").toString()).to.equal("Cool")
		expect(up.sp("Cool").toString()).to.equal("Cool")
		expect(up.sp("Cool").log().toString()).to.equal("Cool")
		expect(up.sp("Cool").log().toString()).to.equal("Cool")
		expect(up.log().toString().toString()).to.equal("")
		expect(up.sp().toString().toString()).to.equal("")

		expect(up.sp().log().log_title.toString()).to.equal("But me")
	})
})
