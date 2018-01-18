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
            console.log(req.user);
            const memeData = {
                url: '/images/memes/' + req.user.facebookId + Math.floor(Math.random() * 100000) + files.file.name.trim(),
                uploaded_by: req.user.facebookId,
                characters: ['charlie']
            };
            Meme.create(memeData, function (err, meme) {
                if (err) {
                    console.log(err);
                    res.status = 501;
                    return res.send('Error creating meme')
                }
                return res.redirect('http://localhost:3000/');
            });
        })
    })
})

module.exports = router;