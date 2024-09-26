const {
  verifyRefreshToken,
  generateAccessToken,
} = require("../utils/tokenUtils");

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required." });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }

  const accessToken = generateAccessToken({ userId: decoded.userId });

  return res.status(200).json({
    accessToken,
  });
};

module.exports = { refreshAccessToken };
