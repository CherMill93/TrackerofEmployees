const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'sh3rb3rtl3mon1', //user password here
  database: 'employee'
});

module.exports = db;