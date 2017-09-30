var requirejs = require("requirejs")

requirejs.config({
	baseUrl: "./",
	nodeRequire: require,
})

requirejs(["require", "./bracket_print"], function(require, up) {

	console.log(232332323, up)
	//up("sss").log()

})

