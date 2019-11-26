var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedHdrs = 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept',
  allowedMthds = 'GET,PUT,POST,DELETE,OPTIONS',
  allowedOrgn = '*';

// Preflight Request handler (for CORS)
app.options("/*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${allowedOrgn}`);
  res.header('Access-Control-Allow-Methods', `${allowedMthds}`);
  res.header('Access-Control-Allow-Headers', `${allowedHdrs}`);
  res.sendStatus(200);
});

// CORS headers enabled for normal, in-flight browser requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${allowedOrgn}`);
  res.header('Access-Control-Allow-Methods', `${allowedMthds}`);
  res.header('Access-Control-Allow-Headers', `${allowedHdrs}`);
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

// Ignore favicon requests
app.use( (req, res, next) => {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
