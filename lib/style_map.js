
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require"], function(require) {

	return {

		browser: {

			denote_line: "\n",
			denote_tab: "\t;",
			denote_space: " ",
			denote_add: "",
			use_theme_from: "html",
			default_theme: "light_1", 
			format: function(style_value, str, apply_args) {
				apply_args.push(style_value)
				return "%c"+str
			},
		},
		html: {

			denote_line: "<br>",
			denote_tab: "&#09;",
			denote_space: "&nbsp;",
			denote_add: "",
			default_theme: "light_1", 
			format: function(color_value, str) {
				return "<span style='"+color_value+";'>"+str+"</span>"
			},
			theme: {

				light_1: {
					quote: "color: #454343;",
					number: "color: green",
					string: "color: #b91db3",
					function_body: "color: #656565",
					nan: "color: #249e93",
					null: "color: #249e93",
					boolean: "color: red",
					comma: "color: #323232",
					undefined: "color: #f4d400",
					scope_container: "color: #286f4f",
					colon: "color: #363533",
					namespace: "color: #690900", 
					indent: "color: #c2bab8",
					title: "color: #0a0a0a",
					variable: "color: #4a6a27",

				},
				light_2: {
					quote: "color: #454343; font-weight: bold;",
					number: "color: green; font-weight: bold",
					string: "color: #b91db3; font-weight: bold",
					function_body: "color: #656565; font-weight: bold",
					nan: "color: #249e93; font-weight: bold",
					null: "color: #249e93; font-weight: bold",
					boolean: "color: red; font-weight: bold",
					comma: "color: #323232; font-weight: bold",
					undefined: "color: #f4d400; font-weight: bold",
					scope_container: "color: #286f4f; font-weight: bold",
					colon: "color: #363533; font-weight: bold",
					namespace: "color: #690900; font-weight: bold", 
					indent: "color: #c2bab8; font-weight: bold",
					title: "color: #0a0a0a; font-weight: bold",
					variable: "color: #4a6a27; font-weight: bold",

				},
				dark_1: {
					quote: "color: #d2d2d2",
					number: "color: green",
					string: "color: #e9e9e9",
					function_body: "color: #a7a7a7",
					nan: "color: yellow",
					null: "color: #5bc3ba; font-weight: bold",
					boolean: "color: red",
					comma: "color: #787878",
					undefined: "color: #e9d234",
					scope_container: "color: #80ab96",
					colon: "color: #dfd9b3",
					namespace: "color: #e05c50", 
					indent: "color: #373332",
					title: "color: #f2f2f2; font-weight: bold", variable: "color: #baeb83",

				},
				dark_2: {
					quote: "color: #d2d2d2; font-weight: bold",
					number: "color: green; font-weight: bold",
					string: "color: #e9e9e9; font-weight: bold",
					function_body: "color: #a7a7a7; font-weight: bold",
					nan: "color: yellow; font-weight: bold",
					null: "color: #5bc3ba; font-weight: bold; font-weight: bold",
					boolean: "color: red; font-weight: bold",
					comma: "color: #787878; font-weight: bold",
					undefined: "color: #e9d234; font-weight: bold",
					scope_container: "color: #80ab96; font-weight: bold",
					colon: "color: #dfd9b3; font-weight: bold",
					namespace: "color: #e05c50; font-weight: bold", 
					indent: "color: #373332; font-weight: bold",
					title: "color: #f2f2f2; font-weight: bold",
					variable: "color: #baeb83; font-weight: bold",

				},
			},
		 },
		 terminal: {

			denote_line: "\n", // The new line insert characters.
			denote_tab: "\t;", // The tab insert characters.
			denote_space: " ", // The space insert characters.
			default_theme: "light_1", // Use this to set theme and level to use if the requested one does not exist.
			//import_theme: null, // This can be the property name of another theme or falsey or omitted.
			format: function(style_value, val) {
			// format is called every time a argument from the call chain is stylized. This will not be used is style is falsey. The style value is
			// a value from the theme[theme] below (e.g. theme.light_1.base). The value is the string which is expected to be stylized.
				//return val
				return style_value + val
			},
			theme: {
				light_internal: { // This will be used when a message is logged from withing bracket print itself. The theme will be used but not the level.
					base: "\033[0;31m",
				},
				dark_internal: {
					base: "\033[1;36m",
				},
				light_1: {
		//			open_with: "\0m,", // This will be added to the output only when-ever toStyleString (or log), is called.
											 // is always one available.
					close_with: "\033[0m", // This will be added after a toStyleString call (which is used with log as well). It will also be added whenever 
												// the style option is set to false.
					base: "\033[0;35m", // The default style to use if any namespace can not be found below.
					quote: "\033[0;30m", // a double or single quote (will also be used regardless of what bracket_print.denote_quote option is set to).
					number: "\033[0;32m", 
					string: "\033[0;35m",
					function_body: "\033[0;37m", // The contents of a function. This will include truncated denotations.
					nan: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;37m",
					undefined: "\033[0;32m",
					parenthesis: "\033[0;36m",
					bracket: "\033[0;36m",
					brace: "\033[0;36m",
					colon: "\033[0;37m",
					namespace: "\033[0;31m", // I.g. .__proto__, [[primitivevalue}
					indent: "\033[0;37m", // This happens when indent is set to a string instead of spaces.
					title: "\033[0;35m", // The title set with use_title and title or title_stamp
					parameter: "\033[0;34m", // The parameter namespace used in a function declaration. E.g. function( num, opt ) { .
                                        //                                                                        ^^^  ^^^

				},
				light_2: {
					base: "\033[1;35m", 
					quote: "\033[1;30m",
					number: "\033[1;32m",
					string: "\033[1;35m",
					function_body: "\033[1;37m",
					nan: "\033[1;33m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[1;30m",
					undefined: "\033[1;32m",
					parenthesis: "\033[1;36m",
					bracket: "\033[1;36m",
					brace: "\033[1;36m",
					colon: "\033[1;37m",
					namespace: "\033[0;31m", 
					indent: "\033[1;37m",
					title: "\033[1;32m",
					parameter: "\033[1;34m",

				},
				dark_1: {
					base: "\033[0;36m", 
					quote: "\033[0;37m",
					number: "\033[0;32m",
					string: "\033[0;35m",
					function_body: "\033[0;30m",
					nan: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;37m",
					undefined: "\033[0;32m",
					bracket: "\033[0;36m",
					brace: "\033[0;36m",
					colon: "\033[0;37m",
					namespace: "\033[0;31m",
					indent: "\033[0;30m", 
					title: "\033[0;37m",
					parameter: "\033[0;34m", 
				},
				dark_2: {
					base: "\033[1;36m", 
					quote: "\033[1;37m",
					number: "\033[1;32m",
					string: "\033[1;35m",
					function_body: "\033[1;30m",
					nan: "\033[1;33m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[0;37m",
					undefined: "\033[1;32m",
					bracket: "\033[1;36m",
					brace: "\033[1;36m",
					colon: "\033[1;37m",
					namespace: "\033[1;31m",
					indent: "\033[1;30m", 
					title: "\033[1;37m",
					parameter: "\033[1;34m", 
				},
			},
		}

	}

})
