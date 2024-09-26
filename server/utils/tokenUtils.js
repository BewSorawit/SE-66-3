const jwt = require("jsonwebtoken");
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });
};
const generateRefreshToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn });
};
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
