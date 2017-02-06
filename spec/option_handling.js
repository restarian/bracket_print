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

	it("create the desired prototype chain and utilize redundancy", function() {

		var up = Print(), option = up._mutable_options

		expect(up.level).to.deep.equal(option.level)
		Print.prototype.level = 15
		expect(up.level).to.deep.equal(15)

		var a = up.new_copy({level: 8, enumerate_all: true, character_limit: 1332})
		var b = a.new_copy({level: 12})

		expect(a.level).to.deep.equal(8)
		expect(b.level).to.deep.equal(12)
		expect(up.level).to.deep.equal(15)
		//expect(a).to.deep.equal()
	})
	it("store and transfers the log_title in many ways", function() {

		expect(s.set_option({}).log_title).to.equal("Heading one")
		expect(s.log_title).to.equal("Heading one")
		expect(s.new_copy().log_title).to.equal("Heading one")
		expect(s.new_copy({}, {}).log_title).to.equal("Heading one")
		expect(s.new_copy({}, {}).log_title).to.equal("Heading one")
		expect(s.new_copy({}, {}, "COOL TITLE").log_title).to.equal("COOL TITLE")
		expect(s.set_option({log_title: "Heading two"}).log_title).to.equal("Heading two")
		expect(s.new_copy({use_title_stamp: false}).log_title).to.equal("Heading one")

		expect(Print("TITLE A")._mutable_options.log_title).to.equal("TITLE A")
		expect(Print("TITLE B").new_copy().new_copy({}).set_option({}).set_option()._mutable_options.log_title).to.equal("TITLE B")

	})
	it("copies settings to new instances of itself", function() {

		expect(Print()._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		expect(Print().set_option()._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		expect(Print().set_option({},{})._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		expect(Print().set_option({},{}).new_copy()._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		Print.prototype.level = 88
		expect(Print().set_option({},{}).new_copy()._mutable_options).to.not.deep.equal(Print().__proto__.__proto__)

		expect(s._mutable_options).to.deep.equal(s.new_copy()._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s)._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option()._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option({})._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option({})._mutable_options).to.deep.equal(Print(s.new_copy({}))._mutable_options)
		expect(s.new_copy({})._mutable_options).to.deep.equal(Print(s.new_copy({}))._mutable_options)

		expect(s.new_copy({}).set_option({}).add()._mutable_options).to.deep.equal(Print(s.new_copy({}))._mutable_options)
		expect(s.new_copy({}, {}, s.log_title)._mutable_options).to.deep.equal(Print(s.new_copy({}))._mutable_options)
	})
	it("quoting can be changed and is used properly", function() {

		expect(s.set_option({denote_quoting: "\'"}).sp({15: 44,here: "there"}).toString()) .to.equal("{'15':44,'here':'there'}")
		expect(s.set_option({denote_quoting: "\""}).sp({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
		expect(s.set_option({denote_quoting: ""}).sp({1:44,here: "there"}).toString()) .to.equal("{1:44,here:there}")
		s.denote_quoting = "~"
		expect(s.set_option({denote_quoting: "~"}).sp({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")
		s.denote_quoting = "\""
		expect(s.sp({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
	})
	it("enumerate_all option has desire effect", function() {

		//expect(s.clear().set_option({denote_quoting: "~"}).sp({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")

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
		void function make(obj, cnt) {

		  if ( cnt > -1 ) {
		    obj.level = { "num": --cnt}
        for ( var x = 0; x < cnt; x+=2 ) {
		      obj["prop_"+x] = "a property"
		      obj["prop_"+(x+1)] = x*x
        }

		    make(obj.level, cnt)
		  }
		}(a = {}, 6)

		expect(Print().set_option({compress_level: 4, depth_limit: 1}).sp(a).toString())
			.to.equal('{"level":[[Object with 6 properties]],"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
		expect(Print().set_option({compress_level: 4, depth_limit: 2}).sp(a).toString())
			.to.equal('{"level":{"num":5,"level":[[Object with 6 properties]],"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
		expect(Print().clear().set_option({compress_level: 4, depth_limit: 3}).sp(a).toString())
			.to.equal('{"level":{"num":5,"level":{"num":4,"level":[[Object with 4 properties]],"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
	})
})
