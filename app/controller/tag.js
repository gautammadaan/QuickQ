var Tag = require('../models/tag');

function getTags(req, res) {
    // Find tags
    Tag.find(function(err, tags) {
        if (err) throw err;
        res.json({ tags: tags});
    });
}

module.exports = {
    getTags: getTags
}
