var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send(JSON.stringify({ "success": true }));
});

module.exports = router;
