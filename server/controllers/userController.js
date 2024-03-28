// project/server/controllers/userController.js
const { where } = require('sequelize');
const { User, Branch,TypeRole } = require('../models');
const { param } = require('../routes/userRoutes');

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

const getAllUsersAndBranchAndRole = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll({
      include: [
        {
          model: Branch,
          attributes: ['branchID', 'branchName']
        },
        {
          model: TypeRole,
          attributes: ['roleID', 'roleName']
        }
      ]
    });
    // ส่งข้อมูลผู้ใช้กลับไปยัง client
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller สำหรับดึงข้อมูลผู้ใช้ ตามสาขาที่ตัวเองอยู่                  Cannot use    it error
const getUserBranch = async (req, res) => {
  try {
    const { branchID } = req.body;

    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll({
      where: {
        branchID: "\"" + branchID  + "\""
      }
    });
    if (users) {
      // console.log(req.body);
      // ส่งข้อมูลผู้ใช้กลับไปยัง client
      res.status(200).json(users);
    } else {
      return res.json("Fail");
    }
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        userID: id
      }
    });
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
      const { id } = req.params;
      console.log('Requested user ID:', id);

      const user = await User.findOne({
          where: {
              userID: id
          },
      });

      console.log('Retrieved user:', user);

      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


// อัปเดตข้อมูลผู้ใช้
const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      console.log('Updated user ID:', id);

      const updatedUser = await User.update(req.body, {
          where: {
              userID: id
          }
      });

      console.log('Update result:', updatedUser);

      if (updatedUser[0] !== 0) {
          res.status(200).json({ message: 'User updated successfully' });
      } else {
          res.status(404).json({ message: 'User not found or no changes were made' });
      }
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllUsers,
  createUser,
  getUserBranch,
  getAllUsersAndBranchAndRole,
  deleteUser,
  getUserById,
  updateUser

};
