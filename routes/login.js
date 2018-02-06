const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook'), { authType: 'request', scope: ['public_profile', 'email']});

router.get('/facebook/return', passport.authenticate('facebook', {failureRedirect: '/auth'}),
    function (req, res) {
        res.redirect('/')
    });

router.get('/logout', function (req, res) {
    req.logout();
    console.log('Logged out');
    res.redirect('/');
})

module.exports = router;
