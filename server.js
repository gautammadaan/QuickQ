// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3000;


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
