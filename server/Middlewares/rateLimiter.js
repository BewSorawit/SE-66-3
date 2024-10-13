const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1000,
  max: 10,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = rateLimiter;
