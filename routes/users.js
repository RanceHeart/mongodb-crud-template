const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send({message: 'respond from user: ' + req.body.user});
});

module.exports = router;
