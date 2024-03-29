var User = require('../models/user')
    ,jwt  = require('jsonwebtoken')
    ,fb = require('../utils/facebook');

/**
 * create a user in the database
 * @param req
 * @param callback
 * @private
 */
function __createUser(req, callback){
    // create a sample user
    var user = new User({
        name: req.body.name,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip,
        email: req.body.email,
        admin: false
    });
    user.save(function(err) {
        if(err)
            callback(err, null);
        else
            callback(null, user);
    });
}

/**
 * Check if user exists
 * @param email
 * @param callback
 * @private
 */
function __doesUserExist(email, callback){
    User.findOne({
        email: email
    }, function(err, user){
        console.log(user);
        if(err)
            callback(err, null);
        else
            callback(null, user);
    });
}

/**
 * Sign up a new user
 * @param req
 * @param res
 */
function signup(req, res) {
    //null checks
    if(!req.body.firstName || !req.body.email || !req.body.country ||!req.body.password){
        res.status(302).send({message: 'Missing fields'});
        return;
    }

    if(!__validateEmail(req.body.email)){
        res.status(302).send({message: 'Enter valid email id'});
        return;
    }
    console.log(__validateEmail(req.body.email));
    // if user exists then login
    __doesUserExist(req.body.email, function(err, user){
        if(err || user === null) {
            __createUser(req, function (err, user) {
                if (err)
                    res.status(500).send({ message: 'Could not save user in the database'});
                else
                    res.status(201).send({ message: 'User saved successfully'});
            });
        }
        else
            res.status(302).send({ message: 'User already exists'});
    });
}

function __validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

/**
 * create Json Web Token to authenticate requests
 * @param req
 * @param user
 * @private
 */
function __sendToken(req, user) {
    var token = jwt.sign(user, req.app.get('superSecret'), {
        expiresInMinutes: 1440 // expires in 24 hours
    });
    res.status(200).send({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });
}

/**
 * Sign in using email and pass
 * @param req
 * @param res
 */
function signin(req, res) {
// if user exists then signIn
    __doesUserExist(req.body.email, function(err, user) {
        if (err || user === null) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else{
            // check password matches
            if (user.password !== req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            }
            else {
                __sendToken(req, user);
            }
        }
    });
}

/**
 * Sign In using Facebook
 * @param req
 * @param res
 */
function fbSignin(req, res) {
    // Is it a valid fb user
    fb.checkAccessToken(req, function(err, isValid){
        if(err){
            res.status(400).send("Invalid Facebook login request");
        }
        else {
            // if no user then signUp using FB else sign in
            __doesUserExist(req.body.email, function (err, user) {
                if (user && err !== null)
                    __sendToken(req, user);
                else {
                    // Creating pass for fb sign up.
                    req.body.password = ((parseFloat(req.body.fbId)) * 3);
                    signup(req, res);
                }
            });
        }
    });
}

/**
 * get the list of users to answer for a particular set of tags
 * @param tags
 * @param callback
 */
function getUsersForTag(tags, callback){
    /** TODO: Algorithm to get users who have expertise in certain tags **/
    var userIds = {};
    /** TODO: return user Ids **/
}

module.exports = {
    signup: signup,
    signin: signin,
    fbSignin: fbSignin,
    getUsersForTag: getUsersForTag
}