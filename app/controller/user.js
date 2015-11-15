var User = require('../models/user');
var jwt  = require('jsonwebtoken');

exports.signup = function(req, res) {
	// create a sample user
	var user = new User({ 
		name: req.body.name, 
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		addressOne: req.body.addressOne,
		addressTwo: req.body.addressTwo,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		zip: req.body.zip,
		email: req.body.email,
		admin: false
	});
	user.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
};

exports.signin = function(req, res) {
	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, req.app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
};