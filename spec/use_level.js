#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Use_level option", function() {
	var s

	beforeEach(function() {
		s = Print()
		s.compress_level = Infinity // Compression to the max! :)
	})

	it.only("parses the value set to the use_level property and convertes it to the appropriate value.", function() {

		var default_use_level_value = [-Infinity, Infinity]
		expect(s.use_level).to.deep.equal(default_use_level_value)
		Print.prototype.use_level = "0-5"
		expect(s.use_level).to.deep.equal([0, 5])

		console.log(s.use_level)
		s.use_level = default_use_level_value
		console.log(s.use_level)
		expect(s.use_level).to.deep.equal(default_use_level_value)
	/*
		Print.prototype.use_level = "5 -5"
		expect(s.use_level).to.deep.equal([5, 5])

		Print.prototype.use_level = "2 -  3"
		expect(s.use_level).to.deep.equal([2, 3])
		Print.prototype.use_level = "0 -  37,"
		expect(s.use_level).to.deep.equal([0, 37])
		Print.prototype.use_level = "0 -  37,40"
		expect(s.use_level).to.deep.equal([0, 37, 40, 40])
		Print.prototype.use_level = "2, 0 -  37,40,"
		expect(s.use_level).to.deep.equal([2, 2, 0, 37, 40, 40])
		Print.prototype.use_level = "2, 0 -  37,40,70-71"
		expect(s.use_level).to.deep.equal([2, 2, 0, 37, 40, 40, 70, 71])
		s.use_level = "0 -  37,40"
		expect(s.use_level).to.deep.equal([0, 37, 40, 40])
		expect(s.__proto__.use_level).to.deep.equal([2, 2, 0, 37, 40, 40, 70, 71])
		Print.prototype.use_level = "7"
		var a = Print({level: 7})
		expect(a.sp(false).toString()).to.equal("false")
		var b = Print({level: 8})
		expect(b.sp(false).toString()).to.equal("")
*/
	})

	it("Set level control to disable print commands", function() {
		Print.prototype.use_level = 3
		var str = s.sp()

		expect(str.set_option({level: 5}).sp("Some text").toString()) .to.equal("")
		expect(str.set_option({level: 4}).sp("Some text").toString()) .to.equal("")
		expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text")
		expect(str.set_option({level: 2}).sp("Some text").toString()) .to.equal("Some text")
		expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text Some text")

		str.clear()
		Print.prototype.use_level = "0-3, 6, 99"

		expect(str.set_option({level: 1}).sp("Some text").toString()) .to.equal("Some text")
		expect(str.set_option({level: 2}).sp("Some text").toString()) .to.equal("Some text Some text")
		expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text Some text Some text")
		expect(str.set_option({level: 4}).sp("Some text").toString()) .to.equal("Some text Some text Some text")
		expect(str.set_option({level: 6}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text")
		expect(str.set_option({level: 7}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text")
		expect(str.set_option({level: 99}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text")

		Print.prototype.use_level = ""
		expect(str.set_option({level: -199}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text")
		expect(str.set_option({level: 420}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text Some text")

		var str = s.sp()
		Print.prototype.use_level = 3
		Print.prototype.use_level = ",0-2, 0-2, 1-3,,6,"

		expect(str.set_option({level: 1}).sp("*").toString()) .to.equal("*")
		expect(str.set_option({level: 2}).sp("*").toString()) .to.equal("* *")
		expect(str.set_option({level: 3}).sp("*").toString()) .to.equal("* * *")
		expect(str.set_option({level: 4}).sp("*").toString()) .to.equal("* * *")
		expect(str.set_option({level: 5}).sp("*").toString()) .to.equal("* * *")
		expect(str.set_option({level: 6}).sp("*").toString()) .to.equal("* * * *")
		expect(str.set_option({level: 7}).sp("*").toString()) .to.equal("* * * *")

	})
	it("store the log_title correctly in many ways", function() {

		expect(s.set_option({}).log_title).to.equal("Heading one")
		expect(s.log_title).to.equal("Heading one")
		expect(s.new_copy().log_title).to.equal("Heading one")
		expect(s.log_title).to.equal("Heading one")
		expect(s.set_option({log_title: "Heading two"}).log_title).to.equal("Heading two")
		expect(s.log_title).to.equal("Heading one")
		expect(s.new_copy({use_title_stamp: false}).log_title).to.equal("Heading one")
	})

	it("copy to new instances", function() {

		expect(s._mutable_options).to.deep.equal(s.new_copy()._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s)._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option()._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option({})._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option({})._mutable_options).to.deep.equal(Print(s.new_copy({}))._mutable_options)
	})


	it("quoting can be changed and is used properly", function() {
		expect(s.set_option({denote_quoting: "\'"}).sp({15: 44,here: "there"}).toString()) .to.equal("{'15':44,'here':'there'}")
		expect(s.set_option({denote_quoting: "\""}).sp({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
		expect(s.set_option({denote_quoting: ""}).sp({1:44,here: "there"}).toString()) .to.equal("{1:44,here:there}")
		expect(s.set_option({denote_quoting: "~"}).sp({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")
	})

	it("max_character setting is adhered to", function() {
		var b = []
		for ( var a = 0; a < 100; a++ )
			b[Math.random()] = Math.random()

		expect(s.new_copy().set_option({compress_level: 1, character_limit: 1742}).sp(Buffer).toString().length).to.equal(1742)
		expect(s.new_copy().set_option({compress_level: 1, character_limit: 123}).sp(b).toString().length).to.equal(123)
		expect(s.new_copy().set_option({compress_level: 2, character_limit: 101}).sp(b).toString().length).to.equal(101)
		expect(s.new_copy().set_option({compress_level: 3, character_limit: 189}).sp(b).toString().length).to.equal(189)
		expect(s.new_copy().set_option({compress_level: 4, character_limit: 8}).sp(b).toString().length).to.equal(8)
		expect(s.new_copy().set_option({compress_level: 1, character_limit: 1}).sp(b).toString().length).to.equal(1)
		expect(s.new_copy().set_option({compress_level: 2, character_limit: 1}).sp(b).toString().length).to.equal(1)
		expect(s.new_copy().set_option({compress_level: 3, character_limit: 1}).sp(b).toString().length).to.equal(1)
		expect(s.new_copy().set_option({compress_level: 4, character_limit: 1}).sp(b).toString().length).to.equal(1)
	})

	it("utilize the depth_limit", function() {

		var a
		void function(obj, cnt) {
		  if ( cnt > -1 ) {
		    obj.level = { "num": --cnt}
		    arguments.callee(obj.level, cnt)
		  }
		}(a = {}, 6)

		expect(s.set_option({compress_level: 4, depth_limit: 3}).sp(a).toString())
			.to.equal('{"level":{"num":5,"level":{"num":[[Object with 2 properties]],"level":[[Object with 2 properties]]}}}')
		//expect(s.set_option({compress_level: 4, depth_limit: 3}).sp(a).toString())
		//	.to.equal('{"level":{"num":5,"level":{"num":4,"level":[Object with 2 properties]}}}')
	})
})
