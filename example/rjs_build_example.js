// Creates the browser example file.
{
	"baseUrl": "../build",
	"name": "bracket_print",
	"out": "browser_example.html",
	"paths": {
		// Do this to avoid re-naming the module to bracket_print_umd.
		"bracket_print": "bracket_print_umd",
	},
	"wrap": {
		"start": "<html><title>Bracket Print Example</title><body><div id='example'><h2><center>Open the console window to see more output.</center></h2></div><script type=\"text/javascript\">",
		"end": nodeRequire("fs").readFileSync(nodeRequire("path").join(config.baseUrl, "node_example.js")).toString() + "</script></body></html>"
	},
	"optimize": "none",
	"keepAmdefine": true,
	"keepBuildDir": true,
	"writeBuildTxt": false,
}

