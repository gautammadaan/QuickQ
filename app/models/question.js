/**
 * Created by sparshithp on 11/20/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Question', new Schema({
    isAnswered: Boolean,
    askedById: String,
    notifiedTo: [String],
    volunteersId: [String],
    resolverIds: [String],
    text: String
}));