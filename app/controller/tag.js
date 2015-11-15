var Tag = require('../models/tag');

exports.getTags = function(req, res) {
    // create a sample user
    Tag.find(function(err, tags) {
        if (err) throw err;

        console.log('Tags retrieved successfully');
        res.json({ tags: tags});
    });
};
