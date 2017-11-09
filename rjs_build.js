{
	"baseUrl": "./lib",
	"name": "bracket_print",
	"out": "build/bracket_print.js",
	"packages": [ 
		{
			"name": "brace_prototype",
			"main":  nodeRequire("path").basename(nodeRequire.resolve("brace_prototype")),
			"location": nodeRequire("path").dirname(nodeRequire.resolve("brace_prototype")),
		}
	],
	// This removes the id from the amdefine definition so that the library can be loaded as anonymous (brace_umd does this at run-time).
	"onBuildWrite": function (moduleName, path, contents) {
		// This removes the id from the amdefine definition so that the library can be loaded as anonymous (brace_umd does this at run-time).
		return contents.replace(RegExp("[\",\']"+ config.name + "[\",\']\,"), "")
	},
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({mangle: {properties: false}}),
	// There is no reason not to include this in the library build sense it will be optimized again in distribution of whatever module uses it.
	"keepAmdefine": true,
	"writeBuildTxt": false
}

