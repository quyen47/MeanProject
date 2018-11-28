const mongoose = require('mongoose');

const postScheme = mongoose.Schema({
    title: { type: String, require: true},
    content: { type: String, require: true},
    imagePath: { type: String, require: true}
});

module.exports = mongoose.model('Post', postScheme);