{
	// This will add the directory of this build file as a path to the NODE_PATHS list so that any module dependencies can be loaded via nodeRequire.
	// It is therefor a good idea to put this build config in the same directory as the package.json file.
	"_init": !!module.paths.unshift(nodeRequire("path").join(config.baseUrl, "node_modules")),
	"baseUrl": "lib",
	"dir": "build",
	"onBuildRead": function (module_name, module_path, content) { 
		// This is how a module is built which has dependency modules which use brace_umd. The non-brace_umd module version is used instead when a module is 
		// loaded which was a brace_umd built module (it will contain a _umd.js suffix). It is assumed that any module which contains a _umd.js suffix is 
		// a brace_umd wrapped module.
		return /.+_umd\.js$/.test(module_path) && nodeRequire("fs").existsSync(module_path.replace(/_umd\.js$/, ".js")) && 
				nodeRequire("fs").readFileSync(module_path.replace(/_umd\.js$/, ".js")).toString() || content
	},
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({mangle: {properties: false}}),
	"keepAmdefine": true,
	"keepBuildDir": true,
	"writeBuildTxt": false,
}

