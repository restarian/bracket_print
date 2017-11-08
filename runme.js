var requirejs = require("requirejs")
var expect = require("chai").expect

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(print) {

var up = new print("Print is here")

var a = function(cool) { 
		var a = "ddd"
var b = "ddd"
var c = "ddd"
}

	var p = print().s
	console.log(p().option({log_level: "3"}).log_level)

})

