// project/server/controllers/loginController.js
const { User, TypeRole } = require("../models");
const { caesarCipher } = require("../security/hashpassword");

const login = async (req, res) => {
  try {
    let { email, passwordUser } = req.body;
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
      req.session.user = user;
      return res.status(200).json(user);
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

module.exports = { login };
