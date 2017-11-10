var requirejs = require("requirejs")
var expect = require("chai").expect

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(Print) {

var up = new Print("Print is here", {indent_function: false, compression: 2, title: false})



var a = function aaa(cool, joes) {

		var a = "ddd"






		var b = "ddd"





			var c = "ddd"
}

//up.log({cool: a})//.to.equal('function (cool) {\n    \tvar a = "ddd"\n    var b = "ddd"\n    var c = "ddd"\n}')
up.log(a)//.to.equal('function (cool) {\n    \tvar a = "ddd"\n    var b = "ddd"\n    var c = "ddd"\n}')
//expect(up.toString(a, {cool: {joe: a}})

})

