/* Bracket Print resides under the LGPL v3

  Brackit print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

  Copyright (C) 2017  Robert Edward Steckroth II <RobertSteckroth@gmail.com>

 this file is a part of Brackit print

 Brackit Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
 the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

 Brackit print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

  Author: Robert Edward Steckroth, Bustout, <RobertSteckroth@gmail.com> */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["require"], function(require) {

	return {

		browser: {

			denote_line: "\n",
			denote_tab: "\t;",
			denote_space: " ",
			denote_add: "",
			import_theme_from: "html",
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
					open_with: "<span style='font-weight: bold'>",
					close_with: "</span>",
					quote: "color: #454343",
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
				dark_1: {
					quote: "color: #d2d2d2",
					number: "color: green",
					string: "color: #e9e9e9",
					function_body: "color: #a7a7a7",
					nan: "color: yellow",
					null: "color: #5bc3ba",
					boolean: "color: red",
					comma: "color: #787878",
					undefined: "color: #e9d234",
					scope_container: "color: #80ab96",
					colon: "color: #dfd9b3",
					namespace: "color: #e05c50", 
					indent: "color: #373332",
					title: "color: #f2f2f2", 
					variable: "color: #baeb83",

				},
				dark_2: {
					open_with: "<span style='font-weight: bold'>",
					close_with: "</span>",
					quote: "color: #d2d2d2",
					number: "color: green",
					string: "color: #e9e9e9",
					function_body: "color: #a7a7a7",
					nan: "color: yellow",
					null: "color: #5bc3ba",
					boolean: "color: red",
					comma: "color: #787878",
					undefined: "color: #e9d234",
					scope_container: "color: #80ab96",
					colon: "color: #dfd9b3",
					namespace: "color: #e05c50", 
					indent: "color: #373332",
					title: "color: #f2f2f2",
					variable: "color: #baeb83",

				},
			},
		 },
		 terminal: {

			denote_line: "\n", // The new line insert characters. This will also affect the indentation option value.
			denote_tab: "\t", // The tab insert characters. This will also affect the indentation option value.
			denote_space: " ", // The space insert characters. This will also affect the indentation option value.
			close_with: "\033[0m", // This will be added after a toStyleString call (which is used with log as well). It will also be added whenever 
											// the style option is set to false. This will not be used if a close_with value is set in the theme below.
			default_theme: "dark_1", // Use this to set theme and level to use if the requested one does not exist.
			//import_theme: null, // This can be the property name of another theme or falsey or omitted.
			format: function(style_value, val) {
			// format is called every time a argument from the call chain is stylized. This will not be used is style is falsey. The style value is
			// a value from the theme[theme] below (e.g. theme.light_1.base). The value is the string which is expected to be stylized.
				//return val
				return style_value + val
			},
			theme: {
				light_1: {

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
					title: "\033[0;33m", // The title set with use_title and title or title_stamp
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
					title: "\033[1;33m",
					parameter: "\033[1;34m",

				},
				dark_1: {
					base: "\033[0;36m", 
					quote: "\033[0;37m",
					number: "\033[0;32m",
					string: "\033[0;31m",
					function_body: "\033[0;37m",
					nan: "\033[0;33m",
					null: "\033[0;36m",
					boolean: "\033[0;31m",
					comma: "\033[0;37m",
					undefined: "\033[0;32m",
					bracket: "\033[0;36m",
					brace: "\033[0;36m",
					colon: "\033[0;37m",
					namespace: "\033[0;35m",
					indent: "\033[0;30m", 
					title: "\033[0;33m",
					parameter: "\033[0;34m", 
				},
				dark_2: {
					base: "\033[1;36m", 
					quote: "\033[1;37m",
					number: "\033[1;32m",
					string: "\033[1;31m",
					function_body: "\033[1;37m",
					nan: "\033[1;33m",
					null: "\033[1;36m",
					boolean: "\033[1;31m",
					comma: "\033[1;37m",
					undefined: "\033[1;32m",
					bracket: "\033[1;36m",
					brace: "\033[1;36m",
					colon: "\033[1;37m",
					namespace: "\033[1;35m",
					indent: "\033[1;30m", 
					title: "\033[1;33m",
					parameter: "\033[1;34m", 
				},
			},
		}

	}

})
