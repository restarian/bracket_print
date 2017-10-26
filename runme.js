var requirejs = require("requirejs")

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["./build/bracket_print.js"], function(print) {

var up = print("Print is here")
//print.prototype.platform = "terminal"
//up.sp("???????", {cool: "joes"}).log(22233, "*****")

})

