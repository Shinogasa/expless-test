var express = require("express");
var router = express.Router();
var moment = require("moment");
var connection = require("../mysqlConnection");

router.get('/', function(req, res, next) {
    res.render('register', {
        title: '新規登録'
    });
});

router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var createAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")';
    conection.query(query, function(err, rows) {
        res.redirect('/login');
    });
});

module.exports = router;