var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3000/');
});

module.exports = router;
