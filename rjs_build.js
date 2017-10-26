{
	"baseUrl": "./lib",
	"name": "bracket_print",
	"out": "build/bracket_print.js",
	"packages": [ 
		{
			"name": "brace_prototype",
			"main": nodeRequire("brace_prototype") && nodeRequire("path").basename(module.children[module.children.length-1].filename),
			"location": nodeRequire("path").dirname(module.children[module.children.length-1].filename),
		}
	],
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({output: {beautify: true}, compress: {mangle: {properties: false}}}),
	"wrap": {
		"start": nodeRequire("brace_umd").wrap_start,
		"end": nodeRequire("brace_umd").wrap_end_option({"auto_anonymous": true})
	}
}

