const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set up new meme schema
const MemeSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        require: true,
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
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Meme', MemeSchema);
