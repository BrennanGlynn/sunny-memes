const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config')

// Grab API routers
const auth = require('./api/auth/auth');
const memeRouter = require('./api/memes/index');
const commentRouter = require('./api/comments/index');

// Set up express app
const app = express();
const server = http.createServer(app)
const io = socketIO(server);
const port = process.env.PORT || 3001;

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('received news', function (data) {
    console.log(data.data);
  });
});

//set up mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {useMongoClient: true}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected")
  }
});

app.use(logger('dev'));
app.use(cookieParser('fortifiedsecret'));

let cookieExpirationDate = new Date()
const cookieExpirationDays = 365
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays)
app.use(require('cookie-session')({secret: 'fortifiedsecret', resave: true, saveUninitialized: true, cookie: {expires: cookieExpirationDate}}));

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

// Serve build files in production
if (process.env.NODE_ENV === 'production') {
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

server.listen(port, () => console.log(`Listening on port ${port}`));
