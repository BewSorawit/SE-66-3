// project/server/controllers/typeroleController.js
const { TypeRole } = require('../models');

// Controller สำหรับดึงข้อมูลบทบาททั้งหมด
const getAllRoles = async (req, res) => {
    try {
        // ดึงข้อมูลบทบาททั้งหมดจากฐานข้อมูล
        const roles = await TypeRole.findAll();
        // ส่งข้อมูลบทบาทกลับไปยัง client
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error getting roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller สำหรับเพิ่มข้อมูลบทบาทใหม่
const createRole = async (req, res) => {
    try {
        const { roleID, roleName } = req.body; // รับข้อมูลบทบาทจาก req.body

        // สร้างบทบาทใหม่ในฐานข้อมูล
        const newRole = await TypeRole.create({
            roleID,
            roleName
        });

        // ส่งคำตอบกลับไปยัง client
        res.status(201).json(newRole);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllRoles,
    createRole
};
