var authController = require("../controller/auth")
,	feedbackCntl = require("../controller/feedback")
,	questionCntl = require("../controller/question")
,	tagController = require("../controller/hashtag");

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
	});
}
