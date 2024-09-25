const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

// MySQL connection with mysql2 library
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "se",
});

mysqlConnection.connect((error) => {
  if (error) {
    console.error("MySQL connection error:", error);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Sequelize connection
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "se",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connected to MySQL database.");
  })
  .catch((error) => {
    console.error("Sequelize connection error:", error);
  });

module.exports = { mysqlConnection, sequelize };
