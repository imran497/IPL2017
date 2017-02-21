var express = require("express");
var app = express();
var sass = require("node-sass");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require("fs");
var session = require("express-session");
var mysqlStore = require("express-mysql-session")(session);

var mysql = require("mysql");
/*
var connection = mysql.createConnection({
    host     : 'localhost',
    port  : 3306,
    user     : 'root',
    password : 'Immu497@',
    database : "ipl2017"
}); */

/* CONNECT TO DATABASE */
/*connection.connect(function(err) {
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


var sessionStore = new mysqlStore({},connection);
app.use(session({secret:"Immu497", store: sessionStore, resave: false, saveUninitialized: false})); /* DECLARING SECRET FOR SESSIONS */


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
  /*connection.query("select match_no, (select team_name from teams where team_name_key = teama) as teama,  (select team_name from teams where team_name_key = teamb) as teamb, match_date, venue  from matches", function(errMatches, rowsMatches){
    if(!errMatches)
    {
      connection.query("select * from grounds", function(errGrounds, rowsGrounds){
        res.render("iplHome", {data: rowsMatches, dataGrounds: rowsGrounds});
      });
    }
    else {
      console.log(errMatches);
    }
  });*/
	res.render("iplHome");
});

app.post("/", function(req, res){
  /*connection.query("select team_name_key, likes from teams", function(err, likesRows){
    var likesRows = JSON.stringify(likesRows);
    res.send(likesRows)*/
	res.send('{"srh":"10"}');
  /* }); */
});

/*app.post("/likeTeam", urlencodedParser, function(req, res){
  if(req.session.selectedTeam)
  {
    res.send("Already Selected");
  }
  else
  {
    var teamLiked = req.body.teamLiked;
    teamLiked = teamLiked.toString();
    connection.query("select likes from teams where team_name_key = '"+teamLiked+"'", function(err, countRows){
      var count = countRows[0].likes;
      count++;
      console.log(count);
      connection.query("update teams set likes = '"+count+"' where team_name_key = '"+teamLiked+"'" , function(err, rows){
        if(!err)
        {
          req.session.selectedTeam = 1;
          res.send("Selected");
        }
        else {
          console.log(err);
        }
      });
    });
  }
});*/


app.listen(3000);
