// project/server/controllers/absenceController.js
const { Absence } = require('../models');

// ดึงข้อมูล Absence ทั้งหมด
const getAllAbsences = async (req, res) => {
    try {
        const absences = await Absence.findAll();
        res.json(absences);
    } catch (error) {
        console.error('Error getting absences:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// สร้าง Absence ใหม่
const createAbsence = async (req, res) => {
    try {
        const { absenceID, absenceType, status, userIDsend, userIDchange } = req.body;
        const newAbsence = await Absence.create({
            absenceID,
            absenceType,
            status,
            userIDsend,
            userIDchange
        });
        res.status(201).json(newAbsence);
    } catch (error) {
        console.error('Error creating absence:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllAbsences,
    createAbsence
};
