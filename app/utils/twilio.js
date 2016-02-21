// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC8b0f982035fd3f6c94fe38b58cdd87db'
,   authToken = "f1972a713de834fd2a6dd600842d5e29"
,   client = require('twilio')(accountSid, authToken);

client.messages.create({
    body: "Hey",
    to: "+14083688895",
    from: "+!"
}, function(err, message) {
    process.stdout.write(message.sid);
});