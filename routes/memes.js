const express = require('express');
const Meme = require('../models/meme.model');

const router = express.Router();

router.use('/', (req, res) => {
  const page = req.query.page;
  const chars = req.query.chars;
  const memesPerPage = 30;
  let query = {};

  if (chars) {
    query.characters = { $all: chars}
  }

  console.log(query.characters)

  Meme.find(query, null, {skip: page * memesPerPage, limit: memesPerPage, sort: {_id: 1}}, function (err, docs) {
    if (!err) {
      res.json({documents: docs})
    }
  });
})

module.exports = router;