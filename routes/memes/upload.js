const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const Meme = require('../../models/meme.model');
const typesAllowed = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml']

// use this route to test upload features

router.use('/test', (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true
  form.parse(req, function (err, fields, files) {
    if (files.file && fields) {
      if (!typesAllowed.includes(files.file.type)) {
        console.log('bad type error', files.file.type)
        return res.json({error: 'bad type'})
      }
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

        console.log(memeData.title)
        res.json(memeData)
      })
    } else {
      console.log('not saved', files.file)
      res.json({});
    }
  })
})

router.use('/', (req, res) => {

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
      const route = req.user.facebookId + Math.floor(Math.random() * 100000) + files.file.name.slice(files.file.name.indexOf('.'));
      const oldPath = files.file.path;
      const newPath = './public/images/memes/' + route;
      const characters = fields.characters && fields.characters !== "" ? fields.characters.split(',') : []
      fs.rename(oldPath, newPath, function (error) {
        if (error) throw error;
        let memeData = {
          title: fields.title,
          url: '/images/memes/' + route,
          uploaded_by: req.user.facebookId,
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
})

module.exports = router;
