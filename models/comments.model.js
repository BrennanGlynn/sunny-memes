const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  uploaded_by: {
    type: Object.Schema.Types.ObjectId,
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
    default: null
  },
  meme_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export default CommentSchema