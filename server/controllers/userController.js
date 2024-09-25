// project/server/controllers/userController.js
const { caesarCipher } = require("../security/hashpassword");
const { User, Branch, TypeRole } = require("../models");
const bcrypt = require("bcrypt");

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
    // ส่งข้อมูลผู้ใช้กลับไปยัง client
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

const createUser = async (req, res) => {
  try {
    let {
      userID,
      firstName,
      surName,
      email,
      dateBirth,
      passwordUser,
      branchID,
      roleID,
    } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordUser, saltRounds);
    const Odd_shift = 23;
    const Even_shift = 7;
    const transformedPassword = caesarCipher(
      hashedPassword,
      Odd_shift,
      Even_shift
    );
    // console.log(transformedPassword);
    const newUser = await User.create({
      userID: userID,
      firstName: firstName,
      surName: surName,
      email: email,
      dateBirth: dateBirth,
      passwordUser: transformedPassword,
      branchID: branchID,
      roleID: roleID,
    });
    // ส่งคำตอบกลับไปยัง client
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
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
};
