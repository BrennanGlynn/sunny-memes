const express = require("express");
const fs = require("fs");
const Meme = require("../../models/meme.model");
const router = express.Router();
const memesPerPage = 30;

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

router.delete("/:id", (req, res) => {

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
})

router.use("/favorite", (req, res) => {
  // login check
  if (!req.user) return res.json({message: "Please login first"})

  // find meme being updated
  Meme.findOne({_id: req.body.meme}, "favorites", function (err, meme) {
    if (err) {
      return res.json({error: err})

      // add favorite if user hasn't already
    } else if (meme.favorites.indexOf(req.user._id) === -1) {

      Meme.findByIdAndUpdate(req.body.meme, {$addToSet: {favorites: req.user._id}}, {
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
      // remove favorite if user had set it as a favorite before
    } else {
      Meme.findByIdAndUpdate(req.body.meme, {$pull: {favorites: req.user._id}}, {new: true}, (err, meme) => {
        if (err) {
          return res.json({message: err});
        } else return res.json({
          updatedMeme: meme,
          meme: req.body.meme,
        })
      })
    }
  })
})

router.use("/mine", (req, res) => {
  // login check
  if (!req.user) {
    return res.json({documents: []})
  }
  const page = req.query.page;
  const chars = req.query.chars;

  let query = {
    uploaded_by: req.user._id,
  };

  if (typeof chars === "object") {
    query.characters = {$all: chars}
  } else if (typeof chars === "string") {
    query.characters = chars
  }

  Meme.aggregate(
    {$match: query},
    {
      $project: projectionTemplate,
    },
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
})

router.use("/recent", (req, res) => {
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
    {
      $sort: {
        "_id": -1,
      },
    },
    {$skip: page * memesPerPage || 0},
    {
      $addFields: {
        "numFaves": {"$size": "$favorites"},
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
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
  {
    $group: {
      _id: "$_id",
      title:{$first:"$title"},
      url:{$first:"$url"},
      uploaded_by:{$first:"$uploaded_by"},
      author_name:{$first:"$author_name"},
      favorites: {$first: "$favorites"},
      visits: {$first: "$visits"},
      tags:{$first:"$tags"},
      characters:{$first:"$characters"},
      comments: {$push: "$comments"}
    }
  },
  {
    $limit: memesPerPage
  }
,

  function (err, docs) {
    if (!err) res.json({documents: docs})
  }

,
)
})

router.use("/favorites", (req, res) => {
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
    {
      $project: projectionTemplate,
    },
    {
      $sort: {
        "_id": -1,
      },
    },
    {$skip: page * memesPerPage || 0},
    {$limit: memesPerPage},
    function (err, docs) {
      if (!err) res.json({documents: docs})
    },
  )
})

router.get("/:id", (req, res) => {
  Meme.findOne({_id: req.params.id}, function (err, meme) {
    if (meme) {
      return res.json(meme)
    } else {
      res.status(500)
      return res.json(err)
    }
  })
})


router.use("/", (req, res) => {
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
    {
      $project: projectionTemplate,
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
})

module.exports = router;