var authController = require("auth");

module.exports = function(app) {

	// =====================================
	// SignUp ==============================
	// =====================================
	app.post('/signup', function(req, res) {
		authController.signup(req, res);
	});

	// =====================================
	// LogIn ===============================
	// =====================================
	app.post('/login', function(req, res) {
		authController.login(req, res);
	});
}
