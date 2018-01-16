var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bootstrap', { title: 'Sunny', user: req.user });
});

module.exports = router;
