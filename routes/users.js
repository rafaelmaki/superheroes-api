var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('USERS');
});

/**
 * CREATE / UPDATE user
 */
router.post('/', function(req, res, next) {
   res.send('CREATE / UPDATE');
});

/**
 * UPDATE user
 */
router.put('/:id', function(req, res, next) {
   res.send('UPDATE');
});

/**
 * DELETE user
 */
router.delete('/:id', function(req, res, next) {
   res.send('DELETE');
});

module.exports = router;
