const express = require('express');
const Meme = require('../models/meme.model');

const router = express.Router();
const memesPerPage = 30;

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

  console.log(query)

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