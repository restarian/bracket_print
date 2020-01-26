/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

var chai = require("chai"),
expect = chai.expect,
path = require("path")

var serialize = require('serialize-javascript')

module.paths.unshift(path.join(__dirname, "..", ".."))
var Print = require("bracket_print")

describe("Performing benchmarks which do not have a failing condition", function() {

	var cycle = 5 

	var random_large = { }
	Array(10000).fill().forEach(() => {
		random_large["aa"+Math.random()] = "bb"+Math.random()
	})

	var random_small = { }
	Array(100).fill().forEach(() => {
		random_large["aa"+Math.random()] = "bb"+Math.random()
	})

	Print.prototype.title_stamp = false	
	;([true, false]).forEach((value) => {
		var up 
		beforeEach(function() {
			up = Print({style: value})
		})

		describe("with the style option set to "+value, function() {
		
			it("using a large random assigned object", function() {

				Array(cycle).fill().forEach(() => {	
					console.time("Bracket print")
					up.s(random_large)
					console.timeEnd("Bracket print")
				})

				console.log("-----------------------------")

				Array(cycle).fill().forEach(() => {	
					console.time("JSON.stringify")
					JSON.stringify(random_large)
					console.timeEnd("JSON.stringify")
				})

				Array(cycle).fill().forEach(() => {	
					console.time("Yahoo stringify")
					serialize(random_large)
					console.timeEnd("Yahoo stringify")
				})

				console.log("-----------------------------")

			})

			it("using a small random assigned object", function() {

				Array(cycle).fill().forEach(() => {	
					console.time("Bracket print")
					up.s(random_small)
					console.timeEnd("Bracket print")
				})

				console.log("-----------------------------")

				Array(cycle).fill().forEach(() => {	
					console.time("Yahoo stringify")
					serialize(random_small)
					console.timeEnd("Yahoo stringify")
				})

				console.log("-----------------------------")

				Array(cycle).fill().forEach(() => {	
					console.time("JSON.stringify")
					JSON.stringify(random_small)
					console.timeEnd("JSON.stringify")
				})

			})

			this.timeout(8000)
			it("when parsing the nodejs path module", function(done) {

				try {
					Array(cycle).fill().forEach(() => {	
					console.time("Bracket print")
					up.s(path)
					console.timeEnd("Bracket print")
					})
				} catch(error) {
					console.log("Bracket print: unable to do this")
					console.timeEnd("Bracket print")
				}

				console.log("-----------------------------")

				try {
					Array(cycle).fill().forEach(() => {	
						console.time("Yahoo stringify")
						serialize(path)
						console.timeEnd("Yahoo stringify")
					})
				} catch(error) {
					console.log("Yahoo stringify: unable to do this")
					console.timeEnd("Yahoo stringify")
				}

				console.log("-----------------------------")

				try {
					Array(cycle).fill().forEach(() => {	
						console.time("JSON.stringify")
						JSON.stringify(path)
						console.timeEnd("JSON.stringify")
					})
				} catch(error) {
					console.log("JSON.stringify: unable to do this")
					console.timeEnd("JSON.stringify")
				}

				done()

			})

			this.timeout(2000)

		})
	})

})

