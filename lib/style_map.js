
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require"], function(require) {

	return {

		browser: {

			denote_line: "\n",
			denote_tab: "\t;",
			denote_space: " ",
			denote_add: "",
			use_theme: "html",
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
			format: function(color_value, str) {
				return "<span style='"+color_value+";'>"+str+"</span>"
			},
			theme: {

				light_level_1: {
					quote: "color: #454343;",
					number: "color: green",
					string: "color: #b91db3",
					function_body: "color: #656565",
					not_a_number: "color: #249e93",
					null: "color: #249e93",
					boolean: "color: red",
					comma: "color: #323232",
					undefined: "color: #f4d400",
					scope_container: "color: #286f4f",
					colon: "color: #363533",
					namespace: "color: #690900", // E.g. .__proto__ [[PrimitiveValue}}
					indent: "color: #c2bab8",
					title: "color: #0a0a0a",
					variable: "color: #4a6a27",

				},
				light_level_2: {
					quote: "color: #454343; font-weight: bold;",
					number: "color: green; font-weight: bold",
					string: "color: #b91db3; font-weight: bold",
					function_body: "color: #656565; font-weight: bold",
					not_a_number: "color: #249e93; font-weight: bold",
					null: "color: #249e93; font-weight: bold",
					boolean: "color: red; font-weight: bold",
					comma: "color: #323232; font-weight: bold",
					undefined: "color: #f4d400; font-weight: bold",
					scope_container: "color: #286f4f; font-weight: bold",
					colon: "color: #363533; font-weight: bold",
					namespace: "color: #690900; font-weight: bold", // E.g. .__proto__ [[PrimitiveValue}}
					indent: "color: #c2bab8; font-weight: bold",
					title: "color: #0a0a0a; font-weight: bold",
					variable: "color: #4a6a27; font-weight: bold",

				},
				dark_level_1: {
					quote: "color: #d2d2d2",
					number: "color: green",
					string: "color: #e9e9e9",
					function_body: "color: #a7a7a7",
					not_a_number: "color: yellow",
					null: "color: #5bc3ba; font-weight: bold",
					boolean: "color: red",
					comma: "color: #787878",
					undefined: "color: #e9d234",
					scope_container: "color: #80ab96",
					colon: "color: #dfd9b3",
					namespace: "color: #e05c50", // E.g. .__proto__ [[PrimitiveValue}}
					indent: "color: #373332",
					title: "color: #f2f2f2; font-weight: bold",
					variable: "color: #baeb83",

				},
				dark_level_2: {
					quote: "color: #d2d2d2; font-weight: bold",
					number: "color: green; font-weight: bold",
					string: "color: #e9e9e9; font-weight: bold",
					function_body: "color: #a7a7a7; font-weight: bold",
					not_a_number: "color: yellow; font-weight: bold",
					null: "color: #5bc3ba; font-weight: bold; font-weight: bold",
					boolean: "color: red; font-weight: bold",
					comma: "color: #787878; font-weight: bold",
					undefined: "color: #e9d234; font-weight: bold",
					scope_container: "color: #80ab96; font-weight: bold",
					colon: "color: #dfd9b3; font-weight: bold",
					namespace: "color: #e05c50; font-weight: bold", // E.g. .__proto__ [[PrimitiveValue}}
					indent: "color: #373332; font-weight: bold",
					title: "color: #f2f2f2; font-weight: bold",
					variable: "color: #baeb83; font-weight: bold",

				},
			},
		 },
		 terminal: {

			denote_line: "\n",
			denote_tab: "\t;",
			denote_space: " ",
			denote_add: "",
			format: function(style_value, val) {
				return style_value+val
			},
			theme: {
				light_level_1: {
					quote: "\033[0;30m",
					number: "\033[0;32m",
					string: "\033[0;35m",
					function_body: "\033[0;30m",
					not_a_number: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;30m",
					undefined: "\033[0;32m",
					scope_container: "\033[0;36m",
					colon: "\033[0;30m",
					namespace: "\033[0;31m", // e.g. .__proto__ [[primitivevalue}
					indent: "\033[0;37m",
					title: "\033[0;35m",
					variable: "\033[0;34m",

				},
				light_level_2: {
					quote: "\033[1;30m",
					number: "\033[1;32m",
					string: "\033[1;35m",
					function_body: "\033[1;30m",
					not_a_number: "\033[1;33m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[1;30m",
					undefined: "\033[1;32m",
					scope_container: "\033[1;36m",
					colon: "\033[1;30m",
					namespace: "\033[0;31m", // e.g. .__proto__ [[primitivevalue}
					indent: "\033[1;37m",
					title: "\033[1;32m",
					variable: "\033[1;34m",

				},
				dark_level_1: {
					quote: "\033[0;37m",
					number: "\033[0;32m",
					string: "\033[0;35m",
					function_body: "\033[0;30m",
					not_a_number: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;37m",
					undefined: "\033[0;32m",
					scope_container: "\033[0;36m",
					colon: "\033[0;37m",
					namespace: "\033[0;31m", // E.g. .__proto__ [[primitivevalue}}
					indent: "\033[0;30m", // If an indentation_string is provided it will be colorized as this.
					title: "\033[0;37m",
					variable: "\033[0;34m", // E.g. function( num, opt ) { .
													//                ^^^  ^^^
				},
				dark_level_2: {
					quote: "\033[1;37m",
					number: "\033[1;32m",
					string: "\033[1;35m",
					function_body: "\033[1;30m",
					not_a_number: "\033[1;33m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[0;37m",
					undefined: "\033[1;32m",
					scope_container: "\033[1;36m",
					colon: "\033[1;37m",
					namespace: "\033[1;31m", // E.g. .__proto__ [[primitivevalue}}
					indent: "\033[1;30m", // If an indentation_string is provided it will be colorized as this.
					title: "\033[1;37m",
					variable: "\033[1;34m", // E.g. function( num, opt ) { .
													//                ^^^  ^^^
				},
			},
		}

	}

})
