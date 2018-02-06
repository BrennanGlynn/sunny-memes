const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
});

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
