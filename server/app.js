var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var authRouter = require('./routes/auth');
var bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var fs = require('fs');


// Database configuration
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/forum'
mongoose.Promise = global.Promise;

// Connecting database
mongoose.connect(url)
  .then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log(err);
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });

var app = express();

const passport = require('passport');
require('./routes/passport');
//app.use(require('./routes/passport'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Enabling view cache for faster performance
app.enable('view cache');

// Enabling case sensitive routing
app.enable('case sensitive routing');

// Enabling strict routing
app.enable('strict routing');

// Enable trust proxy
app.enable('trust proxy');

// Disabling x-powered-by
app.disable('x-powered-by');

//using cors to accept cross domain XHR requests 
app.use(cors());


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(logger('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', passport.authenticate('jwt', { session: false }), authRouter);
//app.use('/auth', authRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
app.listen('8080', 'localhost');
