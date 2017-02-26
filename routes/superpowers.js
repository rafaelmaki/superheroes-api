var express = require('express');
var router = express.Router();


/**
 * LIST superpowers
 */
router.get('/', function(req, res, next) {
   res.send('LIST');
});

/**
 * GET superpower by ID
 */
router.get('/:id', function(req, res, next) {
   res.send('GET');
});

/**
 * CREATE / UPDATE superpower
 */
router.post('/', function(req, res, next) {
   res.send('CREATE / UPDATE');
});

/**
 * UPDATE superpower
 */
router.put('/:id', function(req, res, next) {
   res.send('UPDATE');
});

/**
 * DELETE superpower
 */
router.delete('/:id', function(req, res, next) {
   res.send('DELETE');
});

module.exports = router;
