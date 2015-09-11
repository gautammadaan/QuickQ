var fbUtil = require("../utils/facebook");


/**
* @param req, res
* SignUp new user
*/
function signup(req, res) {
    // Check validity of access Token
    fbUtil.checkAccessToken(req, function(err, data){
        if(err)
            res.send("Invalid request or something");
    });
}

module.exports = {
    signup: signup 
};