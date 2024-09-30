// project/server/middleware/rateLimiter.js
const rateLimit = require("express-rate-limit");

// Set up rate limiting middleware
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.", // Message to send when limit is reached
});

// Export the rate limiter middleware
module.exports = rateLimiter;
