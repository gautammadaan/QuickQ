var Tag = require('../models/tag');

function getTags(req, res) {
    // Find tags
    Tag.find(function(err, tags) {
        if (err)
            res.status(500).send({err: err, message: "Could not find the tag"});
        else
            res.status(200).send({ tags: tags});
    });
}

function addTag(req, res) {
    if(!req.body.name){
        res.status(302).send({message: "Please enter valid name"});
        return;
    }
    Tag.findOne({name: req.body.name}, function(err, tag){
       if(err){
           res.status(500).send({err: err, message: "Error while finding tag"});
           return;
       }
       if(tag){
           res.status(302).send({message: "Tag already exists"});
           return;
       }
        var tag = new Tag({
           name: req.body.name
        });
        tag.save(function(err) {
            if (err)
                res.status(500).send({ err: err, message: 'Unable to save tag' });
            else
                res.status(200).send({err: err, message:"Tag saved successfully"});
        });
    });
}

module.exports = {
    getTags: getTags,
    addTag: addTag
}
