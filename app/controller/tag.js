var Tag = require('../models/tag');

function getTags(req, res) {
    // Find tags
    Tag.find(function(err, tags) {
        if (err) throw err;
        res.json({ tags: tags});
    });
}

function addTag(req, res) {
    if(!req.body.name){
        res.status(302).send({message: "Please enter valid name"});
        return;
    }
    Tag.findOne({name: req.body.name}, function(err, tag){
       if(err){
           res.status(500).send({message: "An error occured"});
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
            if (err) throw err;

            console.log('Tag saved successfully');
            res.status(500).send({ message: 'Tag saved successfully' });
        });
    });
}

module.exports = {
    getTags: getTags,
    addTag: addTag
}
