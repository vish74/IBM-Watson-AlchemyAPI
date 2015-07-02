var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  });



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('IBM app Running at http://%s:%s', host, port);
  console.log('To view the example, point your favorite browser to: localhost:3000');

});

module.exports = app;
