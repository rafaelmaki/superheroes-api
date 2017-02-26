var express = require('express');
var router = express.Router();


/**
 * LIST superheroes
 */
router.get('/', function(req, res, next) {
   res.send('LIST');
});

/**
 * GET superhero by ID
 */
router.get('/:id', function(req, res, next) {
   res.send('GET');
});

/**
 * CREATE / UPDATE superhero
 */
router.post('/', function(req, res, next) {
   res.send('CREATE / UPDATE');
});

/**
 * UPDATE superhero
 */
router.put('/:id', function(req, res, next) {
   res.send('UPDATE');
});

/**
 * DELETE superhero
 */
router.delete('/:id', function(req, res, next) {
   res.send('DELETE');
});

module.exports = router;
