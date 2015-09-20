var authController = require("../controller/auth")
,	feedbackCntl = require("../controller/feedback")
,	questionCntl = require("../controller/question")
,	tagController = require("../controller/hashtag");

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app) {

/* /user 	*/
	// Signup ==============================
	app.post('/user/signup', function(req, res) {
		authController.login(req, res);
	});

	// LogIn ===============================
	app.post('/user/login', function(req, res) {
		authController.login(req, res);
	});

	// Get user details ====================
	app.post('/user', function(req, res) {
		userController.getUser(req, res);
	});

/* /question 	*/
	// Ask question ========================
	app.post('/question/ask', function(req, res) {
		questionCntl.askQuestion(req, res);
	});

	// Answer question ======================
	app.post('/question/answer', function(req, res) {
		questionCntl.answerQuestion(req, res);
	});	

/* /feedback 	*/
	// Send feedback ========================
	app.post('/feedback/send', function(req, res) {
		feedbackCntl.sendFeedback(req, res);
	});

	// Get feedback scores ===================
	app.post('/feedback/scores', function(req, res) {
		feedbackCntl.getScores(req, res);
	});

/* /getTags		*/
	// get all tags ==========================
	app.get('/tags', function(req, res) {
		tagController.getTags(req, res);



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
