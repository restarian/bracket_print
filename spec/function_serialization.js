#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Functions", function() {
	var s

	beforeEach(function() {
		s = Print()
	})


	it.skip("serializes functions and nested functions", function() {
		var a = function() {

		  var a = "dd"




			var b = true


		}
		expect(s.set_option({compress_level: 3}).toString(a)).to.equal("")

	})
})
