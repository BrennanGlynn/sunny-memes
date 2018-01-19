const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const Meme = require('../models/meme.model');

router.use('/', (req, res) => {
    if (!req.user) {
        return res.redirect('http://localhost:3000')
    }

    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const oldPath = files.file.path;
        const newPath = './public/images/memes/' + req.user.facebookId + files.file.name;
        fs.rename(oldPath, newPath, function (error) {
            if (error) throw error;
            let memeData = {
                title: fields.title,
                url: '/images/memes/' + req.user.facebookId + Math.floor(Math.random() * 100000) + files.file.name.trim(),
                uploaded_by: req.user.facebookId,
                characters: new Array()
            };

            if (fields.charlie) memeData.characters.push('charlie');
            if (fields.mac) memeData.characters.push('mac');
            if (fields.dennis) memeData.characters.push('dennis');
            if (fields.frank) memeData.characters.push('frank');
            if (fields.dee) memeData.characters.push('dee');
            // if (fields.)
            Meme.create(memeData, function (err, meme) {
                if (err) {
                    console.log(err);
                    res.status = 501;
                    return res.send('Error creating meme: ' + err);
                }
                return res.redirect('http://localhost:3000/');
            });
        })
    })
})

module.exports = router;