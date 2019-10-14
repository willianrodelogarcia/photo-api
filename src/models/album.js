const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AlbumSchema = Schema({
    name: String,
    photos:[]
});


module.exports = mongoose.model('album',AlbumSchema);