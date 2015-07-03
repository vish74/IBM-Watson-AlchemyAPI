var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/');

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

function restrict(req, res, next) {
  if (req.body.textinput == "hello") {
    //console.log("asdad");
    next();
  } else {
    res.redirect('/');
  }
}

app.get('/', routes.index);

app.post('/user',restrict, routes.user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {message: err.message,error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {message: err.message,error: {}
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('IBM app Running at http://%s:%s', host, port);
  console.log('To view the example, point your favorite browser to: localhost:3000');

});

module.exports = app;
