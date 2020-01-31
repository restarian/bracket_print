{
	"_init": module.paths.unshift(nodeRequire("path").join(config.baseUrl, "node_modules")),
	"name": nodeRequire("path").basename(config.baseUrl),
	"out": nodeRequire("path").join("build", nodeRequire("path").basename(config.baseUrl))+".js",
	"baseUrl": "lib",
	"onBuildRead": function (module_name, module_path, content) { 
		// This is how a module is built which has dependency modules which use brace_umd. The non-brace_umd module version is used instead when a module is 
		// loaded which was a brace_umd built module (it will contain a _umd.js suffix). It is assumed that any module which contains a _umd.js suffix is 
		// a brace_umd wrapped module. Note: this should only apply when using a require.resolve as a requirejs paths value.
		return /.+_umd\.js$/.test(module_path) && nodeRequire("fs").existsSync(module_path.replace(/_umd\.js$/, ".js")) && 
				nodeRequire("fs").readFileSync(module_path.replace(/_umd\.js$/, ".js")).toString() || content
	},
	"paths": {
		"brace_option": "empty:"
	},
	"optimize": "uglify",
	"uglify2": nodeRequire("brace_umd").build_option,
	"keepAmdefine": false,
	"keepBuildDir": true,
	"writeBuildTxt": false,
}

