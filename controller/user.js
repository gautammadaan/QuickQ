var fbUtil = require("../utils/facebook")
,   userModel = require("../model/user")
,   async = require("async");


/**
* @param req, res
* SignUp/Login new user
*/
function login(req, res) {
    userModel.doesUserExist(req.body.user, function(err, data){
        if (err)
            res.send(err);
        else if(data)
            res.send(data);
        else{
            userModel.save(req.body.user, function(err, data) {
                if(err)
                    res.send(err + "User could not be saved.");
                else
                    res.send(data);
            });
        }
    });
}

/**
* @param req res
* retun the user object
**/
function getUserDetails(req, res) {
    userModel.getUserByfbId(req.body.user.fbId, function(err, data){
        if (err)
            res.send(err + "User details not found");
        else
            res.send(data);
    })
}

module.exports = {
    login: login,
    getUserDetails: getUserDetails
};