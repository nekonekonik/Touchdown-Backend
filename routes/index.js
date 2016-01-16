var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.type('text/plain'); // set content-type
  res.send('i am a beautiful butterfly'); // send text response
});

module.exports = router;
