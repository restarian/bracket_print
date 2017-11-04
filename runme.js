var requirejs = require("requirejs")

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(print) {

var up = new print("Print is here")
//print.prototype.platform = "terminal"
//console.log(up.sp("???????", {cool: "joes"}).sp(true, null).toString())
//console.log(up.sp("???????", {cool: "joes"}).option({style: false}).sp(true, null).option({style: true}).toStyleString())
//up.option({level: 1}).sp("???????", {cool: "joes"}).log(22233, "*****", null, true)
//up.option({level: 1}).sp({}).log()
//up.empty().option({level: 1}).sp("???????", {cool: "joes"}).log(22233, "*****", null, true)
//console.log(print({compress_level: 4}).sp({cool: "joes"}).toString(false))
console.log(up.option({compress_level: 4}).sp(new Number(43)).toString())
//console.log(up.option({compress_level: 4}).toString(new Number(43)))
})

