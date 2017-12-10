var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var create = require('./routes/create');
var view = require('./routes/view');
var images = require('./routes/images');
var search = require('./routes/search');
var results = require('./routes/results');
var login = require('./routes/login');

var userDb = require('./data/users.js');

var FACEBOOK_APP_ID = '1514772795286498';
var FACEBOOK_APP_SECRET = 'cf0f074ea3e1a76939f5ca24792dcee9';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    userDb.findOrCreate(profile, function(err, user) {
      if (err) {
        return done(err);
      } else {
        done(null, user);
      }
    });
  })
);

var handleError = require('./middlewares/handleError.js');
var loginCheck = require('./middlewares/loginCheck.js');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(loginCheck);

app.use('/', index);
// app.use('/users', users);
app.use('/create', create);
app.use('/view', view);
app.use('/login', login);
app.get('/auth/facebook', passport.authenticate('facebook'));
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.use('/images', images);
app.use('/search', search);
app.use('/results', results);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(handleError);

module.exports = app;
