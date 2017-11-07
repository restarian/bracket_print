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
	// This removes the id from the amdefine definition so that the library can be loaded as anonymous (brace_umd does this at run-time).
	"onBuildWrite": function (moduleName, path, contents) {
		// This removes the id from the amdefine definition so that the library can be loaded as anonymous (brace_umd does this at run-time).
		return contents.replace(RegExp("[\",\']"+ config.name + "[\",\']\,"), "")
	},
	"keepAmdefine": true,
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({mangle: {properties: false}})
}

