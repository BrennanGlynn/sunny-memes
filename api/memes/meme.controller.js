/**
 * GET     /memes              ->  index
 * POST    /memes              ->  create
 * GET     /memes/:id          ->  show
 * GET     /memes/mine         ->  getMine
 * GET     /memes/recent       ->  getRecent
 * GET     /memes/favorites    ->  getFavs
 * POST    /memes/favorite     ->  favorite
 * PUT     /memes/:id/comment  ->  comment
 * DELETE  /memes/:id          ->  destroy
 */

const Meme = require("./meme.model");
const fs = require("fs");
const formidable = require('formidable');
const typesAllowed = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml']

const memesPerPage = 50;
const projectionTemplate = {
  "url": 1,
  "title": 1,
  "uploaded_by": 1,
  "author_name": 1,
  "characters": 1,
  "favorites": 1,
  "numFaves": {"$size": "$favorites"},
  "visits": 1,
  "comments": 1,
}

const commentAggregation = [// Make a separate meme for each comment id
  //Get meme authors info
  {
    $lookup: {
      from: "users",
      localField: "uploaded_by",
      foreignField: "_id",
      as: "uploaded_by"
    }
  },
  {
    $unwind: {
      path: "$uploaded_by",
      preserveNullAndEmptyArrays: true,
    }
  },
  {
    $unwind: {
      path: "$comments",
      preserveNullAndEmptyArrays: true,
    },
  },
  // For each meme convert comment id to the comment from the database
  {
    $lookup: {
      from: "comments",
      localField: "comments",
      foreignField: "_id",
      as: "comments",
    },
  },
  // Convert comment array to object
  {
    $unwind: {
      path: "$comments",
      preserveNullAndEmptyArrays: true,
    }
  },
  {
    $lookup: {
      from: "comments",
      localField: "comments.children",
      foreignField: "_id",
      as: "comments.children"
    }
  },
  // Do the same thing recursively for replies
  // {
  //   $graphLookup: {
  //     from: "comments",
  //     startWith: "$comments.children",
  //     connectFromField: "comments.children",
  //     connectToField: "_id",
  //     as: "comments.children",
  //   }
  // },
  //  Merge all of the comments back into 1 meme object
  {
    $group: {
      _id: "$_id",
      title: {$first: "$title"},
      url: {$first: "$url"},
      uploaded_by: {$first: "$uploaded_by"},
      author_name: {$first: "$author_name"},
      favorites: {$first: "$favorites"},
      visits: {$first: "$visits"},
      tags: {$first: "$tags"},
      characters: {$first: "$characters"},
      comments: {$push: "$comments"},
    }
  }
]

exports.index = (req, res) => {
  const page = req.query.page;
  const chars = req.query.chars;
  let query = {};

  if (typeof chars === "object") {
    query.characters = {$all: chars}
  } else if (typeof chars === "string") {
    query.characters = chars
  }

  Meme.aggregate(
    {$match: query},
    ...commentAggregation,
    {
      $addFields: {numFaves: {$size: "$favorites"}}
    },
    {
      $sort: {
        "numFaves": -1,
        "_id": -1,
      },
    },
    {$skip: page * memesPerPage || 0},
    {$limit: memesPerPage},
    function (err, docs) {
      if (!err) res.json({documents: docs})
    },
  )
}

exports.create = (req, res) => {

  // Ensure user is in session
  if (!req.user) {
    //TODO change in production
    return res.redirect('http://localhost/pleaseLogin')
  }

  // Read incoming form
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {

    // Discard requests without a file
    if (files.file && fields) {

      // Ensure file is one of the allowed types above
      if (!typesAllowed.includes(files.file.type)) return res.json({error: 'not saved'})
      const route = req.user._id + Math.floor(Math.random() * 100000) + files.file.name.slice(files.file.name.indexOf('.'));
      const oldPath = files.file.path;
      const newPath = './public/images/memes/' + route;
      const characters = fields.characters && fields.characters !== "" ? fields.characters.split(',') : []
      fs.rename(oldPath, newPath, function (error) {
        if (error) throw error;
        let memeData = {
          title: fields.title,
          url: '/images/memes/' + route,
          uploaded_by: req.user._id,
          author_name: req.user.name,
          characters
        };

        // Store meme in server
        Meme.create(memeData, function (err, meme) {
          if (err) {
            console.log(err);
            res.status = 501;
            return res.send('Error creating meme: ' + err);
          }
          //TODO change in production
          return res.redirect('http://localhost:3000/myMemes');
        });
      })
    } else res.json({});
  })
}

