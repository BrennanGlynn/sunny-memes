const express = require('express');
const Meme = require('../models/meme.model');

const router = express.Router();
const memesPerPage = 30;

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

  if (chars) {
    query.characters = {$all: chars}
  }

  Meme.find(query, null, {skip: page * memesPerPage, limit: memesPerPage, sort: {_id: -1}}, function (err, docs) {
    if (!err) {
      res.json({documents: docs})
    }
  })
})

router.use('/', (req, res) => {
  const page = req.query.page;
  const chars = req.query.chars;
  let query = {};

  if (chars) {
    query.characters = {$all: chars}
  }

  Meme.find(query, null, {skip: page * memesPerPage, limit: memesPerPage, sort: {_id: -1}}, function (err, docs) {
    if (!err) {
      res.json({documents: docs})
    }
  });
})

module.exports = router;