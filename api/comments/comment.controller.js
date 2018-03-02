/**
 * POST    /comments/:memeId            ->  create
 * PUT     /comments/:id                ->  update
 * DELETE  /comments/:id                ->  destroy
 */

exports.create = (req, res) => {
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

  console.log(req.body)
  res.json({todo: true, user: req.user || 'not logged in', text: req.body.text, parent: req.body.parent, meme_id: req.params.memeId})
}

exports.update = (req, res) => {
  res.json({todo: true})
}

exports.destroy = (req, res) => {
  res.json({todo: true})
}