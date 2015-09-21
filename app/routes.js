var userController = require("../controller/user")
,	feedbackCntl = require("../controller/feedback")
,	questionCntl = require("../controller/question")
,	tagController = require("../controller/hashtag")
,	fbutil = require("../utils/facebook")

,	mysql = require('mysql')
,	bcrypt = require('bcrypt-nodejs')
,	dbconfig = require('../config/database')
,	connection = mysql.createConnection(dbconfig.connection);


/**
* private
* @param req, callback
* Check if the request is from a valid user
*/
function __isRequestValid(req, callback) {
	fbutil.checkAccessToken(req, function(err, data) {
			if (err)
				res.send(err)
			else
				callback();
	});
}

module.exports = function(app) {

	// LogIn ===============================
	app.post('/user/login', function(req, res) {
		__isRequestValid(req, userController.login(req, res));
	});

	// Get user details ====================
	app.post('/user', function(req, res) {
		__isRequestValid(req, userController.getUser(req, res));
	});

/* /question 	*/
	// Ask question ========================
	app.post('/question/ask', function(req, res) {
		__isRequestValid(req, questionCntl.askQuestion(req, res));
	});

	// Answer question ======================
	app.post('/question/answer', function(req, res) {
		__isRequestValid(req, questionCntl.answerQuestion(req, res));
	});	

/* /feedback 	*/
	// Send feedback ========================
	app.post('/feedback/send', function(req, res) {
		__isRequestValid(req, feedbackCntl.sendFeedback(req, res));
	});

	// Get feedback scores ===================
	app.post('/feedback/scores', function(req, res) {
		__isRequestValid(req, feedbackCntl.getScores(req, res));
	});

/* /getTags		*/
	// get all tags ==========================
	app.get('/tags', function(req, res) {
		__isRequestValid(req, tagController.getTags(req, res));

}
