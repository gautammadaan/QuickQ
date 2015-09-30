var quesModel = require("../model/question")
,   userModel = require("../model/user")
,   notifyCntrl = require("notification")
,   constants = require("../utils/constants")
,   async = require("async");

/**
* @param req, res
* Ask a question to users
**/
function askQuestion(req, res) {
    var question = req.body.question
    ,   tags = question.tags;

    async.waterfall([
        function first(callback) {
            quesModel.save(question, callback);
        },

        function second(firstResult, callback) {
            userModel.getUsersForTag(tags, callback);
        },

        function third(respondents, callback) {
            notifyCntrl.notifyUsers(respondents, callback);
        }

    ], function done(err, results) {
        if (err)
            res.send(err + "Something went wrong while asking question");
        else
            res.send("Question Asked");
    });
}

/**
* private
* @param question, callback
* check if the question has been answered or not
**/
function __canQuestionBeAnswered(question, callback) {
    quesModel.getStatusOfQuestion(question, function(err, data) {
        if (err)
            return callback(err, null);
        if(data === constants.quesStatus.asked)
            callback(null, false);
        else
            callback(null, true);
    });
}

/**
* private
* @param question, callback
* return the user object
**/
function __connectUsersForQuestion(question, callback) {
    //** TODO: should we save chat local or on server??
    userModel.getUserByDeviceId(question.askedBy, callback);
}

/**
* @param req, res
* Answer a particular question
**/
function answerQuestion(req, res) {
    var question = req.body.question
    __canQuestionBeAnswered(question, function(err, data) {
        if(err)
            res.send(err + "Problem occured in answering question");
        else {
            if(data) {
                __connectUsersForQuestion(question, function(err, data) {
                    if (err)
                        res.send(err + "Could not connect users for chatting");
                    else
                        // send user details of person who has asked the question
                        res.send(data + "Users Connected");
                });
            }
        }
    });
}

module.exports = {
    answerQuestion: answerQuestion,
    askQuestion: askQuestion
}