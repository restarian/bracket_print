var requirejs = require("requirejs")

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(print) {

var up = new print("Print is here")
//print.prototype.platform = "terminal"
//console.log(up.sp("???????", {cool: "joes"}).sp(true).toStyleString())
console.log(up.sp("???????", {cool: "joes"}).option({style: false}).sp(true, null).option({style: true}).toStyleString())
//up.option({level: 2}).sp("???????", {cool: "joes"}).log(22233, "*****")
})

