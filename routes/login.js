var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');

var mysqlUtil = require('../lib/mysql');

var mysqlObj = new mysqlUtil();

const iterations = 10000;
const keylen = 512;
const digest = 'sha512'

/**
 * Login user
 * @params {object} body - {username: username, password: password}
 */
router.post('/', function(req, res, next) {
    var body = JSON.parse(JSON.stringify(req.body));

    var username = body.username;
    var sql_query = 'SELECT * FROM user WHERE username = ?';

    mysqlObj.ExecuteQuery(req, sql_query, [username], function(err,data) {
        if(err) {
            var message = "Error trying to find user " + username + ": " + err.message;
            console.log(message);
            res.status(500);
            res.send(message);
        } else if(data && data.length > 0) {
            var hash = crypto.pbkdf2Sync(body.password, data[0].salt, iterations, keylen, digest);
            if(hash.toString('hex') === data[0].password) {
                var sql_query_roles = 'SELECT role FROM user_role WHERE username = ?';
                mysqlObj.ExecuteQuery(req, sql_query, [username], function(err,roles) {
                    if(err) {
                        var message = "Error trying to get user roles: " + err.message;
                        console.log(message);
                        res.status(500);
                        res.send(message);
                    } else {
                        var jwtData = {
                            username: data[0].username
                        };
                        if(roles) {
                            jwtData.roles = roles;
                        }
                        var token = jwt.sign(data[0], config.jwtSecret, {
                            expiresIn: 600
                        });
                        res.json({
                            success: true,
                            message: 'Login successful',
                            token: token
                        });
                    }
                });
            }
        } else {
            var message = "User " + username + " not found.";
            console.log(message);
            res.status(404);
            res.send(message);
        }
    });
});

module.exports = router;