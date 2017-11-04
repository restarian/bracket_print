#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../")

describe("Internal storage", function() {

	var up
	Print.prototype.set_level = ""
	beforeEach(function() {

		up = Print({compress_level: 4, enumerate_all: true})
	})


	var inherent = [Math, RegExp, Number]
	inherent.forEach(function(val) {

	it.skip("serializes the built-in ECMA Object: "+val, function() {
			Object.getOwnPropertyNames(global[val]).forEach(function() {

				expect(up.toString(global[val])).to.equal(global[val].toString())
		  })
	  })
  })
})
