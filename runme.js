var requirejs = require("requirejs")
var expect = require("chai").expect

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(Print) {

var up = new Print("Print is here")

var a = function(cool) { 
		var a = "ddd"
var b = "ddd"
var c = "ddd"
}


	var p = Print().s()
	Print.prototype.log_level = 6 
	//console.log(up.log_level)
	console.log(p.log_level)
	p.clear()
	console.log(p.log_level)
	return
	//up.log_level = 2
	//p.log_level = 2
	p.option({level: 2})
	console.log(up.log_level)
	console.log(p.log_level)
	up.clear()	
	p.clear()
	console.log(up.log_level)
	console.log(p.log_level)

	Print.prototype.log_level = 11 
	up.clear()	
	p.clear()
	console.log(up.log_level)
	console.log(p.log_level)

})

