/* Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com> Bracket Print resides under the LGPL version 3
Bracket Print is a cross-platform printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

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

describe("Performing benchmarks against the Yahoo serialize-json module and internal JSON.stringify.", function() {

	this.timeout(5000)

	var cycle = 6

	var random_large = { }
	Array(15000).fill().forEach(() => {
		random_large["aa"+Math.random()] = "bb"+Math.random()
	})

	var random_small = { }
	Array(500).fill().forEach(() => {
		random_small["aa"+Math.random()] = "bb"+Math.random()
	})

	Print.prototype.title_stamp = false	
	;([true, false]).forEach(function(value) {

		var up 
		beforeEach(function() {
			up = Print({style: value})
		})

		describe("with the style option set to "+value, function() {
		
			it("using a large random assigned object", function() {

				console.log("* Bracket Print:")
				Array(cycle).fill().forEach(() => {	

					console.time("  * ")
					up.s(random_large)
					console.timeEnd("  * ")
				})
				console.log("---------------------")

				console.log("* Yahoo stringify:")
				Array(cycle).fill().forEach(() => {	

					console.time("  * ")
					serialize(random_large)
					console.timeEnd("  * ")
				})
				console.log("---------------------")

				console.log("* JSON.stringify:")
				Array(cycle).fill().forEach(() => {	

					console.time("  * ")
					JSON.stringify(random_large)
					console.timeEnd("  * ")
				})
			})
			it("using a small random assigned object", function() {

				console.log("* Bracket Print:")
				Array(cycle).fill().forEach(() => {	

					console.time("  * ")
					up.s(random_small)
					console.timeEnd("  * ")
				})
				console.log("---------------------")

				console.log("* Yahoo stringify:")
				Array(cycle).fill().forEach(() => {	

					console.time("  * ")
					serialize(random_small)
					console.timeEnd("  * ")
				})
				console.log("---------------------")

				console.log("* JSON.stringify:")
				Array(cycle).fill().forEach(() => {	

					console.time("  * ")
					JSON.stringify(random_small)
					console.timeEnd("  * ")
				})
			})
			it("when parsing the nodejs path module", function() {

				console.log("* Bracket Print:")
				try {
					Array(cycle).fill().forEach(() => {	

						console.time("  * ")
						up.s(path)
						console.timeEnd("  * ")
					})
				} catch(error) {

					console.log("..unable to do this")
					console.timeEnd("  * ")
				}
				console.log("---------------------")

				console.log("* Yahoo stringify:")
				try {
					Array(cycle).fill().forEach(() => {	

						console.time("  * ")
						serialize(path)
						console.timeEnd("  * ")
					})
				} catch(error) {
					
					console.log("..unable to do this")
					console.timeEnd("  * ")
				}
				console.log("---------------------")

				console.log("* JSON.stringify:")
				try {
					Array(cycle).fill().forEach(() => {	
						
						console.time("  * ")
						JSON.stringify(path)
						console.timeEnd("  * ")
					})
				} catch(error) {

					console.log("..unable to do this")
					console.timeEnd("  * ")
				}
			})
			it("when parsing a large populated byte array buffer", function() {

				var len = 15000
				var float32 = new Float32Array(len)
				while ( --len )
					float32[len] = Math.random()

				console.log("* Bracket Print:")
				try {
					Array(cycle).fill().forEach(() => {	

						console.time("  * ")
						up.s(float32)
						console.timeEnd("  * ")
					})
				} catch(error) {

					console.log("..unable to do this")
					console.timeEnd("  * ")
				}
				console.log("---------------------")

				console.log("* Yahoo stringify:")
				try {
					Array(cycle).fill().forEach(() => {	

						console.time("  * ")
						serialize(float32)
						console.timeEnd("  * ")
					})
				} catch(error) {

					console.log("..unable to do this")
					console.timeEnd("  * ")
				}
				console.log("---------------------")

				console.log("* JSON.stringify:")
				try {
					Array(cycle).fill().forEach(() => {	

						console.time("  * ")
						JSON.stringify(float32)
						console.timeEnd("  * ")
					})
				} catch(error) {

					console.log("..unable to do this")
					console.timeEnd("  * ")
				}
			})
		})
	})
})

