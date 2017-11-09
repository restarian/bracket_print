{
	"baseUrl": "./lib",
	"name": "bracket_print",
	"out": "build/bracket_print_umd.js",
	"paths": {
		// The distributable has the brace_prototype module included so it is mapped to its nearest location. The .js is removed because it is omitted 
		// in the library definition as well.
		"brace_prototype": nodeRequire.resolve("brace_prototype").slice(0, -3)
	},
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({mangle: {properties: false}}),
	"wrap": {
		"start": nodeRequire("brace_umd").wrap_start,
		// Add an anonymous definition.
		"end": nodeRequire("brace_umd").wrap_end_option({"auto_anonymous": true})
	},
	"writeBuildTxt": false
}

