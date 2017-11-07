var requirejs = require("requirejs")

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

//print.prototype.platform = "terminal"
//console.log(up.sp("???????", {cool: "joes"}).sp(true, null).toString())
//console.log(up.sp("???????", {cool: "joes"}).option({style: false}).sp(true, null).option({style: true}).toStyleString())
//up.option({level: 1}).sp("???????", {cool: "joes"}).log(22233, "*****", null, true)
//up.option({level: 1}).sp({}).log()
//up.empty().option({level: 1}).sp("???????", {cool: "joes"}).log(22233, "*****", null, true)
//console.log(print({compress_level: 4, value_buffer: "toString", enumerate_all: true}).s(Buffer("ffffffffffff")).toString(false))
//console.log(up.option({enumerate_all: false, compress_level: 1}).s({cool: a, here: {cool:a}}).log().toString().length)

//var up = bracket_print
//up.log_level = "1,3-10"
//console.log(up.log_level)

up.log(null) // <- logs: [Print is here - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  null

up.option("Not me", {log_title: "not this one"}, "This one").log(false) // <-- logs [This one - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  false

up.option("Here I am", {log_title: "not this one"}).log(undefined) // <-- logs [Here I am - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  undefined

up.option({log_title: "This title"}).log(null) // <-- logs [This title - Tue Nov 07 2017 17:26:36 GMT-0500 (STD)]  null

})

