const express = require('express');
const Meme = require('../models/meme.model');

const router = express.Router();

router.use('/', (req, res) => {
    const page = req.query.page;
    const memesPerPage = 30;
    let query = {};

    Meme.find({}, null, { skip: page * memesPerPage, limit: memesPerPage }, function (err, docs) {
        if (!err) {
            console.log(docs);
            res.json({documents: docs})
        }
    });
})

module.exports = router;