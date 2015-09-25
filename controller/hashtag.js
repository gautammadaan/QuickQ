var tagModel = require("../model/hashtag");

/**
* @param req, res
* get all the tags available in the system
**/
function getTags(req, res) {
    tagModel.getAllTags(funciton(err, data) {
        if (err)
            res.send(err + "Could not retrive all system tags");
        else
            res.send(data);
    });
}

module.exports = {
    getTags: getTags
}