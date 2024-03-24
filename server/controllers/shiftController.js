// project/server/controllers/shiftController.js
const { Shift, Schedule, TypeTime, Branch } = require('../models');

// Get all shifts
const getAllShifts = async (req, res) => {
    try {
        const shifts = await Shift.findAll();
        res.json(shifts);
    } catch (error) {
        console.error('Error getting shifts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new shift
const createShift = async (req, res) => {
    const { shiftID, scheduleID, timeID, branchID } = req.body;
    try {
        const shift = await Shift.create({ shiftID, scheduleID, timeID, branchID });
        res.status(201).json(shift);
    } catch (error) {
        console.error('Error creating shift:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createShiftWeb = async (req, res) => {
    const { shiftID, date, timeID, branchID } = req.body;
    if (!shiftID || !timeID || !branchID) {
        return res.status(400).json({ error: 'shiftID, timeID and branchID are required!' });
    }
    try {
        // ตรวจสอบว่ามี schedule ของวันที่ที่ต้องการหรือไม่
        let schedule = await Schedule.findOne({ where: { date } });

        // หากไม่มี schedule ในวันนั้น ให้สร้างข้อมูล schedule
        if (!schedule) {
            let newScheduleID;
            let lastSchedule = await Schedule.findOne({ order: [['scheduleID', 'DESC']] });

            if (lastSchedule) {
                const lastID = lastSchedule.scheduleID;
                const lastIDNumber = parseInt(lastID.substr(2)); // แยกตัวเลขออกมาจากไอดี
                const newIDNumber = lastIDNumber + 1;
                newScheduleID = `SC${newIDNumber.toString().padStart(2, '0')}`;
            } else {
                newScheduleID = 'SC01'; // ถ้าไม่มี schedule ในฐานข้อมูลเลย
            }

            // ตรวจสอบว่า newScheduleID ที่สร้างขึ้นมาใหม่ไม่ซ้ำกับที่มีอยู่แล้วในฐานข้อมูล
            while (await Schedule.findOne({ where: { scheduleID: newScheduleID } })) {
                const lastIDNumber = parseInt(newScheduleID.substr(2)); // แยกตัวเลขออกมาจากไอดี
                const newIDNumber = lastIDNumber + 1;
                newScheduleID = `SC${newIDNumber.toString().padStart(2, '0')}`;
            }

            // สร้าง schedule ใหม่
            schedule = await Schedule.create({ scheduleID: newScheduleID, date });
        }
        // ตรวจสอบว่ามีข้อมูลที่ส่งมาให้หรือไม่
       

        // สร้าง Shift โดยใช้ scheduleID จาก schedule ที่พบหรือสร้างขึ้นใหม่
        const shift = await Shift.create({ 
            shiftID: shiftID, 
            scheduleID: schedule.scheduleID, 
            timeID: timeID, 
            branchID: branchID
        });
        res.status(201).json(shift);
    } catch (error) {
        console.error('Error creating shift:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const checkDuplicateShift = async (req, res) => {
    const { id } = req.params;

    try {
        const existingShift = await Shift.findOne({ where: { shiftID: id } });
        if (existingShift) {
            res.status(400).json({ error: 'Shift ID already exists.' });
        } else {
            res.status(200).json({ message: 'Shift ID is available.' });
        }
    } catch (error) {
        console.error('Error checking duplicate Shift:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllShiftsForPage = async (req, res) => {
    try {
        const shifts = await Shift.findAll({
            include: [
                {
                    model: Schedule,
                    attributes: ['date']
                }, 
                {
                    model: TypeTime,
                    attributes: ['timeStart', 'timeEnd']
                },
                {
                    model: Branch,
                    attributes: ['branchName']
                }
            ]
        });
        res.json(shifts);
    } catch (error) {
        console.error('Error getting shifts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllShifts, createShift, createShiftWeb, checkDuplicateShift, getAllShiftsForPage };