exports.show = (req, res) => {
  Meme.findOne({_id: req.params.id}, function (err, meme) {
    if (meme) {
      return res.json(meme)
    } else {
      res.status(500)
      return res.json(err)
    }
  })
}

exports.getMine = (req, res) => {
  // login check
  if (!req.user) {
    return res.json({documents: []})
  }
  const page = req.query.page;
  const chars = req.query.chars;

  let query = {
    uploaded_by: req.user._id
  };

  if (typeof chars === "object") {
    query.characters = {$all: chars}
  } else if (typeof chars === "string") {
    query.characters = chars
  }

  Meme.aggregate(
    {$match: query},
    ...commentAggregation,
    {
      $sort: {
        "_id":
          -1,
      },
    }, {
      $skip: page * memesPerPage || 0,
    }, {
      $limit: memesPerPage,
    },
    function (err, docs) {
      if (!err) res.json({documents: docs})
    })
}

exports.getRecent = (req, res) => {
  const page = req.query.page;
  const chars = req.query.chars;
  let query = {};

  if (typeof chars === "object") {
    query.characters = {$all: chars}
  } else if (typeof chars === "string") {
    query.characters = chars
  }

  Meme.aggregate(
    // Only find memes with all characters
    {$match: query},
    ...commentAggregation,
    // Sort them by most recent
    {
      $sort: {
        "_id": -1,
      },
    },
    // Skip to page needed
    {$skip: page * memesPerPage || 0},
    {
      $limit: memesPerPage
    }
    ,

    function (err, docs) {
      if (!err) res.json({documents: docs})
    }
  )
}

exports.getFavs = (req, res) => {
  const page = req.query.page;
  const chars = req.query.chars;
  let query = {
    favorites: req.user._id,
  };

  if (typeof chars === "object") {
    query.characters = {$all: chars}
  } else if (typeof chars === "string") {
    query.characters = chars
  }

  Meme.aggregate(
    {$match: query},
    ...commentAggregation,
    {
      $sort: {
        "_id": -1,
      },
    },
    {$skip: page * memesPerPage || 0},
    {$limit: memesPerPage},
    function (err, docs) {
      if (!err) res.json({documents: docs})
    }
  )
}

exports.favorite = (req, res) => {
  const memeId = req.body.meme
  const userId = req.user._id

  // login check
  if (!req.user) return res.json({message: "Please login first"})

  // find meme being updated
  Meme.findOne({_id: memeId}, "favorites", function (err, meme) {
    if (err) {
      return res.json({error: err})
      // add favorite if user hasn't already
    } else if (meme.favorites.indexOf(userId) === -1) {
      updateMeme({$addToSet: {favorites: userId}}, req, res)
      // remove favorite if user had set it as a favorite before
    } else {
      updateMeme({$pull: {favorites: userId}}, req, res)
    }
  })
}

exports.comment = (req, res) => {

}

exports.destroy = (req, res) => {

  // get details about meme getting deleted
  Meme.findOne({_id: req.params.id}, function (err, meme) {
    if (meme) {
      // if authorized
      if (req.user._id === meme.uploaded_by || req.user.admin) {
        // delete meme
        Meme.remove({_id: req.params.id}, function (err, result) {
          if (err) console.log(err)

          // remove image from server
          fs.unlink("./public" + meme.url, function () {
            console.log("image deleted from server")
          })

          // return original meme
          return res.json(meme)
        })
      } else {
        return res.json({error: "not authorized to delete this file"})
      }
    }
  })
}

function updateMeme(update, req, res) {
  Meme.findOne({_id: req.body.meme}, "favorites", function (err, meme) {
    if (err) {
      return res.json({error: err})
    }

    Meme.findByIdAndUpdate(req.body.meme, update, {
      safe: true,
      new: true,
    }, (err, meme) => {
      if (err) {
        return res.json({"Error adding favorite": err});
      } else return res.json({
        meme: req.body.meme,
        updatedMeme: meme,
      })
    })
  })
}
