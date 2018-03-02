/**
 * POST    /comments/:memeId            ->  create
 * PUT     /comments/:id                ->  update
 * DELETE  /comments/:id                ->  destroy
 */

exports.create = (req, res) => {
  let example = {
    user: {
      "_id" : ObjectId("5a7a4fa7a6ff00702179ad56"),
        "facebookId" : "10156593256159947",
        "name" : "Brennan Glynn",
        "picture" : "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.200.200/p200x200/26166992_10156559405629947_2463547378061285085_n.jpg?oh=1a15d63d0e4783c7f649314bff272435&oe=5B22E753",
        "admin" : true,
        "__v" : 0
    },
    text: "This could be a comment",
    likes: [],
    children: [],
    meme_id: new ObjectId("5a987e5f0a02a22150486709")
  }

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

  res.json({todo: true, user: req.user || 'not logged in', comment: req.body.comment, parent: req.body.parent, meme_id: req.params.memeId})
}

exports.update = (req, res) => {
  res.json({todo: true})
}

exports.destroy = (req, res) => {
  res.json({todo: true})
}