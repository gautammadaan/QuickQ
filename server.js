// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express')
,	app         = express()
,	bodyParser  = require('body-parser')
,	morgan      = require('morgan')
,	mongoose    = require('mongoose')
,   aws         = require('aws-sdk')
,	config = require('app/config/config.js'); // get our config file


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
// Configure AWS ===================================================
// =================================================================
aws.config.update(config.aws);
var sns = aws.SNS();

// Your accountSid and authToken from twilio.com/user/account
var accountSid = "AC8b0f982035fd3f6c94fe38b58cdd87db";
var authToken = "f1972a713de834fd2a6dd600842d5e29";
var client = require('twilio')(accountSid, authToken);

//Place a phone call, and respond with TwiML instructions from the given URL
client.makeCall({

    to:'+12035703267', // Any number Twilio can call
    from: '+19253784257', // A number you bought from Twilio and can use for outbound communication
    url: 'https://demo.twilio.com/welcome/voice/' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {

    //executed when the call has been initiated.
    //console.log(responseData.from); // outputs "+14506667788"

});



require('./app/routes.js')(app, express, sns); // load our routes and pass in our app and fully configured passport

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);