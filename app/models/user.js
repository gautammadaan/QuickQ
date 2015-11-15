var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	name: String, 
	password: String, 
	firstName: String,
	lastName: String,
	addressOne: String,
	addressTwo: String,
	city: String,
	state: String,
	country: String,
	zip: String,
	email: String,
	admin: Boolean 
}));