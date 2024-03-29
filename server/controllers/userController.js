// project/server/controllers/userController.js
const { User } = require('../models');

// Controller สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
const getAllUsers = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll();
    // ส่งข้อมูลผู้ใช้กลับไปยัง client
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller สำหรับเพิ่มข้อมูลผู้ใช้ใหม่
const createUser = async (req, res) => {
  try {
    const { userID, firstName, surName, email, dateBirth, passwordUser, branchID, roleID } = req.body; // รับข้อมูลผู้ใช้จาก req.body

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await User.create({
      userID: userID,
      firstName: firstName,
      surName: surName,
      email: email,
      dateBirth: dateBirth,
      passwordUser: passwordUser,
      branchID: branchID,
      roleID: roleID
    });

    // ส่งคำตอบกลับไปยัง client
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params; // รับค่า ID ผู้ใช้จาก request params

    // ค้นหาข้อมูลผู้ใช้โดยใช้ ID
    const user = await User.findByPk(id);

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ส่งข้อมูลผู้ใช้กลับไปยัง client
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByID
};
