// project/server/controllers/userController.js
const { caesarCipher } = require("../security/hashpassword");
const { User, Branch, TypeRole } = require("../models");
const { sendOTP, verifyOTP } = require("../controllers/otpController");

const pendingUsers = {};
const createUser = async (req, res) => {
  try {
    const {
      userID,
      firstName,
      surName,
      email,
      dateBirth,
      passwordUser,
      branchID,
      roleID,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const oddShift = 23;
    const evenShift = 7;
    const transformedPassword = caesarCipher(passwordUser, oddShift, evenShift);

    pendingUsers[email] = {
      userID,
      firstName,
      surName,
      email,
      dateBirth,
      passwordUser: transformedPassword,
      branchID,
      roleID,
    };

    await sendOTP(email);
    return res.status(200).json({
      message: "OTP sent to email. Please verify to complete registration.",
    });
  } catch (error) {
    console.error("Error during OTP sending:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const confirmUserCreation = async (req, res) => {
  const { otp, email } = req.query;

  if (!otp || !email) {
    return res.status(400).json({ message: "OTP and email are required." });
  }

  const isVerified = verifyOTP(otp);
  if (!isVerified) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  const userData = pendingUsers[email];
  if (!userData) {
    return res.status(400).json({ message: "No pending registration found." });
  }

  try {
    const newUser = await User.create(userData);
    delete pendingUsers[email];

    return res.status(201).json({
      message: "User created successfully!",

      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
const getAllUsers = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll();
    // ส่งข้อมูลผู้ใช้กลับไปยัง client
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsersAndBranchAndRole = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll({
      include: [
        {
          model: Branch,
          attributes: ["branchID", "branchName"],
        },
        {
          model: TypeRole,
          attributes: ["roleID", "roleName"],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller สำหรับดึงข้อมูลผู้ใช้ ตามสาขาที่ตัวเองอยู่                  Cannot use    it error
const getUserBranch = async (req, res) => {
  try {
    const { branchID } = req.body;

    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll({
      where: {
        branchID: '"' + branchID + '"',
      },
    });
    if (users) {
      // console.log(req.body);
      // ส่งข้อมูลผู้ใช้กลับไปยัง client
      res.status(200).json(users);
    } else {
      return res.json("Fail");
    }
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params; // รับค่า ID ผู้ใช้จาก request params

    // ค้นหาข้อมูลผู้ใช้โดยใช้ ID
    const user = await User.findByPk(id);

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ส่งข้อมูลผู้ใช้กลับไปยัง client
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updated user ID:", id);

    const updatedUser = await User.update(req.body, {
      where: {
        userID: id,
      },
    });

    console.log("Update result:", updatedUser);

    if (updatedUser[0] !== 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res
        .status(404)
        .json({ message: "User not found or no changes were made" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        userID: id,
      },
    });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserBranch,
  getAllUsersAndBranchAndRole,
  getUserByID,
  updateUser,
  deleteUser,
  confirmUserCreation,
};
