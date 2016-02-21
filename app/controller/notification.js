var constants = require('../utils/constants.js');

/**
 * @param  {String}
 * @return {}
 * Contact notification server and tell
 */
function __notifyiOSDevice(snsEndpoint, message, callback) {
    var payload = {
        default: message,
        APNS: {
            aps: {
                alert: message,
                sound: 'default',
                badge: 1
            }
        }
    };

    // first have to stringify the inner APNS object...
    payload.APNS = JSON.stringify(payload.APNS);
    // then have to stringify the entire message payload
    payload = JSON.stringify(payload);

    console.log('sending push');
    sns.publish({
        Message: payload,
        MessageStructure: 'json',
        TargetArn: snsEndpoint
    }, function(err, data) {
        if (err) {
            console.log(err.stack);
            return callback(err, null);
        }

        console.log('push sent');
        console.log(data);
    });

    return callback(null, null);

}

/**
 * @todo [description] 
 * @param  {Strinf}
 * @param  {String}
 * @return {Function}
 */ 
function __notifyAndroidDevice(snsEndpoint, message, callback) {
}

/**
 * notify each user to answer a particular question
 * @param users
 * @param callback
 */
function notifyUsers(question, users, callback) {
    // TODO: loop over users to get their push notification endpoint
    // assuming users is an array of user Objects

    async.each(users, function(userObj, callback) {

        // Perform operation on file here.
        console.log('Notifying user ' + userObj.firstName + " " userObj.lastName);

        if(userObj.deviceType === constants.deviceType.iOS)
            __notifyDevice(userObj.snsEndpoint, question, callback);

        else if(userObj.deviceType === constants.deviceType.android)
            __notifyDevice(userObj.snsEndpoint, question, callback);
        else{
            var err = {
                message: "Unknown device type found"
            }
            return callback(err, null);
        }

    }, function(err){
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process');
        } else {
          console.log('All files have been processed successfully');
        }
    });
}

/**
 * Silent Notification: notify any client without displaying alert or disturbing the user
 * sending a silent notification, tell client to update volunteers to answer the question
 * @param user
 * @param callback
 */
function sendSilentNotification(user, callback){
    if(userObj.deviceType === constants.deviceType.iOS)
            __notifyDevice(userObj.snsEndpoint, question, callback);

        else if(userObj.deviceType === constants.deviceType.android)
            __notifyDevice(userObj.snsEndpoint, question, callback);
        else{
            var err = {
                message: "Unknown device type found"
            }
            return callback(err, null);
        }    
}

module.exports = {
    notifyUsers: notifyUsers,
    sendSilentNotification: sendSilentNotification
}