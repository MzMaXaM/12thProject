const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  database: 'blog-data',
  user: 'root',
  password: 'RootSQL8'
})

module.exports = pool