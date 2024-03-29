// project/server/controllers/typetimeContorller.js
const { TypeTime } = require('../models');

const getTypeTimeById = async (req, res) => {
  try {
    const { id } = req.params; // รับ ID ที่ต้องการหาจาก req.params

    // หาข้อมูล type time ตาม ID ในฐานข้อมูล
    const typeTime = await TypeTime.findByPk(id);

    if (!typeTime) {
      return res.status(404).json({ error: 'Type time not found' });
    }

    // ส่งข้อมูล type time กลับไปยัง client
    res.status(200).json(typeTime);
  } catch (error) {
    console.error('Error getting type time by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller สำหรับดึงข้อมูล type times ทั้งหมด
const getAllTypeTimes = async (req, res) => {
  try {
    // ดึงข้อมูล type times ทั้งหมดจากฐานข้อมูล
    const typeTimes = await TypeTime.findAll();
    // ส่งข้อมูล type times กลับไปยัง client
    res.status(200).json(typeTimes);
  } catch (error) {
    console.error('Error getting type times:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller สำหรับเพิ่มข้อมูล type time ใหม่
const createTypeTime = async (req, res) => {
  try {
    const { timeID, timeStart, timeEnd } = req.body; // รับข้อมูลเวลาเริ่มต้นและสิ้นสุดจาก req.body

    // สร้าง type time ใหม่ในฐานข้อมูล
    const newTypeTime = await TypeTime.create({
      timeID: timeID,
      timeStart: timeStart,
      timeEnd: timeEnd
    });

    // ส่งคำตอบกลับไปยัง client
    res.status(201).json(newTypeTime);
  } catch (error) {
    console.error('Error creating type time:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkDuplicateTypeTime = async (req, res) => {
  const { id } = req.params;

  try {
    const existingTypeTime = await TypeTime.findOne({ where: { timeID: id } });
    if (existingTypeTime) {
      res.status(400).json({ error: 'Time ID already exists.' });
    } else {
      res.status(200).json({ message: 'Time ID is available.' });
    }
  } catch (error) {
    console.error('Error checking duplicate type time:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTypeTimeById = async (req, res) => {
  try {
    const { id } = req.params; // รับ ID ที่ต้องการลบจาก req.params

    // ลบข้อมูล type time ตาม ID ในฐานข้อมูล
    const deletedTypeTime = await TypeTime.destroy({ where: { timeID: id } });

    if (!deletedTypeTime) {
      return res.status(404).json({ error: 'Type time not found' });
    }

    // ส่งข้อมูล type time ที่ถูกลบกลับไปยัง client
    res.status(200).json({ message: 'Type time deleted successfully' });
  } catch (error) {
    console.error('Error deleting type time by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTypeTimes,
  createTypeTime,
  getTypeTimeById,
  checkDuplicateTypeTime,
  deleteTypeTimeById 
};
