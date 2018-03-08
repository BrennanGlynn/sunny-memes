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

exports.likeComment = (req, res) => {
  const commentId = req.params.id
  const user = req.user || {_id: "5a7a4fa7a6ff00702179ad56"}

  // login check
  if (!user) return res.status(500).send("Must be logged in first")

  // find meme being updated
  Comment.findOne({_id: commentId}, function (err, comment) {
    if (err) {
      return res.status(500).json({err})
      // add favorite if user hasn't already
    } else if (comment.likes.indexOf(user._id) === -1) {
      safeUpdate(commentId, {$addToSet: {likes: user._id}}, req, res)
      // remove favorite if user had set it as a favorite before
    } else {
      safeUpdate(commentId, {$pull: {likes: user._id}}, req, res)
    }
  })
}

function safeUpdate(id, update, req, res) {
  Comment.findOne({_id: id}, function (err, model) {
    if (err) {
      return res.status(500).json({error: err})
    }

    Comment.findByIdAndUpdate(id, update, {
      safe: true,
      new: true,
    }, (err, model) => {
      if (err) {
        return res.status(500).json({err});
      } else return res.json({
        objectId: id,
        updatedObject: model,
      })
    })
  })
}

exports.destroy = (req, res) => {
  res.json({todo: true})
}