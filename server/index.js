require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const port = process.env.PORT || 3000;
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_employeesystem',
};

// Database connection
const db = mysql.createConnection(dbConfig);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
