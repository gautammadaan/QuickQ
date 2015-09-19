// app/routes.js

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app, passport) {

	// =====================================
	// LOGIN ===============================
	// =====================================
	// Use as sample
	app.get('/login', function(req, res) {
		// call some controller method here to do stuff
		connection.query("SELECT * FROM users WHERE username = 'sparsh'", function(err, rows) {
			console.log(err);
                if (err){
                	res.send(err)
                }else{
                	console.log(rows);
                	res.send(rows[0])
				}
         });
//		res.send("sds");
	});

	app.post('/signup', function(req, res) {
		var username = req.body.username;
		console.log("$$$$$"+req.body);
		connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, rows) {
			if(err){
				res.send(err);
			}else if(rows.length){
				res.send(rows);
			}else{
				var insertUser = "insert into users values(?, ?, ?)";
				connection.query(insertUser, [1, username, req.body.password], function(err, rows){
					res.send(rows);
				});
			}
		});
	});
}
