//this is a copy of database js
//with hidden password.
//for future reference

const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  database: 'blog-data',
  user: 'root',
  password: '*'
})


module.exports = pool