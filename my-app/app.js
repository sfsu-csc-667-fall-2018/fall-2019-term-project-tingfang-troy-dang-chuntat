if(process.env.NODE_ENV === 'development') {
	require("dotenv").config();
}


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var logger = require('morgan');
const bcrypt = require('bcrypt')
var bodyParser = require('body-parser');
// var passportConfig = require('./config/passport')
// const initializePassport = require("./config/passport");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testsRouter = require('./routes/tests');
var lobbyRouter = require('./routes/lobby');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');
var gamesRouter = require('./routes/games');
var apiRouter = require('./routes/api/games');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(require('body-parser').urlencoded({ extended: true }));
const initializePassport = require("./config/passport");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));


app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use(bodyParser());
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
app.use('/lobby', lobbyRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/games', gamesRouter);
app.use('/api/games', apiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;
