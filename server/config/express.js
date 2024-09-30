// project/server/config/express.js
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const rateLimiter = require("../Middlewares/rateLimiter"); // Import your rate limiter

const app = express();

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "root",
    cookie: { maxAge: null },
    saveUninitialized: false,
    resave: false,
  })
);

module.exports = app;
