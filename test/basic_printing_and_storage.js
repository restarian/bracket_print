var chai = require("chai"),
expect = chai.expect,
path = require("path")

var Print = require("../build/bracket_print_umd.js")

describe("Internal storage", function() {

	var s
	//Print.prototype.level = ""

	beforeEach(function() {

		s = Print({compress_level: 4}).s({cool: 'joes'})
	})

	it("serializes the ECMA Object types while also using toString correctly", function() {

		expect(s.toString(true)).to.equal('{"cool":"joes"} true')
		expect(s.toString(false)).to.equal('{"cool":"joes"} true false')
		expect(s.clone().toString(0)).to.equal('0')
		expect(s.clone().toString(-0)).to.equal('0')
		expect(s.toString(1)).to.equal('{"cool":"joes"} true false 1')
		expect(s.empty().toString(-99)).to.equal('-99')
		expect(s.clone().toString(null)).to.equal('null')
		expect(s.clone().toString(undefined)).to.equal('undefined')
		expect(s.clone().toString(5*"f")).to.equal('NaN')
	})

	it("serializes the ECMA arguments object", function() {

		void function() {
			expect(s.empty().toString(arguments)).to.to.equal('{"0":null,"1":1,"2":true,"3":"A string","4":"","5":undefined}')
			expect(s.empty().clone({quote_qualifier: false}).toString(arguments)).equal('{0:null,1:1,2:true,3:"A string",4:"",5:undefined}')
			expect(s.clone({quote_qualifier: false, denote_quoting: ""}).toString(arguments)).to.equal('{0:null,1:1,2:true,3:A string,4:,5:undefined}')
		}(null, 1,true, "A string", "", undefined)
	})

	it("serializes Error instances and Objects", function() {

		expect(s.empty().toString(new Error("Cool error"))).to.include("Cool error")
		expect(s.empty().toString(new Error("more error"))).to.include(__filename)
	})

	it("serializes native ECMA Objects", function() {

		expect(s.empty().option({compress_level: 4}).s(Function).toString()).to.equal('function Function(){ [native code] }')
		expect(s.empty().option({compress_level: 3}).s(Number).toString()).to.equal('function Number() {\n [native code] \n}')
		expect(s.empty().option({compress_level: 2}).s(String).toString()).to.equal('function String() { \n    [native code] \n}')
		expect(s.empty().option({compress_level: 2}).s(RegExp).toString()).to.equal('function RegExp() { \n    [native code] \n}')

		expect(s.empty().option({compress_level: 4}).toString(Object).toString()).to.equal('function Object(){ [native code] }')
		expect(s.empty().option({compress_level: 3}).s(Object).toString()).to.equal('function Object() { \n [native code]  }')
		expect(s.empty().option({compress_level: 2}).s(Object).toString()).to.equal('function Object() { \n    [native code] \n}')
		expect(s.empty().option({compress_level: 1}).toString(Object).toString()).to.equal('function Object() { \n    [native code] \n}')

		expect(s.empty().s(Buffer("Brackit")).toString()).to.equal('Brackit')
		expect(s.empty().option({truncate_function: true}).s(Buffer("Brackit")).toString()).to.equal('Brackit')
	})

	it("serializes objects with odd property qualifiers", function() {

		expect(s.option({}).toString()).to.equal('{"cool":"joes"}')
		// TODO: add comma before an Object if the last print command was to serialize.
		expect(s.s({undefined: undefined, null: null, a: "f"*2}).toString())
			.to.equal('{"cool":"joes"} {"undefined":undefined,"null":null,"a":NaN}')
	})

	it("serializes primitve Objects", function() {
		s.empty()
		expect(s.clone({compress_level: 4}).toString(new Number(43))).to.equal('{[[PrimitiveValue]]:43}')
		expect(s.clone({compress_level: 4}).toString(new String("B"))).to.equal('{[[PrimitiveValue]]:"B","0":"B",length:1}')
		expect(s.clone({compress_level: 4}).toString(new Boolean("BOB"))).to.equal('{[[PrimitiveValue]]:true}')
		expect(s.clone({compress_level: 4}).toString(new Boolean(0))).to.equal('{[[PrimitiveValue]]:false}')
		expect(s.clone({compress_level: 4}).toString(new Number("33"))).to.equal('{[[PrimitiveValue]]:33}')
		expect(s.clone({compress_level: 4}).toString(new Number())).to.equal('{[[PrimitiveValue]]:0}')
		expect(s.clone({compress_level: 4}).toString(new Object("dd"))).to.equal('{[[PrimitiveValue]]:"dd","0":"d","1":"d",length:2}')
		expect(s.clone({compress_level: 4}).toString(new Object({"aa": 4}))).to.equal('{"aa":4}')
		expect(s.clone({compress_level: 4}).toString(new Object())).to.equal('{}')
		expect(s.clone({compress_level: 4}).toString(new Object(undefined))).to.equal('{}')
		expect(s.clone({compress_level: 4}).toString(new Object(null))).to.equal('{}')
	})

	it("serializes primitve Objects with added properties", function() {

		var obj = new Number()
		obj.one = 1
		var obj_a = new Object("aa")
		obj_a.prop_a = true
		expect(Print().option({compress_level: 4}).toString(obj)).to.equal('{[[PrimitiveValue]]:0,"one":1}')
		expect(Print().option({compress_level: 4}).toString(obj_a)).to.equal('{[[PrimitiveValue]]:"aa","0":"a","1":"a","prop_a":true,length:2}')
	})

	it("Clears stored text data with the empty() command", function() {

		s.empty()
		expect(s.s("Brackit Print").toString()).to.equal("Brackit Print")
		s.empty()
		expect(s.s("Brackit Print").toString()).to.equal("Brackit Print")
		expect(s.s("Go!").toString()).to.equal("Brackit Print Go!")
		expect(s.empty().s("Fub").toString()).to.equal("Fub")
		expect(s.empty().toString()).to.equal("")
	})
})
