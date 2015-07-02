var express = require('express');
var router = express.Router();

router.post('/user', function (req, res, next) {
  var sda = req.body.textinput;
  console.log(sda);
  next();
});

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
