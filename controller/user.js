var fbUtil = require("../utils/facebook")
,   userModel = require("../model/user");


/**
* @param req, res
* SignUp/Login new user
*/
function login(req, res) {
    userModel.doesUserExist(req.user, function(err, data){
        if (err)
            res.send(err);
        else if(data)
            res.send(data);
        else{
            userModel.save(req.user, function(err) {
                if(err)
                    res.send(err + "User could not be saved.");
                else
                    res.send(req.user);
            });
        }
    });
}

/**
* @param req res
* retun the user object
**/
function getUserDetails(req, res) {
    userModel.getUserByFbId(req.fbId, function(err, data){
        if (err) 
            res.send(err)
        else
            res.send(data);
    });
}

module.exports = {
    signup: signup,
    getUser: getUserDetails
};