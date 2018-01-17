const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const index = require('./routes/index');
const auth = require('./routes/auth');

const Meme = require('./models/meme.model');

const app = express();
const port = process.env.PORT || 3001;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//set up mongodb
mongoose.connect('mongodb://BrennanGlynn:o570tMuCzjttCMMI@cluster0-shard-00-00-g6c7z.mongodb.net:27017,cluster0-shard-00-01-g6c7z.mongodb.net:27017,cluster0-shard-00-02-g6c7z.mongodb.net:27017/sunny?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', { useMongoClient: true }, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("connected")
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('fortified secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({secret: 'fortified secret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({id: req.user.facebookId, name: req.user.name})
    } else {
        res.send({id: "", name: "", authenticated: false})
    }
})

app.use('/hello', (req, res) => {
    res.send({"express": "hello world"})
})

app.use('/upload', (req, res) => {
    if (!req.user) {
        return res.redirect('http://localhost:3000')
    }
    const form = new formidable.IncomingForm();
form.parse(req, function (err, fields, files) {
    const oldPath = files.file.path;
    const newPath = './public/images/memes/' + req.user.facebookId + files.file.name;
    fs.rename(oldPath, newPath, function (error) {
        if (error) throw error;
        console.log(req.user);
        const memeData = {
            url: '/images/memes/' + req.user.facebookId + files.file.name,
            uploaded_by: req.user.facebookId,
            characters: ['charlie']
        };
        Meme.create(memeData, function (err, meme) {
            if (err) {
                console.log(err);
                res.status = 501;
                return res.send('Error creating meme')
            }
            return res.redirect('http://localhost:3000/');
        });
    })
})
})


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
