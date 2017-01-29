var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Options", function() {
	var s

	beforeEach(function() {
		s = Print("Heading one")
		s.compress_level = Infinity // Compression to the max! :)
	})

	it("parses the set_level property and sets it correctly", function() {

		Print.prototype.set_level = 4
		expect(s.set_level).to.deep.equal([4, 4])
		Print.prototype.set_level = "0-5"
		expect(s.set_level).to.deep.equal([0, 5])
		Print.prototype.set_level = "5 -5"
		expect(s.set_level).to.deep.equal([5, 5])
		Print.prototype.set_level = "2 -  3"
		expect(s.set_level).to.deep.equal([2, 3])
		Print.prototype.set_level = "0 -  37,"
		expect(s.set_level).to.deep.equal([0, 37])
		Print.prototype.set_level = "0 -  37,40"
		expect(s.set_level).to.deep.equal([0, 37, 40, 40])
		Print.prototype.set_level = "2, 0 -  37,40,"
		expect(s.set_level).to.deep.equal([2, 2, 0, 37, 40, 40])
		Print.prototype.set_level = "2, 0 -  37,40,70-71"
		expect(s.set_level).to.deep.equal([2, 2, 0, 37, 40, 40, 70, 71])
	})

	it("Set level control to disable print commands", function() {
		Print.prototype.set_level = 3
		var str = s.sp()

		expect(str.set_option({level: 5}).sp("Some text").toString()) .to.equal("")
		expect(str.set_option({level: 4}).sp("Some text").toString()) .to.equal("")
		expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text")
		expect(str.set_option({level: 2}).sp("Some text").toString()) .to.equal("Some text")
		expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text Some text")

		str.clear()
		Print.prototype.set_level = "0-3, 6, 99"

		expect(str.set_option({level: 1}).sp("Some text").toString()) .to.equal("Some text")
		expect(str.set_option({level: 2}).sp("Some text").toString()) .to.equal("Some text Some text")
		expect(str.set_option({level: 3}).sp("Some text").toString()) .to.equal("Some text Some text Some text")
		expect(str.set_option({level: 4}).sp("Some text").toString()) .to.equal("Some text Some text Some text")
		expect(str.set_option({level: 6}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text")
		expect(str.set_option({level: 7}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text")
		expect(str.set_option({level: 99}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text")

		Print.prototype.set_level = ""
		expect(str.set_option({level: -199}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text")
		expect(str.set_option({level: 420}).sp("Some text").toString()) .to.equal("Some text Some text Some text Some text Some text Some text Some text")

		var str = s.sp()
		Print.prototype.set_level = 3
		Print.prototype.set_level = ",0-2, 0-2, 1-3,,6,"

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
	})

	it("copy to new instances", function() {

		expect(s._mutable_options).to.deep.equal(s.new_copy()._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s)._mutable_options)
		expect(s._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option()._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
		expect(s.set_option({})._mutable_options).to.deep.equal(Print(s.new_copy())._mutable_options)
	})


	it("quoting can be changed and is used properly", function() {
		expect(s.set_option({denote_quoting: "\'"}).sp({15: 44,here: "there"}).toString()) .to.equal("{'15':44,'here':'there'}")
		expect(s.set_option({denote_quoting: "\""}).sp({1:44,here: "there"}).toString()) .to.equal("{\"1\":44,\"here\":\"there\"}")
		expect(s.set_option({denote_quoting: ""}).sp({1:44,here: "there"}).toString()) .to.equal("{1:44,here:there}")
		expect(s.set_option({denote_quoting: "~"}).sp({1:44,here: "there"}).toString()) .to.equal("{~1~:44,~here~:~there~}")
	})

	it("max_character setting is adhered to", function() {
		var b = []
		for ( var a = 0; a < 100; a++ ) {
			b[Math.random()] = Math.random()
		}
		expect(s.new_copy().set_option({compress_level: 1, max_characters: 123}).sp(b).toString().length).to.equal(123)
		expect(s.new_copy().set_option({compress_level: 2, max_characters: 101}).sp(b).toString().length).to.equal(101)
		expect(s.new_copy().set_option({compress_level: 3, max_characters: 189}).sp(b).toString().length).to.equal(189)
		expect(s.new_copy().set_option({compress_level: 4, max_characters: 8}).sp(b).toString().length).to.equal(8)
		expect(s.new_copy().set_option({compress_level: 1, max_characters: 1}).sp(b).toString().length).to.equal(1)
		expect(s.new_copy().set_option({compress_level: 2, max_characters: 1}).sp(b).toString().length).to.equal(1)
		expect(s.new_copy().set_option({compress_level: 3, max_characters: 1}).sp(b).toString().length).to.equal(1)
		expect(s.new_copy().set_option({compress_level: 4, max_characters: 1}).sp(b).toString().length).to.equal(1)
	})

	it("utilize the max_depth", function() {

		var a
		void function(obj, cnt) {
		  if ( cnt > -1 ) {
		    obj.level = { "num": --cnt}
		    arguments.callee(obj.level, cnt)
		  }
		}(a = {}, 6)

		expect(s.set_option({compress_level: 4, max_depth: 3}).sp(a).toString())
			.to.equal('{"level":{"num":5,"level":{"num":[Object with 2 properties],"level":[Object with 2 properties]}}}')
		//expect(s.set_option({compress_level: 4, max_depth: 3}).sp(a).toString())
		//	.to.equal('{"level":{"num":5,"level":{"num":4,"level":[Object with 2 properties]}}}')
	})
})
