var express = require('express');
var router = express.Router();


/**
 * LIST superheroes
 */
router.get('/', function(req, res, next) {
    var sql_query = 'SELECT * FROM superhero';
    req.getConnection(
        function(err,connection) {
            connection.query(sql_query, function(err,data) {
                if(err) {
                    var message = "Error on superhero table query : " + err.message;
                    console.log(message);
                    res.status(500);
                    res.send(message);
                }

                res.send(data);
            });
    });
});

/**
 * GET superhero by name
 * @params {string} name - superhero name
 */
router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var sql_query = 'SELECT * FROM superhero WHERE name = ?';
    req.getConnection(function(err,connection) {
        connection.query(sql_query, [name], function(err,data) {
            if(err) {
                var message = "Error trying to find superhero " + name + ": " + err.message;
                console.log(message);
                res.status(500);
                res.send(message);
            } else if(data && data.length > 0) {
                res.send(data[0]);
            } else {
                var message = "Superhero " + name + " not found.";
                console.log(message);
                res.status(404);
                res.send(message);
            }
        });
    }); 
});

/**
 * CREATE / UPDATE superhero
 * @params {object} body - {name: name, alias: alias}
 */
router.post('/', function(req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var sql_query = 'INSERT INTO superhero set ? ';
    req.getConnection(function (err, connection) {
        var data = {
            name    : body.name,
            alias : body.alias
        };

        var query = connection.query(sql_query, data, function(err, result) {
            if (err) {
                var message = "Error inserting new superhero: " + err.message;
                console.log(message);
                res.status(500);
                res.send(message);
            }
            var messageOk = {
                message: "Created"
            }
            res.status(201);
            res.send(messageOk);
        });
    });
});

/**
 * UPDATE superhero
 * @params {string} name - superhero name
 * @params {object} body - {name: name, alias: alias}
 */
router.put('/:name', function(req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var name = req.params.name;
    var sql_query = 'UPDATE superhero set ? WHERE name = ?';
    
    req.getConnection(function (err, connection) {
        var data = {
            name    : body.name,
            alias   : body.alias 
        };
        
        connection.query(sql_query, [data,name], function(err, rows) {
            if (err) {
                var message = "Error updating superhero " + name + ": " + err.message;
                console.log(message);
                res.status(500);
                res.send(message);
            }
            var messageOk = {
                message: "OK"
            }
            res.send(messageOk);
        });
    
    });
});

/**
 * DELETE superhero
 * @params {string} name - superhero name
 */
router.delete('/:name', function(req, res, next) {
    var name = req.params.name;
    var sql_query = 'DELETE FROM superhero WHERE name = ?';
    
     req.getConnection(function (err, connection) {
        connection.query(sql_query , [name], function(err, rows) {
            if (err) {
                var message = "Error deleting superhero " + name + ": " + err.message;
                console.log(message);
                res.status(500);
                res.send(message);
            }
            var messageOk = {
                message: "OK"
            }
            res.send(messageOk);             
        });
        
     });
});

module.exports = router;
