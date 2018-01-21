const express = require('express');
const Meme = require('../models/meme.model');

const router = express.Router();
const memesPerPage = 30;

router.use('/favorite', (req, res) => {
  if (!req.user) return res.json({message: 'Please login first'})

  Meme.findByIdAndUpdate(req.body.meme, {$addToSet: {favorites: req.user.facebookId}}, {safe: true, new: true}, (err, meme) => {
    if (err) {
      return res.json({'Error adding favorite': err});
    } else return res.json({message:'added favorite', meme: req.body.meme, id: req.user.facebookId})
  })
})

router.use('/mine', (req, res) => {
  if (!req.user) {
    return res.redirect('http://localhost:3000/pleaseLogin')
  }
  const page = req.query.page;
  const chars = req.query.chars;

  let query = {
    uploaded_by: req.user.facebookId
  };

  if (chars) {
    query.characters = { $all: chars}
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
    query.characters = { $all: chars}
  }

  Meme.find(query, null, {skip: page * memesPerPage, limit: memesPerPage, sort: {_id: -1}}, function (err, docs) {
    if (!err) {
      res.json({documents: docs})
    }
  });
})

module.exports = router;