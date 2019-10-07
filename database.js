let mysql = require('mysql');

//loome andmebaasi ühenduse
db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeblog'
  });
module.exports = db;