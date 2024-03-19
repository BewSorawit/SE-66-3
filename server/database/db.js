// project/server/database/db.js
const mysql = require('mysql');
const { Sequelize } = require('sequelize');

// การเชื่อมต่อ MySQL ด้วย mysql library
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'se',
});

// การเชื่อมต่อฐานข้อมูล Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'se',
});

module.exports = { mysqlConnection, sequelize };
