var Promise = require('promise');

var MySql = function() {
    var self = this;
};


/**
 * Execute query on MySql Database
 * 
 * @param {object} req - request object
 * @param {string} sql_query - query
 * @param {object} parameters - parameters for SQL query
 * @param {function} callback - callback function
 */
MySql.prototype.ExecuteQuery = function(req, sql_query, parameters, callback) {
    req.getConnection(function (err, connection) {
        connection.query(sql_query , parameters, function(err, data) {
            if (err) {
                callback(err);
            }
            callback(null, data);           
        });
     });
};

MySql.prototype.PromiseExecuteQuery = function(req, sql_query, parameters) {
    return new Promise((resolve, reject) => {
        req.getConnection(function (err, connection) {
        connection.query(sql_query , parameters, function(err, data) {
            if (err) {
                return reject (err);
            }
            resolve(data);
        });
     });
    })
    
};

module.exports = MySql;