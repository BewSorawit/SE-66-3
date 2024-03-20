// project/server/controllers/shiftController.js
const { Shift } = require('../models');

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

module.exports = { getAllShifts, createShift };
