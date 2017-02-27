var express = require('express');
var router = express.Router();
var _ = require('lodash');

var mysqlUtil = require('../lib/mysql');

var mysqlObj = new mysqlUtil();

/**
 * LIST superheroes
 */
router.get('/', function (req, res, next) {
    var sql_query = 'SELECT * FROM superhero';

    mysqlObj.ExecuteQuery(req, sql_query, null, function (err, data) {
        if (err) {
            var message = "Error on superhero table query : " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.send(data);
        }
    });
});

/**
 * GET superhero by name
 * @params {string} name - superhero name
 */
router.get('/:name', function (req, res, next) {
    var name = req.params.name;
    var sql_query = 'SELECT * FROM superhero WHERE name = ?';

    mysqlObj.ExecuteQuery(req, sql_query, [name], function (err, data) {
        if (err) {
            var message = "Error trying to find superhero " + name + ": " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else if (data && data.length > 0) {
            res.send(data[0]);
        } else {
            var message = "Superhero " + name + " not found.";
            console.log(message);
            res.status(404);
            res.send(message);
        }
    });
});

/**
 * CREATE superhero
 * @params {object} body - {name: name, alias: alias, superpowers: [superpowers]}
 */
router.post('/', function (req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var sql_query = 'INSERT INTO superhero set ? ';

    var err_mesages = [];

    if (body.superpowers) {
        var superpowers = body.superpowers;

        var query_superpowers = 'SELECT * FROM superpower WHERE name = ?';

        _.each(superpowers, function (item) {
            mysqlObj.ExecuteQuery(req, query_superpowers, [item], function (err, data) {
                if (err) {
                    var message = "Error getting superpower " + item + ": " + err.message;
                    console.log(message);
                    err_mesages.push(message);
                }
            });
        });
    }

    if (err_mesages.length > 0) {
        res.status(500);
        res.send(err_mesages);
    } else {
        var data = {
            name: body.name,
            alias: body.alias
        };

        mysqlObj.ExecuteQuery(req, sql_query, data, function (err, data) {
            if (err) {
                var message = "Error inserting new superhero: " + err.message;
                console.log(message);
                res.status(500);
                res.send(message);
            } else {
                var superpowers = body.superpowers;

                var query_superpowers = 'INSERT INTO superhero_superpower set ? ';

                _.each(superpowers, function (item) {
                    var data_value = {
                        superhero_name: body.name,
                        superpower_name: item
                    };
                    mysqlObj.ExecuteQuery(req, query_superpowers, data_value, function (err, data) {
                        if (err) {
                            var message = "Error inserting superpower for superhero: " + err.message;
                            console.log(message);
                            err_mesages.push(message);
                        }
                    });
                });

                if (err_mesages.length > 0) {
                    res.status(500);
                    res.send(err_mesages);
                } else {
                    res.status(201);
                    res.json({
                        message: "Created"
                    });
                }
            }
        });
    }
});

/**
 * UPDATE superhero
 * @params {string} name - superhero name
 * @params {object} body - {name: name, alias: alias, superpowers: [superpowers]}
 */
router.put('/:name', function (req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var name = req.params.name;
    var sql_query = 'UPDATE superhero set ? WHERE name = ?';

    req.getConnection(function (err, connection) {
        var data = {
            name: body.name,
            alias: body.alias
        };

        connection.query(sql_query, [data, name], function (err, rows) {
            if (err) {
                var message = "Error updating superhero " + name + ": " + err.message;
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
});

/**
 * DELETE superhero
 * @params {string} name - superhero name
 */
router.delete('/:name', function (req, res, next) {
    var name = req.params.name;
    var sql_query = 'DELETE FROM superhero WHERE name = ?';

    req.getConnection(function (err, connection) {
        connection.query(sql_query, [name], function (err, rows) {
            if (err) {
                var message = "Error deleting superhero " + name + ": " + err.message;
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
});

module.exports = router;
