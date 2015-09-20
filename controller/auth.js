var fbUtil = require("../utils/facebook");


/**
* @param req, res
* SignUp/Login new user
*/
function login(req, res) {
    // Check validity of access Token
    fbUtil.checkAccessToken(req, function(err, data) {
        if(err)
            res.send("Invalid request or something");
        else{
            // check if user exist in DB
            // if exists then return user, else save in Database and still return user object
            res.send(data);
        }
    });
}

module.exports = {
    signup: signup 
};