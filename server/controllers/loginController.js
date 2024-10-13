// project/server/controllers/loginController.js
const { User, TypeRole } = require("../models");
const { passwordHashing } = require("../security/hashpassword");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

const Redis = require("ioredis");
const redis = new Redis();

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60;

const login = async (req, res) => {
  try {
    let { email, passwordUser } = req.body;

    if (!email || !passwordUser) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const attemptsKey = `loginAttempts:${email}`;
    const lockoutKey = `lockout:${email}`;

    const isLocked = await redis.get(lockoutKey);
    if (isLocked) {
      return res.status(429).json({
        message: "Too many failed login attempts. Please try again later.",
      });
    }

    passwordUser = passwordHashing(passwordUser);

    const user = await User.findOne({
      where: {
        email: email,
        passwordUser: passwordUser,
      },
      include: {
        model: TypeRole,
        attributes: ["roleName"],
      },
    });

    if (user) {
      await redis.del(attemptsKey);
      await redis.del(lockoutKey);

      const accessToken = generateAccessToken({ userId: user.userID });
      const refreshToken = generateRefreshToken({ userId: user.userID });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      return res.status(200).json({
        message: "Login successful!",
        user: {
          userID: user.userID,
          firstName: user.firstName,
          surName: user.surName,
          email: user.email,
          dateBirth: user.dateBirth,
          branchID: user.branchID,
          roleID: user.roleID,
          typerole: {
            roleName: user.typerole.dataValues.roleName,
          },
        },
        accessToken,
        refreshToken,
      });
    } else {
      const attempts = await redis.incr(attemptsKey);
      if (attempts === 1) {
        await redis.expire(attemptsKey, LOCK_TIME);
      }

      if (attempts >= MAX_FAILED_ATTEMPTS) {
        await redis.set(lockoutKey, "locked", "EX", LOCK_TIME);
        return res.status(429).json({
          message: "Too many failed login attempts. Please try again later.",
        });
      }

      return res
        .status(401)
        .json({ message: "Login failed. Invalid email or password." });
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    req.session = null;

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, logout };
