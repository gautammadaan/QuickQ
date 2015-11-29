/*
 //Remember: If first volunteer available then send a local notification from iPhone
 */

var Question = require('../models/question')
    ,constants = require('../utils/constants')
    ,userController = require('./user')
    ,notifyController = require('./notification');

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
        notifiedTo: [String],
        volunteersId: [String],
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
 * TODO: how to update the question in DB? Sparsh
 * @param question
 * @param callback
 * @private
 */
function __updateQuestion(question, callback){

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
            // Update question in database with users who have been notified
            question.notifiedTo = respondents;
            __updateQuestion(question, callback);

            notifyController.notifyUsers(respondents, callback);
        }

    ], function done(err, results) {
        if (err)
            res.status(500).send({ err: err,
                                    message: "Something went wrong while asking question"});
        else
            res.status(200).send({message: "Question asked"});
    });
}


/**
 * TODO answer question of a person sparsh
 * @param req
 * @param res
 */
function answerQuestion(req, res){
    //TODO get the question from DB and update volunteers Id
    var question = req.body.question
        ,volunteer = req.body.user;

    async.parallel([
            function one(callback){
                // TODO get question from DB
                // TODO push volunteer into question
                // TODO finally update question
                __updateQuestion("<someQues>", callback);
            },

            function two(callback){
                //TODO get user from Id
                var user = {};

                notifyController.sendSilentNotification(user, callback);
            }

        ], function (err, results){
            if(err)
                res.status(500).send({err: err, message: "Something went wrong while updating a volunteer"});
            else
                res.status(200).send({message: "Volunteer updated"});
        }
    );

}

/**
 * TODO: connect two users to interact with each other, call. Use Twilio to do this on iOS, token provied by this server.
 * @param req
 * @param res
 */
function connectUsers(req, res){
    // connect using Twilio
    // Once resolver picks up the call, update resolver ID in database for the question.
}

module.exports = {
    askQuestion: askQuestion,
    answerQuestion: answerQuestion,
    connectUsers: connectUsers
}