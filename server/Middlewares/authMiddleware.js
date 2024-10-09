const { verifyAccessToken } = require("../utils/tokenUtils");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required." });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res
      .status(403)
      .json({ message: "Invalid or expired access token." });
  }
};

module.exports = authMiddleware;
