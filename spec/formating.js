#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Options", function() {
	var s

	beforeEach(function() {
		s = Print("Heading one")
		s.compress_level = Infinity // Compression to the max! :)
	})

	it.skip("Changes platforms", function() {

		var up = Print({platform: "browser"})
		expect(up.sp("TEXT").toColorString()).to.equal("%cTEXT"+up.bufferize.__proto__.__proto__[up.bufferize.theme].string)
	})

})
