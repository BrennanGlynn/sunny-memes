const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');

passport.use(new FacebookStrategy({
    clientID: '316389025537007',
    clientSecret: '78bcf0c5451347fb5b637d1b2299fa0e',
    callbackURL: 'http://localhost:3001/auth/facebook/return',
    profileFields: ['id', 'displayName', 'emails', 'picture.type(large)']
}, function (accessToken, refreshToken, profile, done) {
    const me = new User({
        facebookId: profile.id,
        name: profile.displayName,
        picture: profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'
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

router.use('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({id: req.user.facebookId, name: req.user.name, picture: req.user.picture})
    } else {
        res.send({id: "", name: "", picture: 'http://localhost:3001/images/user-icon.png'})
    }
})

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return', passport.authenticate('facebook', {failureRedirect: '/auth'}),
    function (req, res) {
        res.redirect('http://localhost:3000')
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.json({loggedOut: true})
});

module.exports = router;
