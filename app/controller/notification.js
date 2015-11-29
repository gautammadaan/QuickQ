

/**
 * notify each user to answer a particular question
 * @param users
 * @param callback
 */
function notifyUsers(users, callback) {
    // TODO: loop over users to get device Ids

    // TODO: send http request to notify users with above device ID
}

/**
 * Silent Notification: notify any client without displaying alert or disturbing the user
 * sending a silent notification, tell client to update volunteers to answer the question
 * @param user
 * @param callback
 */
function sendSilentNotification(user, callback){
    // TODO: send notification to device ID of a user
}

module.exports = {
    notifyUsers: notifyUsers,
    sendSilentNotification: sendSilentNotification
}