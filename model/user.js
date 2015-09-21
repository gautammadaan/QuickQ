/**
* @param user
* save the user to database
**/
function save(user, callback) {
    var insertUser = "insert into users values(?, ?, ?)";
    connection.query(insertUser, [1, username, req.body.password], function(err, rows){
    res.send(rows);
}

/**
* @param fbId, callback
* get all user details for fbId
**/
function getUserByfbId(fbId, callback) {
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
* @param fbId
* check if user exist in database
**/
function doesUserExist(fbId, callback) {
    getUserByfbId(fbId, callback);
}


module.exports = {
    save: save,
    getUserByfbId: getUserByfbId,
    doesUserExist: doesUserExist
}
