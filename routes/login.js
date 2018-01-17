const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');

passport.use(new FacebookStrategy({
    clientID: '316389025537007',
    clientSecret: '78bcf0c5451347fb5b637d1b2299fa0e',
    callbackURL: 'http://localhost:5000/auth/facebook/return',
    profileFields: ['id', 'displayName', 'emails']
}, function (accessToken, refreshToken, profile, done) {
    const me = new User({
        facebookId: profile.id,
        name: profile.displayName
    })

    User.findOne({facebookId: me.facebookId}, function (err, user) {
        if (!user) {
            me.save(function (err, me) {
                if (err) return done(null, me)
                done(null, me)
            });
        } else {
            done(null, user);
        }
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return', passport.authenticate('facebook', {failureRedirect: '/auth'}),
    function (req, res) {
        res.redirect('http://localhost:3000')
    });

router.get('/logout', function (req, res) {
    req.logout();
    console.log('Logged out');
    res.redirect('/');
})

module.exports = router;