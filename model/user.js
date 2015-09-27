var mysql = require('mysql')
,   dbconfig = require('../config/database')
,   connection = mysql.createConnection(dbconfig.connection);


/**
* @param user
* save the user to database
**/
function save(user, callback) {
    var insertUser = "insert into users values(?, ?, ?)";
    connection.query(insertUser, [1, username, req.body.password], function(err, rows){
    // This should send user's json object back, with all details
    callback(err, user);
}

/**
* private
* @param userId, callback
* TODO: Convert to data to json user object
**/

function __parseUserData(data, callback) {

}

/**
* private
* @param userId, callback
* get basic userInfo
**/
function __getUserDetailsForId(userId, callback) {
    // Return all user details after joining all tables.
    connnecton.query.(blah.........., function(err, rows){
        if (!err)
            // this method converts database rows into json user object
            __parseUserData(rows, callback);
        else
            callback(err, null);
    });
}



/**
* private
* @param fbId, callback
* get userId for fbId
**/
function __getUserIdForFbId(fbId, callback) {
// modify query to get this
    connection.query("SELECT * FROM users WHERE username = 'sparsh'", function(err, rows) {
        console.log(err);
        if (err)
            res.send(err);
        else{
            console.log(rows);
            res.send(rows[0]);
        }
    });
}

/**
* @param fbId, callback
* get all user details for fbId
**/
function getUserByFbId(fbId, callback) {
    var user = {}
    ,   userId;
    async.series([
        function first(eachCallback) {
            __getUserIdForFbId(fbId, function(err, data){
                if (!err)
                    userId = data;
                else
                    eachCallback(err + "No User exists for fbId");
            });
        },

        function second(callback) {
            __getUserDetailsForId(userId, function(err, data) {
                if (!err)
                    user = data;
                eachCallback(err);
            });
        },
        ]
        // final callback. This is called if any of the above methods throw an error or when the last one has finished execution
        function final(err, results) {
            if(err)
                callback(err, null);
            else
                callback(null, user);
        }
    );
}

/**
* @param fbId
* check if user exist in database
**/
function doesUserExist(fbId, callback) {
    // Method encapsulated
    __getUserIdForFbId(fbId, callback);
}

/**
* private 
* @param tags, callback
* Filter users to send question notifications to
**/
function __filterUsersForTag(users, callback) {
    // callback with correct set of users
}

/**
* @param tags, callback
* returns users who can answer question with specific tags
**/
function getUsersForTag(tag, callback) {
    // get all users from database associated with that tag
    var users = {};
    // filter users based on an intelligent algo, to send notification to
    // find papers suggesting some research so user remians engaged
    __filterUsersForTag(users, callback)
}

/**
* @param deviceId, callback
* Return user with specific deviceID
**/
function getUserByDeviceId(deviceID, callback) {

}


getQoCForUser

module.exports = {
    save: save,
    doesUserExist: doesUserExist,
    getUserByFbId: getUserByFbId,
    getUsersForTag: getUsersForTag,
    getUserByDeviceId: getUserByDeviceId
}
