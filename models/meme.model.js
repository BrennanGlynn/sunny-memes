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
    required: true,
    maxlength: 65
  },
  uploaded_by: {
    type: String,
    required: true
  },
  characters: {
    type: [String],
    default: []
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
