// config/db.js
const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_employeesystem',
};

const db = mysql.createConnection(dbConfig);

module.exports = db;
