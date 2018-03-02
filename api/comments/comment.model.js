const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("../auth/user.model")

const CommentSchema = new Schema({
  user: {
    type: UserSchema
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
    default: null
  },
  meme_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
})

export default CommentSchema