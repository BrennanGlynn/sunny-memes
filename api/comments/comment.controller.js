/**
 * POST    /comments/:memeId            ->  create
 * PUT     /comments/:id                ->  update
 * DELETE  /comments/:id                ->  destroy
 */
const Comment = require("./comment.model")
const Meme = require("../memes/meme.model")

exports.create = (req, res) => {
  const state = req.body.state,
        user = req.user

  const comment = {
    user: req.user,
    text: state.comment.trim(),
    meme_id: state.meme
  }

  if (!req.user) return res.json({error: "You must be logged in to comment"})

  if (comment.text) {
    Comment.create(comment, function (err, comment) {
      if (!err) {
        if (!state.parent) {
          // this is a regular comment
          Meme.findByIdAndUpdate(comment.meme_id, {$push: {comments: comment._id}}, {
            safe: true,
            new: true,
          }, (err, meme) => {
            if (err) {
              return res.json({err})
            } else return res.json({
              commentUploaded: true,
              comment
            })
          })
        } else {
          //  this is a reply
          Comment.findByIdAndUpdate(state.parent, {$push: {children: comment._id}}, {
            safe: true,
            new: true,
          }, (err, meme) => {
            if (err) {
              return res.json({err})
            } else return res.json({
              commentUploaded: true,
              comment
            })
          })
        }
      }
    })
  }
}

exports.update = (req, res) => {
  res.json({todo: true})
}

exports.destroy = (req, res) => {
  res.json({todo: true})
}