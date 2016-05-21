var Wizkit = require("wizkit")

var up = new Wizkit()
up.log_title = "Wizkit example application"
//up.args.settings.debug = true
//args.settings.debug = "verbose"//false
//up.sp("satrt")

//up.sp([]).log()//.sp({}).sp([1,2]).sp({"a":"A"}).log()
//up.color(true).sp({"a":{"b":"bbb", "bb": "Bbb"}, "eee": ["Dsad", {"11": "22"}, {"11": "22"}]}).log()
//up.line({"a":["b", "bbb", "bb", "Bbb", ,2 ,34, 4, 5, 6, "Dasdasddasd", 4, "aaaaaaaaaaaaaaaaaaaaaaaaaaa"]}).log()


up.success_cb({"cool": "joe"}, function(){

  console.log(this.cool)
})()

up.line().sp("dddddddddd").log()
up.color(true).sp({"max_line_characters": up.sp().max_line_characters, "a":["b", "bbb", "bb", "Bbb", ,2 ,34, 4, 5, 6, "Dddddddddddasd", 4, "This should new line after the max_line_characters amount is reached"], "vvs1": {"Ddddddddddddddddddssa": 11}, "vvs": {"Ddssa": 11}, "sd": [1,3,4,34]}).log()

function cool() {

  //here manage
  var t = [1,2,3,4]
//  this.a = {"Dasd":true}
}


cool.prototype = {

  "joes": function() {
    // more stuuff
    this.ee = true
  },
  "ness": function() {
    // more stuuff
    this.ee = true
  }


}



var g = {test: new cool()}
//up.line(g).log
/*
var err = up.error_cb(up, function(){
  this.sp(this.message).log()
}, "Message here")


err()

up.success_cb(up, err, "Better message")()
*/
