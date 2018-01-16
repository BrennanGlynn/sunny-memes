const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set up new meme schema
const MemeSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    uploaded_by: {
        type: String,
        required: true
    },
    characters: {
        type: [String],
        required: true
    },
    tags: [String],
    visits: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Meme', MemeSchema);
