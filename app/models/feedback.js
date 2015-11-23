/**
 * Created by sparshithp on 11/20/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Feedback', new Schema({
    userId: String,
    tagId: String,
    score: Number,
    level: Number
}));