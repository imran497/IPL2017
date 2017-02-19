var express = require("express");
var app = express();
var sass = require("node-sass");
var fs = require("fs");

var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    port  : 3306,
    user     : 'root',
    password : 'Immu497@',
    database : "ipl2017"
});

/* CONNECT TO DATABASE */
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
  connection.query("use ipl2017", function(err, rows){
    if(err)
    {
      console.log(err);
    }
  });
});


app.set("view engine", "ejs");
app.use("/", express.static(__dirname+"/assets"));


sass.render({file: __dirname+"/assets/css/iplHome.scss",
							outFile: __dirname+"/assets/css/iplHome.css"}
						, function(error, result) {
						    if(!error){
									fs.writeFile(__dirname+"/assets/css/iplHome.css", result.css, function(err){
									  if(!err){
											console.log(err);
									  }
									});
								}
								else {
									console.log(error);
								}
							});


app.get("/", function(req, res){
  connection.query("select match_no, (select team_name from teams where team_name_key = teama) as teama,  (select team_name from teams where team_name_key = teamb) as teamb, match_date, venue  from matches", function(errMatches, rowsMatches){
    if(!errMatches)
    {
      connection.query("select * from grounds", function(errGrounds, rowsGrounds){
        res.render("iplHome", {data: rowsMatches, dataGrounds: rowsGrounds});
      });
    }
    else {
      console.log(errMatches);
    }
  });
});

app.listen(3000);
