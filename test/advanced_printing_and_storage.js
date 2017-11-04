var chai = require("chai"),
expect = chai.expect
var Print = require("../build/bracket_print_umd.js")

describe("Internal storage", function() {

	var up 
	beforeEach(function() {

		print = Print({compress_level: 4}).s({cool: "joes"})
	})

	it.skip("serializes the global Object in the node environment and truncated it to 1.01 megabytes", function() {

		expect(up.clone({compress_level: 3, character_limit: 101000}).s(global).toString().length).to.equal(101000)
	})

	it("serializes objects with manually added __proto__ chains", function() {

		var a = {aa: "str", bb: "joes", __proto__: {here: 22, there: 55}}
		var b = {aa: "str", bb: "joes"}//, __proto__: {here: 22, there: 55}}
		var c = {__proto__: {here: 22, there: 55}}
		var d = {__proto__: {here: 22, __proto__: {cool: "joes", yep: 6}, there: 55}}
		// Create a top-level copy of the Print library which does not store text internally untill a print command is used.
		var up = print.clone()

		expect(up.s(a).toString()).to.equal('{"aa":"str","bb":"joes",__proto__:{"here":22,"there":55}}')
		expect(up.s(b).toString()).to.equal('{"aa":"str","bb":"joes"}')
		expect(up.s(c).toString()).to.equal('{__proto__:{"here":22,"there":55}}')
		expect(up.s(d).toString()).to.equal('{__proto__:{"here":22,"there":55,__proto__:{"cool":"joes","yep":6}}}')
		expect(up.s({}).toString()).to.equal('{}')

	})

	it("serializes objects with manually added empty __proto__ Objects", function() {

		var up = print.clone()

		// the __proto__ should always be last in the print.
		expect(up.toString({__proto__:{aa:4}})).to.equal('{__proto__:{"aa":4}}')
		expect(up.toString({__proto__:{bob:null},cool:"joes"})).to.equal('{"cool":"joes",__proto__:{"bob":null}}')
		expect(up.toString({here:undefined,__proto__:{bob:null},cool:"joes"})).to.equal('{"here":undefined,"cool":"joes",__proto__:{"bob":null}}')
		expect(up.toString({__proto__:{aa:[undefined, null, 0]},"0":[1,2,"a"]})).to.equal('{"0":[1,2,"a"],__proto__:{"aa":[undefined,null,0]}}')
		// Without keys in the prototype it will not be printed.
		expect(up.toString({__proto__:{}})).to.equal('{}')
		expect(up.toString({__proto__:{__proto__:{}}})).to.equal('{}')
	})

	it("serializes objects Object.prototype __proto__ chains", function() {
		
		var up = print.clone()
		var F = function() {
			this.cool = "joes"
		}

		F.prototype = {
			see: function() {
				Print().log("me")
			}
		}

		expect(up.toString(new F())).to.equal('{"cool":"joes",__proto__:{"see":function (){\t\t\t\tPrint().log("me")}}}')

		F.prototype = {
			see: function() {
				Print().log("me")
			},
			here: function() {
				Print().log("there")
			}
		}
		expect(up.toString(new F())).to.equal('{"cool":"joes",__proto__:{"see":function (){\t\t\t\tPrint().log("me")},"here":function (){\t\t\t\tPrint().log("there")}}}')
		var a = new F()
		a.more = "stuff"
		expect(up.toString(a)).to.equal('{"cool":"joes","more":"stuff",__proto__:{"see":function (){\t\t\t\tPrint().log("me")},"here":function (){\t\t\t\tPrint().log("there")}}}')

	})
})
