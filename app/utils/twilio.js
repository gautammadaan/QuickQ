// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC8b0f982035fd3f6c94fe38b58cdd87db;
var authToken = "f1972a713de834fd2a6dd600842d5e29";
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    body: "Hey JGal! How you doin?",
    to: "+16507722191",
    from: "+!"
}, function(err, message) {
    process.stdout.write(message.sid);
});