var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

var login = require('./routes/login');
var users = require('./routes/users');
var superheroes = require('./routes/superheroes');
var superpowers = require('./routes/superpowers');

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

var config = require('./config/config.json');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    connection(mysql,{
        host: config.mysql_config.host,
        user: config.mysql_config.user,
        password : config.mysql_config.password,
        port : config.mysql_config.port,
        database: config.mysql_config.database
    },'request')
);

app.use(jwt({ secret: config.jwtSecret}).unless({path: ['/login']}));

app.use('/login', login);
app.use('/users', users);
app.use('/superheroes', superheroes);
app.use('/superpowers', superpowers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
