#!/usr/bin/env npm test
var chai = require("chai"),
expect = chai.expect
var Print = require("../build/bracket_print_umd.js")

describe("Options", function() {

	var s

	beforeEach(function() {
		s = Print("Heading one")
		s.compress_level = Infinity // Compression to the max! :)
	})

	it.only("create the desired prototype chain and utilize redundancy", function() {

		var up = Print(), option = up.list()

		expect(up.level).to.equal(option.level)
		Print.prototype.level = 15
		expect(up.level).to.equal(15)

		var a = up.clone({level: 8, enumerate_all: true, character_limit: 1332})
		var b = a.clone({level: 12})

		expect(a.level).to.equal(8)
		expect(b.level).to.equal(12)
		expect(up.level).to.equal(15)
	})

	it("store and transfers the log_title in many ways", function() {

		expect(s.option({}).log_title).to.equal("Heading one")
		expect(s.log_title).to.equal("Heading one")
		expect(s.clone().log_title).to.equal("Heading one")
		expect(s.clone({}, {}).log_title).to.equal("Heading one")
		expect(s.clone({}, {}).log_title).to.equal("Heading one")
		expect(s.clone({}, {}, "COOL TITLE").log_title).to.equal("COOL TITLE")
		expect(s.option({log_title: "Heading two"}).log_title).to.equal("Heading two")
		expect(s.clone({use_title_stamp: false}).log_title).to.equal("Heading one")

		expect(Print("TITLE A")._mutable_options.log_title).to.equal("TITLE A")
		expect(Print("TITLE B").clone().clone({}).option({}).option()._mutable_options.log_title).to.equal("TITLE B")

	})
	it("copies settings to new instances of itself", function() {

		expect(Print()._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		expect(Print().option()._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		expect(Print().option({},{})._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		expect(Print().option({},{}).clone()._mutable_options).to.deep.equal(Print().__proto__.__proto__)
		Print.prototype.level = 88
		expect(Print().option({},{}).clone()._mutable_options).to.not.deep.equal(Print().__proto__.__proto__)

		expect(s._mutable_options).to.deep.equal(s.clone()._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s)._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s.clone())._mutable_options)
		expect(s.option()._mutable_options).to.deep.equal(Print(s.clone())._mutable_options)
		expect(s.option({})._mutable_options).to.deep.equal(Print(s.clone())._mutable_options)
		expect(s.option({})._mutable_options).to.deep.equal(Print(s.clone({}))._mutable_options)
		expect(s.clone({})._mutable_options).to.deep.equal(Print(s.clone({}))._mutable_options)

		expect(s.clone({}).option({}).add()._mutable_options).to.deep.equal(Print(s.clone({}))._mutable_options)
		expect(s.clone({}, {}, s.log_title)._mutable_options).to.deep.equal(Print(s.clone({}))._mutable_options)
	})
	it("quoting can be changed and is used properly", function() {

		expect(s.option({denote_quoting: "\'"}).s({15: 44,here: "there"}).toString()) .to.equal("{'15':44,'here':'there'}")
		expect(s.option({denote_quoting: "\""}).s({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
		expect(s.option({denote_quoting: ""}).s({1:44,here: "there"}).toString()) .to.equal("{1:44,here:there}")
		s.denote_quoting = "~"
		expect(s.option({denote_quoting: "~"}).s({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")
		s.denote_quoting = "\""
		expect(s.s({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
	})
	it("enumerate_all option has desire effect", function() {

		//expect(s.clear().option({denote_quoting: "~"}).s({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")

	})
	it("max_character setting is adhered to", function() {

		var b = []
		for ( var a = 0; a < 100; a++ )
			b[Math.random()] = Math.random()

		expect(s.clone().option({compress_level: 1, character_limit: 1742}).s(Buffer).toString().length).to.equal(1742)
		expect(s.clone().option({compress_level: 1, character_limit: 123}).s(b).toString().length).to.equal(123)
		expect(s.clone().option({compress_level: 2, character_limit: 101}).s(b).toString().length).to.equal(101)
		expect(s.clone().option({compress_level: 3, character_limit: 189}).s(b).toString().length).to.equal(189)
		expect(s.clone().option({compress_level: 4, character_limit: 8}).s(b).toString().length).to.equal(8)
		expect(s.clone().option({compress_level: 1, character_limit: 1}).s(b).toString().length).to.equal(1)
		expect(s.clone().option({compress_level: 2, character_limit: 1}).s(b).toString().length).to.equal(1)
		expect(s.clone().option({compress_level: 3, character_limit: 1}).s(b).toString().length).to.equal(1)
		expect(s.clone().option({compress_level: 4, character_limit: 1}).s(b).toString().length).to.equal(1)
	})
	it.only("utilize the depth_limit", function() {

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

		expect(s.option({depth_limit: 1}).s(a).toString())
			.to.equal('{"level":<..object with 6 properties>,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
		expect(s.option({depth_limit: 2}).s(a).toString())
			.to.equal('{"level":{"num":5,"level":<..object with 6 properties>,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
		expect(s.empty({depth_limit: 3}).s(a).toString())
			.to.equal('{"level":{"num":5,"level":{"num":4,"level":<..object with 4 properties>,"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4},"prop_0":"a property","prop_1":0,"prop_2":"a property","prop_3":4,"prop_4":"a property","prop_5":16}')
	})
})
