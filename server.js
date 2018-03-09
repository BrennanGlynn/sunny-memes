require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./routes/auth');
const upload = require('./routes/memes/upload');
const memeRouter = require('./routes/memes/memes');

const app = express();
const port = process.env.PORT || 3001;

//set up mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useMongoClient: true}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected")
  }
});

app.use(logger('dev'));
app.use(cookieParser('fortified secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({secret: 'fortified secret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json('application/json'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/auth', auth);
app.use('/memes', memeRouter);
app.use('/upload', upload);

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
  });
}


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
