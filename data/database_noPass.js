const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  database: 'blog-data',
  user: 'root',
  password: '*'
})


module.exports = pool