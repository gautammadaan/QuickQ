// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express')
,	app         = express()
,	bodyParser  = require('body-parser')
,	morgan      = require('morgan')
,	mongoose    = require('mongoose')
,	config = require('./config'); // get our config file


// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================

require('./app/routes.js')(app, express); // load our routes and pass in our app and fully configured passport

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
