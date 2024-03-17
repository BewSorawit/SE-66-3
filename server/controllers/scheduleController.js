// project/server/controllers/scheduleController.js
const { Schedule } = require('../models');

// Controller สำหรับดึงข้อมูล schedules ทั้งหมด
const getAllSchedules = async (req, res) => {
    try {
        // ดึงข้อมูล schedules ทั้งหมดจากฐานข้อมูล
        const schedules = await Schedule.findAll();
        // ส่งข้อมูล schedules กลับไปยัง client
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error getting schedules:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller สำหรับเพิ่มข้อมูล schedule ใหม่
const createSchedule = async (req, res) => {
    try {
        const { scheduleID, date } = req.body; // รับข้อมูลวันที่จาก req.body

        // สร้าง schedule ใหม่ในฐานข้อมูล
        const newSchedule = await Schedule.create({
            scheduleID,
            date
        });

        // ส่งคำตอบกลับไปยัง client
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllSchedules,
    createSchedule
};