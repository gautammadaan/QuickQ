var async = require("async")
    ,   user = require("./model/user")
    ,   feedbackModel = require("./model/feedback");

/**
 * save feedback of the person who asked the question
 * @param req
 * @param res
 */
function sendFeebackQuestioner(req, res){
    var feedback = req.body.feedback;
    feedbackModel.updateExpertise(feedback, function(err, done){
        if(err)
            res.status(500).send({ message: "Could not save feedback of questioner in database"});
        else
            res.status(200).send({ message: "Feedback saved"});
    });
}

/**
 * save feedback of the respondent
 * @param req
 * @param res
 */
function sendFeedbackRespondent(req, res) {
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
                res.status(500).send({ message: "Could not save feedback of respondent"});
            else
                res.status(200).send({ message: "Feedback for respondent has been saved"});
        }
    );
}

/**
 * Get user scores
 * @param req
 * @param res
 */
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
            res.status(500).send({ message: "Could not retrieve user feedback"});
        else
            res.status(200).send({ message: "Success, User scores available",
                                    result: results });
    });
}

module.exports = {
    sendFeedbackRespondent: sendFeedbackRespondent,
    sendFeebackQuestioner: sendFeebackQuestioner,
    getScores: getScores
}