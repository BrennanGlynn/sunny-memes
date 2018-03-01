const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("../auth/user.model")

const CommentSchema = new Schema({
  userId: {
    type: Object.Schema.Types.ObjectId,
  },
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

// example adding a comment to database
// db.comments.insert({
//   uploaded_by: new ObjectId("5a7a4fa7a6ff00702179ad56"),
//   text: "This reply was added through the mongo shell",
//   meme_id: new ObjectId("5a91edbd1a731e02fcd1383f")
// })

// example query adding a comment to a meme
// db.memes.update({_id: new ObjectId("5a91edbd1a731e02fcd1383f")}, { $push: {comments: new ObjectId("5a9320a1f5f4fe5c7a6b426d")}})

// example query adding a reply to a comment
// db.comments.update({_id: new ObjectId("5a9320a1f5f4fe5c7a6b426d")}, { $push: {children: new ObjectId("5a9321dcf5f4fe5c7a6b426e")}})

export default CommentSchema