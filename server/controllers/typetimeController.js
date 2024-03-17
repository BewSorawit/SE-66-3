// project/server/controllers/typetimeContorller.js
const { TypeTime } = require('../models');

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
      timeID,
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

module.exports = {
  getAllTypeTimes,
  createTypeTime
};
