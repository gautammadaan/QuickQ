var Question = require('./models/question')
    ,constants = require('./utils/constants')
    ,userController = require('user')
    ,notifyController = require('notification');

var async = require("async");


/**
 * Save a question in the database
 * @param question
 * @param callback
 * @private
 */
function __save(question, callback){
    // create a new question
    var question = new Question({
        isAnswered: false,
        askedById: question.user.id,
        resolverIds: [String],
        text: question.text,
        status: constants.quesStatus.asked
    });
    question.save(function(err) {
        if(err)
            callback(err, null);
        else
            callback(null, question);
    });
}

/**
 * Ask questions from required people
 * @param req
 * @param res
 */
function askQuestion(req, res){
    var question = req.body.question
        ,   tags = question.tags;

    async.waterfall([
        function first(callback) {
            __save(question, callback);
        },

        function second(firstResult, callback) {
            userController.getUsersForTag(tags, callback);
        },

        function third(respondents, callback) {
            notifyController.notifyUsers(respondents, callback);
        }

    ], function done(err, results) {
        if (err)
            res.status(500).send(err + " Something went wrong while asking question");
        else
            res.status(200).send("Question Asked");
    });
}


/**
 * TODO answer question of a person
 * @param req
 * @param res
 */
function answerQuestion(req, res){

}

/**
 * TODO: connect two users to interact with each other, via text/call
 * @param req
 * @param res
 */
function connectUsers(req, res){

}

module.exports = {
    askQuestion: askQuestion,
    answerQuestion: answerQuestion,
    connectUsers: connectUsers
}