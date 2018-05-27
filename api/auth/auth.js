const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./user.model');
const config = require('../../config')

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackUrl,
  profileFields: ['id', 'displayName', 'emails', 'picture.type(large)']
}, function (accessToken, refreshToken, profile, done) {
  const me = new User({
    facebookId: profile.id,
    name: profile.displayName,
    picture: profile.photos ? `http://graph.facebook.com/${profile.id}/picture?type=normal` : '/img/faces/unknown-user-pic.jpg'
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
    res.json({id: req.user._id, name: req.user.name, picture: req.user.picture, admin: req.user.admin, loggedIn: true})
  } else {
    res.json({loggedIn: false})
  }
})

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return', passport.authenticate('facebook', {failureRedirect: '/auth'}),
  function (req, res) {
    let home = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'
    res.redirect(home)
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.json({loggedOut: true})
});

module.exports = router;
