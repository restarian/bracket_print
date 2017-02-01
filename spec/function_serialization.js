#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Functions", function() {
	var s

	beforeEach(function() {
		s = Print()
	})

	it("serializes functions and function Objects", function() {
var a = function() {

var a = "dd"


var b = true


}

		expect(s.set_option({compress_level: 1}).toString(a)).to.equal('function () { \n\n   var a = \"dd\"\n\n\n   var b = true\n\n\n\n}')
		expect(s.set_option({compress_level: 2}).toString(a)).to.equal('function () { \n\n   var a = \"dd\"\n\n   var b = true\n\n\n}')
		expect(s.set_option({compress_level: 3}).toString(a)).to.equal('function () { \n\nvar a = \"dd\"\n\nvar b = true\n\n }')
		expect(s.set_option({compress_level: 4}).toString(a)).to.equal('function (){var a = \"dd\"\nvar b = true}')

		expect(s.set_option({compress_level: 4, truncate_function: true}).toString(a)).to.equal('function (){...}')

	})

	it("serializes functions within JSON like data", function() {

var Fun = function() {
  Print().toString("Here")

}
Fun.prototype = {
  a: function() {
    Print().log("Here is a")
  },
  b: function() {
    Print().log("Here is b")
  }
}

		expect(s.set_option({compress_level: 4, truncate_function: true}).toString(new Fun())).to.equal('{__proto__:{"a":function (){...},"b":function (){...}}}')
		expect(s.set_option({compress_level: 4, truncate_function: true}).toString(Fun, new Fun())).to.equal('function (){...} {__proto__:{"a":function (){...},"b":function (){...}}}')
	})
})
