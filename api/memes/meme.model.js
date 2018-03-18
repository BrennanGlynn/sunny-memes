const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set up new meme schema
const MemeSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  fileName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 10000
  },
  uploaded_by: {
    type: Schema.Types.ObjectId,
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
    type: [Schema.Types.ObjectId],
    default: []
  },
  comments: {
    type: [Schema.Types.ObjectId],
    default: []
  }
})

module.exports = mongoose.model('Meme', MemeSchema);
