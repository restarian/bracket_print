/* Bracket Print resides under the LGPL v3 Copyright (c) 2020 Robert Steckroth, Bust0ut <RobertSteckroth@gmail.com>

Bracket print is a printing and logging tool for javascript engines which supplies literal ECMA Object serialization.

 this file is a part of Bracket Print

 Bracket Print is free software: you can redistribute it and/or modify it under the terms of the GNU LESSER GENERAL PUBLIC LICENSE as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 Bracket Print is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([], function() {

	return function(proto) {

		if ( typeof proto !== "object" )
			// !!console.log should return false in all platforms so this simply returns the argument back.
			return !!console.log("Brace prototype must be passed an Object to assign additional members.") || proto

		// It is important for list to be decoupled from the passed in prototype Object so that prototypes are not updated when the (add/remove)_qualifier
		// members are used.
		var list = {}, hidden_list = {}
		Object.getOwnPropertyNames(proto).forEach(function(key) {
			list[key] = null
		})

		var remove = function(qualifier) {
		// Reset all of the values in the prototype of the Object which contains this member to the default values. The default value is the value 
		// contained in the prototype of the instance. The property will not be changed if the Object does not have a prototype or if the property 
		// is not part of the prototype.

			if ( this.hasOwnProperty(qualifier) ) {
				// This block will check to ensure that the prototype property exists and it is a owned property. The property will not be removed if the
				// corresponding qualifier was deleted in the prototype. Otherwise, it should be expected that any of the properties in the maintained list of
				// parameters are not deleted (remove_qualifier should be used instead.

			   // The entire chain needs to be checked with a loop if Object.getPrototypeOf does not exist (i.g. versions of Opera below 10.50).
			   if ( typeof Object.getPrototypeOf === "function" )
					return !!Object.getPrototypeOf(this)[qualifier] && delete this[qualifier] || true
			   else
					// Find out if the property is located within the prototypal chain with this loop.
					for ( var chain = this.__proto__; chain; chain = chain.__proto__ )
					  // Only delete the property if it is contained within the prototypal chain.
						if ( qualifier in chain )
							// The delete return value is not reliable :(
							return delete this[qualifier] || true
			}

			return false

		}

		proto.clear = function() {
			// Passing in string parameters to this member will reset only the members of the instance. All of the members of the instance will be 
			// reset if no parameters are passed to the call to this member.

			// Loop through all of the properties is no strings were passed in.
			if ( !arguments.length ) {
				for ( var n in list )
					remove.call(this, n)
				for ( var n in hidden_list )
					remove.call(this, n)
			}

			 // Loop through only the string arguments passed in.
			 for ( var x in arguments )
				 if ( (arguments[x] in list) || (arguments[x] in hidden_list) )
					 remove.call(this, arguments[x])
				 else
					 console.log("The qualifier", arguments[x], "was passed to a brace prototype instance which does not have it listed.",
									 "You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.")
		}
		
		proto.extend = function(obj) {

			// This will extend either the constructor generated Object if it is accessed from the constructor or it will extend the prototype it was 
			// attached to if it was accessed from that prototype. The Object is fully copied by setting the property descriptors which will include 
			// much of the Object information. getOwnPropertyNames will loop through all of the Object properties (including non-enumerable ones).
			Object.getOwnPropertyNames(obj).forEach(function(key) {
				var desc = Object.getOwnPropertyDescriptor(obj, key)
				Object.defineProperty(this, key, desc)
			}, this)

			return this 

		}

		proto.proto_extend = function(obj) {

			// This will extend prototype it was attached to regardless how it was accessed effectively making it a way of accessing the original prototype
			// without needing to use the __proto__ builtin (which is highly inefficient). 
			Object.getOwnPropertyNames(obj).forEach(function(key) {
				var desc = Object.getOwnPropertyDescriptor(obj, key)
				Object.defineProperty(this, key, desc)
			}, proto)

			return proto 
		}

		proto.add_qualifier = function(qualifier) {

			// The list is only used for the qualifier data so null is always set as the values.
			list[qualifier] = null 
			proto[qualifier] = proto[qualifier] || null 
		}

		proto.add_hidden_qualifier = function(qualifier) {

			hidden_list[qualifier] = null 
			proto[qualifier] = proto[qualifier] || null 
		},

		proto.remove_qualifier = function(qualifier) {

			// This will prevent it from being altered by any of these members.
			delete list[qualifier]
		}

		proto.list = function() {

			return list
		}

		return proto
	}

})
