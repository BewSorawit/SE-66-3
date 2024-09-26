// project/server/controllers/loginController.js
const { User, TypeRole } = require("../models");
const { caesarCipher } = require("../security/hashpassword");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

const login = async (req, res) => {
  try {
    let { email, passwordUser } = req.body;

    if (!email || !passwordUser) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const Odd_shift = 23;
    const Even_shift = 7;

    passwordUser = caesarCipher(passwordUser, Odd_shift, Even_shift);

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
