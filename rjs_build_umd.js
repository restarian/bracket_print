{
	"baseUrl": "./lib",
	"name": "bracket_print",
	"out": "build/bracket_print_umd.js",
	"paths": {
		"brace_prototype": nodeRequire("brace_prototype") && module.children[module.children.length-1].filename.substr(0, module.children[module.children.length-1].filename.length-3)

	},
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({output: {beautify: false}, mangle: {properties: false}}),
	"wrap": {
		"start": nodeRequire("brace_umd").wrap_start,
		"end": nodeRequire("brace_umd").wrap_end_option({"auto_anonymous": true})
	}
}

