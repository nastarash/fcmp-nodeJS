var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const winston = require('./routes/logger');
const passport = require('./model/authStrategy');

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');

var app = express();

app.use(passport.initialize());
app.get('/',
  passport.authenticate('local'),
  function (req, res) {
    res.redirect('/index')
  }
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined', {
  stream: winston.stream
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/news', newsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;