const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const Meme = require('../models/meme.model');

router.use('/', (req, res) => {
  if (!req.user) {
    //TODO change in production
    return res.redirect('http://localhost/pleaseLogin')
  }

  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (files && fields) {
      const route = req.user.facebookId + Math.floor(Math.random() * 100000) + files.file.name.slice(files.file.name.indexOf('.'));
      const oldPath = files.file.path;
      const newPath = './public/images/memes/' + route;
      fs.rename(oldPath, newPath, function (error) {
        if (error) throw error;
        let memeData = {
          title: fields.title,
          url: '/images/memes/' + route,
          uploaded_by: req.user.facebookId,
          characters: fields.characters.split(',')
        };

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
})

module.exports = router;