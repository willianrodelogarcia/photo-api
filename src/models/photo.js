const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjetcId = Schema.ObjetcId;
const PhotoSchema = Schema({
    urlPhoto: String,
    name: String
});


module.exports = mongoose.model('Photo',PhotoSchema);