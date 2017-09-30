var requirejs = require("requirejs")

requirejs.config({
	baseUrl: "./",
//	nodeRequire: require,
})

requirejs(["require", "./build/bracket_print.js"], function(req) {

var up = req("bracket_print")
//up.prototype.platform = "terminal"

up("ddddd").log(22233, "dsdsd")

})

