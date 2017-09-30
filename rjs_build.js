{
	"baseUrl": "./lib",
	"name": "bracket_print",
	"out": "build/bracket_print.js",
	"packages": [ 
		{
			"name": "brace_prototype",
			"main": nodeRequire("brace_prototype") && nodeRequire("path").basename(module.children[module.children.length-1].filename),
			"location": nodeRequire("path").join(nodeRequire("path").dirname(module.children[module.children.length-1].filename), "/../lib"),
		}
	],
	//"optimize": "uglify2",
	"optimize": "none",
	//"uglify2": nodeRequire("brace_umd").build_option_extend({output: {beautify: true}, compress: {mangle: {properties: false}}}),
//	"uglify2": nodeRequire("brace_umd").build_option_extend({output: {beautify: true}}),
	"wrap": {
		"start": nodeRequire("brace_umd").wrap_start,
		"end": nodeRequire("brace_umd").wrap_end
	}
}

