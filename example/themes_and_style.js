/* Bracket print resides under the LGPL v3

 Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

 Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA serialization.

 this file is a part of Bracket print

Bracket Print is free software: you can redistribute it and/or modify it under the terms of the 
GNU LESSER GENERAL PUBLIC LICENSE as published by the Free Software Foundation, either version 3 
of the License, or (at your option) any later version.

Bracket print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  
If not, see <http://www.gnu.org/licenses/>. */

var Print = require("../../bracket_print/lib/bracket_print")({title_stamp: false, quote_qualifier: true, compression: 1})

var obj = { cool: [undefined, null, 2*"f", 777, true, false, "A string"], joes: function(param, param) { this.man = "here" } }

Print.option("Light theme, level 1", {theme: "light", level: 1}).log(obj).empty("Dark theme, level 1", {theme: "dark"}).log(obj)
Print.option("Light theme, level 2", {theme: "light", level: 2}).log(obj).empty("Dark theme, level 2", {theme: "dark"}).log(obj)
