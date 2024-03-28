// project/server/config/express.js
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(session({
    secret: "root",
    cookie: {maxAge: null},
    saveUninitialized: false,
}));

module.exports = app;
