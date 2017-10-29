var requirejs = require("requirejs")

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./lib/bracket_print.js"], function(print) {

var up = print("Print is here")
//print.prototype.platform = "terminal"
console.log(up.sp("???????", {cool: "joes"}).set_option({use_style: false}).sp("*****").toStyleString())
//up.set_option({level: 2}).sp("???????", {cool: "joes"}).log(22233, "*****")
})

