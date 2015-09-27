var async = require("async")
,   user = require("../model/user")
,   feedbackModel = require("../model/feedback");

/**
* @param req, res
* save feedback of the conversation
**/
function sendFeedback(req, res) {
    var feedback = req.body.feedback;
    // two I/O operation in parallel
    async.parallel([
        function one(callback) {
            userModel.updateQoC(feedback, callback);
        },

        function two(callback) {
            feedbackModel.updateExpertise(feedback, callback);
        }
        ], function done(err, results) {
            if (err)
                res.send("Could not update feedback");
            else
                res.send("Feedback Updated");
        }
    );
}

/**
* @param req, res
* Get user scores
**/
function getScores(req, res) {
    var user = req.body.user
    ,   score = {};

    // get QoC and tag scores with level
    async.parallel([
        function one(callback) {
            feedbackModel.getTagScoresForUser(user, function(err, data) {
                if (err)
                    callback(err, null);
                else{
                    score.tags = data;
                    callback(null, data);
                }
            });
        },

        function two(callback) {
            userModel.getQoCForUser(user, function(err, data) {
                if (err)
                    callback(err, null);
                else{
                    score.QoC = data;
                    callback(null, data);
                }
            });
        }
    ], function done(err, results) {
        if (err)
            res.send("Could not get feedback");
        else
            res.send("User Feedback Returned");
    });

}

module.exports = {
    sendFeedback: sendFeedback,
    getScores: getScores
}