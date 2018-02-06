const express = require('express');
const fs = require('fs');
const Meme = require('../../models/meme.model');
const router = express.Router();
const memesPerPage = 30;

router.delete('/:id', (req, res) => {
  // Include admins as authorized users
  // TODO store admin status in users
  let AuthorizedUsers = ['10156593256159947', '10157285303858508']

  // get details about meme getting deleted
  Meme.findOne({_id: req.params.id}, function (err, meme) {
    if (meme) {
      // add the author as an authorized user
      AuthorizedUsers.push(meme.uploaded_by)

      // if authorized
      if (AuthorizedUsers.includes(req.user.facebookId)) {
        // delete meme
        Meme.remove({ _id: req.params.id}, function (err, result) {
          if (err) console.log(err)

          // remove image from server
          fs.unlink('./public' + meme.url, function () {
            console.log('image deleted from server')
          })

          // return original meme
          return res.json(meme)
        })
      } else {
        return res.json({error: 'not authorized to delete this file'})
      }
    }
  })
})

router.use('/favorite', (req, res) => {
  // login check
  if (!req.user) return res.json({message: 'Please login first'})

  // find meme being updated
  Meme.findOne({_id: req.body.meme}, 'favorites', function (err, meme) {
    if (err) {
      return res.json({error: err})

      // add favorite if user hasn't already
    } else if (meme.favorites.indexOf(req.user.facebookId) === -1) {

      Meme.findByIdAndUpdate(req.body.meme, {$addToSet: {favorites: req.user.facebookId}}, {
        safe: true,
        new: true
      }, (err, meme) => {
        if (err) {
          return res.json({'Error adding favorite': err});
        } else return res.json({
          message: 'added favorite',
          meme: req.body.meme,
          id: req.user.facebookId,
          isFavorite: true
        })
      })

      // remove favorite if user had set it as a favorite before
    } else {
      Meme.findByIdAndUpdate(req.body.meme, {$pull: {favorites: req.user.facebookId}}, (err, meme) => {
        if (err) {
          return res.json({message: err});
        } else return res.json({
          message: 'Removed favorite',
          meme: req.body.meme,
          id: req.user.facebookId,
          isFavorite: false
        })
      })
    }
  })
})

router.use('/mine', (req, res) => {
  // login check
  if (!req.user) {
    return res.json({documents: []})
  }
  const page = req.query.page;
  const chars = req.query.chars;

  let query = {
    uploaded_by: req.user.facebookId
  };

  if (typeof chars === 'object') {
    query.characters = {$all: chars}
  } else if (typeof chars === 'string') {
    query.characters = chars
  }

  Meme.aggregate(
    {$match: query},
    {
      $project: {
        "url": 1,
        "title": 1,
        "uploaded_by": 1,
        "characters": 1,
        "favorites": 1,
        "numFaves": {"$size": "$favorites"}
      }
    },
    {
      $sort: {
        "_id": -1
      }
    },
    {$skip: page * memesPerPage || 0},
    {$limit: memesPerPage},
    function (err, docs) {
      if (!err) res.json({documents: docs})
    }
  )
})

router.use('/', (req, res) => {
  const page = req.query.page;
  const chars = req.query.chars;
  let query = {};

  if (typeof chars === 'object') {
    query.characters = {$all: chars}
  } else if (typeof chars === 'string') {
    query.characters = chars
  }

  Meme.aggregate(
    {$match: query},
    {
      $project: {
        "url": 1,
        "title": 1,
        "uploaded_by": 1,
        "characters": 1,
        "favorites": 1,
        "numFaves": {"$size": "$favorites"}
      }
    },
    {
      $sort: {
        "numFaves": -1,
        "_id": -1
      }
    },
    {$skip: page * memesPerPage || 0},
    {$limit: memesPerPage},
    function (err, docs) {
      if (!err) res.json({documents: docs})
    }
  )
})

module.exports = router;