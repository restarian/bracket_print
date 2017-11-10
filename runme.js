var requirejs = require("requirejs")
var expect = require("chai").expect

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(Print) {

var up = new Print("Print is here", {truncate_function: false, shift_function_body: false, compression: 1, title: false})



var b = function (cool, joes) { 




					var a = "ddd"






							var b = "ddd"





					var c = "ddd"
					


}



var a = function(here, there) {

	var a = "dd"
		var b = true



	
	var c = true

		
		}

up.option({compression: 2, shift_function_body: false}).log(a)
		//var .spawn({indentation_string: "---", shift_function_body: false})
//		expect(up.option({compression: 1}).toString(a)).to.equal('function ( here, there ) {\n\nvar a = \"dd\"\n\tvar b = true\nvar c = true\n}')
	
//up.log({cool: a})//.to.equal('function (cool) {\n    \tvar a = "ddd"\n    var b = "ddd"\n    var c = "ddd"\n}')
//console.log(up.toString(a))//.to.equal('function (cool) {\n    \tvar a = "ddd"\n    var b = "ddd"\n    var c = "ddd"\n}')
//up.log({cool: {joe: a}}, true)

})

