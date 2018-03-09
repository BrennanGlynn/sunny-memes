const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("../auth/user.model")

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.Mixed,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId]
  },
  children: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  meme_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
})

module.exports = mongoose.model('Comment', CommentSchema);