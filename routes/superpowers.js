var express = require('express');
var router = express.Router();

var mysqlUtil = require('../lib/mysql');

var mysqlObj = new mysqlUtil();

/**
 * LIST superpowers
 */
router.get('/', function(req, res, next) {
    var sql_query = 'SELECT * FROM superpower';

    mysqlObj.ExecuteQuery(req, sql_query, null, function(err,data) {
        if(err) {
            var message = "Error on superpower table query : " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.send(data);
        }
    });
});

/**
 * GET superpower by name
 * @params {string} name - superpower name
 */
router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var sql_query = 'SELECT * FROM superpower WHERE name = ?';

    mysqlObj.ExecuteQuery(req, sql_query, [name], function(err,data) {
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

/**
 * CREATE superpower
 * @params {object} body - {name: name, description: description}
 */
router.post('/', function(req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var sql_query = 'INSERT INTO superpower set ? ';

    var data = {
        name        : body.name,
        description : body.description
    };

    mysqlObj.ExecuteQuery(req, sql_query, data, function(err,data) {
        if (err) {
            var message = "Error inserting new superpower: " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.status(201);
            res.json({
                message: "Created"
            });
        }
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

    var data = {
        name        : body.name,
        description   : body.description 
    };

    mysqlObj.ExecuteQuery(req, sql_query, data, function(err,data) {
        if (err) {
            var message = "Error updating superpower " + name + ": " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.json({
                message: "OK"
            });
        }
    });
});

/**
 * DELETE superpower
 * @params {string} name - superpower name
 */
router.delete('/:name', function(req, res, next) {
    var name = req.params.name;
    var sql_query = 'DELETE FROM superpower WHERE name = ?';

    mysqlObj.ExecuteQuery(req, sql_query, [name], function(err,data) {
        if (err) {
            var message = "Error deleting superpower " + name + ": " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.json({
                message: "OK"
            });
        }
    });
});

module.exports = router;
