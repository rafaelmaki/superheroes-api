var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var mysqlUtil = require('../lib/mysql');

var mysqlObj = new mysqlUtil();

const iterations = 10000;
const keylen = 512;
const digest = 'sha512'

/**
 * LIST users
 */
router.get('/', function (req, res, next) {
    var sql_query = 'SELECT * FROM user';

    mysqlObj.ExecuteQuery(req, sql_query, null, function (err, data) {
        if (err) {
            var message = "Error on user table query : " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.send(data);
        }
    });
});

/**
 * CREATE user
 * @params {object} body - {username: username, password: password}
 */
router.post('/', function (req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var sql_query = 'INSERT INTO user set ? ';

    var salt = crypto.randomBytes(128).toString('base64');
    var hash = crypto.pbkdf2Sync(body.password, salt, iterations, keylen, digest);

    var params = {
        username: body.username,
        password: hash.toString('hex'),
        salt: salt
    };

    mysqlObj.ExecuteQuery(req, sql_query, params, function (err, data) {
        if (err) {
            var message = "Error inserting new user: " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else {
            res.json({
                message: "Created"
            });
        }
    });
});

/**
 * UPDATE users
 * @params {string} username - username
 * @params {object} body - {username: username, password: password}
 */
router.put('/:username', function (req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));
    var username = req.params.username;
    var sql_query = 'UPDATE user set ? WHERE username = ?';

    var salt = crypto.randomBytes(128).toString('base64');
    var hash = pbkdf2Sync(body.password, salt, iterations, keylen, digest);

    var params = {
        username: body.username,
        password: hash,
        salt: salt
    };

    mysqlObj.ExecuteQuery(req, sql_query, params, function (err, data) {
        if (err) {
            var message = "Error updating user " + username + ": " + err.message;
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
 * DELETE users
 * @params {string} username - username
 */
router.delete('/:username', function (req, res, next) {
    var username = req.params.username;
    var sql_query = 'DELETE FROM user WHERE username = ?';

    mysqlObj.ExecuteQuery(req, sql_query, [username], function (err, data) {
        if (err) {
            var message = "Error deleting user " + username + ": " + err.message;
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
