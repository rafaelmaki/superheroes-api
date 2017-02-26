var express = require('express');
var router = express.Router();

/**
 * LIST superpowers
 */
router.get('/', function(req, res, next) {
    var sql_query = 'SELECT * FROM superpower';
    req.getConnection(
        function(err,connection) {
            connection.query(sql_query, function(err,data) {
                if(err) {
                    var message = "Error on superpower table query : " + err.message;
                    console.log(message);
                    res.status(500);
                    res.send(message);
                }

                res.send(data);
            });
    });
});

/**
 * GET superpower by name
 * @params {string} name - superpower name
 */
router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var sql_query = 'SELECT * FROM superpower WHERE name = ?';
    req.getConnection(function(err,connection) {
        connection.query(sql_query, [name], function(err,data) {
            if(err) {
                var message = "Error trying to find superpower " + name + ": " + err.message;
                console.log(message);
                res.status(500);
                res.send(message);
            } else if(data && data.length > 0) {
                res.send(data[0]);
            } else {
                var message = "Superpower " + name + " not found.";
                console.log(message);
                res.status(404);
                res.send(message);
            }
        });
    }); 
});

/**
 * CREATE / UPDATE superpower
 * @params {object} body - {name: name, description: description}
 */
router.post('/', function(req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var sql_query = 'INSERT INTO superpower set ? ';
    req.getConnection(function (err, connection) {
        var data = {
            name        : body.name,
            description : body.description
        };

        var query = connection.query(sql_query, data, function(err, result) {
            if (err) {
                var message = "Error inserting new superpower: " + err.message;
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
 * UPDATE superpower
 * @params {string} name - superpower name
 * @params {object} body - {name: name, description: description}
 */
router.put('/:name', function(req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var name = req.params.name;
    var sql_query = 'UPDATE superpower set ? WHERE name = ?';
    
    req.getConnection(function (err, connection) {
        var data = {
            name        : body.name,
            description   : body.description 
        };
        
        connection.query(sql_query, [data,name], function(err, rows) {
            if (err) {
                var message = "Error updating superpower " + name + ": " + err.message;
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
 * DELETE superpower
 * @params {string} name - superpower name
 */
router.delete('/:name', function(req, res, next) {
    var name = req.params.name;
    var sql_query = 'DELETE FROM superpower WHERE name = ?';
    
     req.getConnection(function (err, connection) {
        connection.query(sql_query , [name], function(err, rows) {
            if (err) {
                var message = "Error deleting superpower " + name + ": " + err.message;
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
