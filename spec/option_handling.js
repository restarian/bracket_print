var chai = require("chai"),
expect = chai.expect
var Print = require("../lib/print")

describe("Options", function() {
	var s

	beforeEach(function() {
		s = Print("Heading one")
		s.compress_level = Infinity // Compression to the max! :)
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


	it("quotes are used properly", function() {
		expect(s.set_option({denote_quoting: "\'"}).sp({here: "there"}).toString()) .to.equal("{'here':'there'}")
		expect(s.set_option({denote_quoting: "\""}).sp({here: "there"}).toString()) .to.equal("{\"here\":\"there\"}")
		expect(s.set_option({denote_quoting: ""}).sp({here: "there"}).toString()) .to.equal("{here:there}")
		expect(s.set_option({denote_quoting: "~"}).sp({here: "there"}).toString()) .to.equal("{~here~:~there~}")
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
			.to.equal('{"level":{"num":5,"level":{"num":4,"level":[Object with 2 properties]}}}')
		//expect(s.set_option({compress_level: 4, max_depth: 3}).sp(a).toString())
		//	.to.equal('{"level":{"num":5,"level":{"num":4,"level":[Object with 2 properties]}}}')
	})
})
