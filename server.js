const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Grab API routers
const auth = require('./api/auth/auth');
const memeRouter = require('./api/memes/index');
const commentRouter = require('./api/comments/index')

// Set up express app
const app = express();
const port = process.env.PORT || 3001;

//set up mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://BrennanGlynn:o570tMuCzjttCMMI@cluster0-shard-00-00-g6c7z.mongodb.net:27017,cluster0-shard-00-01-g6c7z.mongodb.net:27017,cluster0-shard-00-02-g6c7z.mongodb.net:27017/sunny?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {useMongoClient: true}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected")
  }
});

app.use(logger('dev'));
app.use(cookieParser('fortified secret'));
app.use(require('express-session')({secret: 'fortified secret', resave: true, saveUninitialized: true}));

// serve static images
app.use(express.static(path.join(__dirname, 'public')));

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// allows us to read post requests body data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json('application/json'));

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/auth', auth);
app.use('/memes', memeRouter);
app.use('/comments', commentRouter);

// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, './client/build/index.html'));
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

app.listen(port, () => console.log(`Listening on port ${port}`));
