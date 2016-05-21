var Wizkit = require("wizkit")

var up = new Wizkit()
up.log_app_name = "Wizkit test application"
//up.args.settings.debug = true
//args.settings.debug = "verbose"//false

var exper = up.error_cb(function() {
  console.log(this.message)
})

exper.message = "NICE+++++++++++++++++++++++++++++++++++++++++++"
exper()

up
.sp("A string")
.sp(null)
.sp(undefined)
.sp(up.nope)
.line(true)
.tab(false)
.tab("a"*2)
.tab(0)
.line(function() {
  // comments will also be printed
  this.Robert = "Bob"
})
.line(new Error("Test error thrown by wizkit"))
.line(up.PROGRAM_POINT)
.line(up.sp("Go up, go..").sp(true))
.log


var t_f = function(opt, cb, err) {

}

/*
up.log(t_f.length)
t_f = up.success_cb(t_f, {}, "Cool")
t_f = up.success_cb(function(a){}, {}, "Cool")
up.log(t_f.length)
*/

var my_func = function(opt, cb, err) {
//  cb = up.success_cb(cb, this)
  err = up.error_cb(err, this)

  this.more = "no data yet.."
//  if ( opt ) cb(up.sp("Calling success callback with prototype").add_line(this).add_line("----------------"))
//  else err(up.sp("Calling error callback with prototype").add_line(this).add_line("----------------"))


  //cb = up.success_cb(cb, new_proto)
  //err = up.success_cb(err, new_proto)

  if ( opt ) cb(up.sp("Calling success callback with prototype").add_line(this).add_line("----------------"))
  else err(up.sp("Calling error callback with prototype").add_line(this).add_line("----------------"))

}

var new_proto = { "more": "data" }


var cb_a = function() {
  this.Robert = "Bob"
  console.log("Message sent to Wizkit error callback: "+this.message)
  up.sp("Prototype of callback -> ").add_line(this).log()
}
cb_a.prototype = {"cb_a permanent_data": "here"}

var cb_b = function() {
  this.Robert = "Bob"
  console.log("Message sent to Wizkit error callback: "+this.message)
  up.sp("Prototype of callback -> ").add_line(this).log()

}
cb_b.prototype = {"cb_b permanent_data": "here"}



//cb_b.never_switch_proto_flag = true

var test_callbacks = function() {

  cb_b = up.success_cb(cb_b, {"CLLLL": "DATAAAA"}, "Message for end user display") // Messages do no regard the debug state and are always availible
  cb_b("An internally generated error message")

/*
  cb_a = up.error_cb(cb_a, new_proto, "Prototypes can not be changed once they are set to a function.") // Messages do no regard the debug state and are always availible
  cb_a("An internally generated error message with the same prototype initially assigned")

  up.error_cb(cb_a, new_proto, "A different message for end user display")("An different internally generated error message")

  cb_b = up.error_cb(cb_b, {"Custom_prototype": true}, up.sp("Wizkit logger is usefull here as well. This log will be sent regardless of the debug state."))
  cb_b()


  up.error_cb({"test": ["test data"], "up": up}, function() {
    this.up.sp("We got Wizkit from the prototype passed in:").sp(this.test).log()
  })()

  up.error_cb()("Simple error reporting through Wizkit")
*/
}


var test_printing = function() {

  up.sp("cool").sp(null).sp(false).sp(y).color(true).sp("cool").sp(null).sp(false).sp(y).log("a"*3)

  var y
  up.log_app_name = "" // Turn off auto app printing
  var output = up.pass()
  output.color(false).add("Starting empty").add().add_line().add_line().add_line()
  //assert(output.toString() === "Starting empty\n\n\n")

  up.tab("This starts at the begining of line because the first seperater is ignored").log()
  up.line("good").sp("deal").log()

  up.sp("one blank line separates").line().line("these two lines").log()

  up.sp().sp("one space before this").log()
  up.sp().sp().sp("two spaces before this").log()

  up.color(false).add_line().add_line().add_line().add_line(new Error("Wizkit will auto-print Errors"))
    .add_line().color(true).add_line("In color now!").log(new Error("Wizkit will auto-print Errors"))

  console.log(up.tab("toString() will never output log_app_name").toString())
  console.log(up.color(false).tab("toString() will never output log_app_name").toString())

  up.tab("All separators are ignored when the first sperator command is called (except lines)").log()

  up.line("Lines will newline even on the first command call").log()
  up.line().log()

  up.sp("Clear all of the data after this message and log the last string").clear().line().tab("This is not printed").clear().tab("last chain after clear here").log()

  up.always().sp("Ignore the debuging state with the always command.").log()
  up.always().color(false).sp("Ignore the debuging state with the always command.").log()
  console.log(up.always().color(false).sp("Ignore the debuging state with the always command.").toString())

  up.log_app_name = "Wizkit testing utility" // Turn on auto app printing

  up.log(function() {
    // print this function
    this.robert = "bob"
  })

}
function test_debug_state() {


  up.log_app_name = "Testing debug switches"

  up.data.settings.debug = "verbose"
  up.sp("Debug state is set to").sp(up.data.settings.debug).log()
  up.error_cb()(up.always().sp("an error message"))

  up.data.settings.debug = true
  up.sp("Debug state is set to").sp(up.data.settings.debug).log()
  up.error_cb()("another an error message")

  up.data.settings.debug = false
  up.sp("Debug state is set to").sp(up.data.settings.debug).log()
  up.error_cb()(up.always().sp("yet another error message"))


}



cb_a = up.error_cb({"bobobo": "dasdsd"}, cb_a, "Alrighty then")
cb_a = up.error_cb({"bobobo": "dasdsd"}, cb_a, "Alrighty then")

cb_a = up.error_cb({"bobobo": "MORE"}, cb_a, "Alrighty then")

cb_a()
cb_a()


//test_printing()
//test_callbacks()
//test_debug_state()
