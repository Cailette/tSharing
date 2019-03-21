var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Authentication Packages
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);

var startRouter = require('./routes/start');
var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');
var createRouter = require('./routes/create');
var sharingRouter = require('./routes/sharing');

var app = express();
require('dotenv').config();

// view engine setup
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'gssegsegsegseg',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  USER_ID : 'user_id'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', startRouter);
app.use('/start', startRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/create', createRouter);
app.use('/sharing', sharingRouter);

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

module.exports = app;
