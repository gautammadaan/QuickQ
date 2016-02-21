var request = require("request")
    ,oauth = require("../config/config").ids;

function checkAccessToken(req, callback) {
    if (req.body.accessToken) {

        var debugTokenUrl = oauth.facebook.api + "/debug_token?input_token=" + req.body.accessToken + "&access_token=" + oauth.facebook.accessToken;

        request.get(debugTokenUrl, function(error, response, body){
            if (error) {
                callback(error, null);
            }
            else {
                body = JSON.parse(body);
                console.log(body);
                if(body.data.is_valid && body.data.user_id === req.body.fbId)
                    callback(null, true);
                else
                    callback(true, null);
            }
        });
    }
}

module.exports = {
    checkAccessToken: checkAccessToken
}