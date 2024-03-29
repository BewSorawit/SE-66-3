// project/server/controllers/shiftDetailController.js
const { ShiftDetail, User, TypeTime, Schedule, Shift ,Absence} = require('../models');


// ดึงข้อมูล ShiftDetail ทั้งหมด
const getAllShiftDetails = async (req, res) => {
    try {
        const shiftDetails = await ShiftDetail.findAll();
        res.json(shiftDetails);
    } catch (error) {
        console.error('Error fetching shift details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all shift details with associated data
const getShowShift = async (req, res) => {
    try {
        const shiftDetails = await ShiftDetail.findAll({
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'branchID'] // Include the firstName from the User table
                },
                {
                    model: Shift,
                    include: [
                        {
                            model: Schedule,
                            attributes: ['date'] // Include the date from the Schedule table
                        },
                        {
                            model: TypeTime,
                            attributes: ['timeStart', 'timeEnd'] // Include the timeStart and timeEnd from the TypeTime table
                        }
                    ]
                }
            ]
        });
        res.json(shiftDetails);

    } catch (error) {
        console.error('Error fetching shift details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all shift details with associated data
const getShowShiftDetail = async (req, res) => {
    try {
        const shiftDetails = await ShiftDetail.findAll({
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'surName', 'branchID'] // Include the firstName from the User table
                },
                {
                    model: Absence,
                    attributes: ['absenceType', 'status', 'userIDsend', 'userIDchange']
                },
                {
                    model: Shift,
                    include: [
                        {
                            model: Schedule,
                            attributes: ['date'] // Include the date from the Schedule table
                        },
                        {
                            model: TypeTime,
                            attributes: ['timeStart', 'timeEnd'] // Include the timeStart and timeEnd from the TypeTime table
                        }
                    ]
                }
            ]
        });
        res.json(shiftDetails);

    } catch (error) {
        console.error('Error fetching shift details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// สร้าง ShiftDetail ใหม่
const createShiftDetail = async (req, res) => {
    const { shiftDetailID, shiftID, userID, status, statusCL, absenceID } = req.body;
    try {
        // ดึงข้อมูล shift จาก shiftID
        const shift = await Shift.findByPk(shiftID);

        // ดึงข้อมูลผู้ใช้ (User) จาก userID
        const user = await User.findByPk(userID);

        // ตรวจสอบว่า shift และ user มีค่าหรือไม่
        if (!shift || !user) {
            return res.status(400).json({ error: 'Shift or user not found' });
        }

        // ตรวจสอบว่า branchID ของ shift เท่ากับ branchID ของ user หรือไม่
        if (shift.branchID !== user.branchID) {
            return res.status(400).json({ error: 'Unauthorized access to shift' });
        }

        // สร้าง shift detail
        const shiftDetail = await ShiftDetail.create({ shiftDetailID, shiftID, userID, status, statusCL, absenceID });
        res.status(201).json(shiftDetail);
    } catch (error) {
        console.error('Error creating shift detail:', error);
        res.status(400).json({ error: 'Unable to create shift detail' });
    }
};

const createShiftDetailWeb = async (req, res) => {
    const { shiftID, userID, status, statusCL } = req.body;
    if (!shiftID || !userID || !status || !statusCL) {
        return res.status(400).json({ error: 'shiftID, userID, status and statusCL are required!' });
    }
    try {
        let newShiftDetailID;
        let lastShiftDetail = await ShiftDetail.findOne({ order: [['shiftDetailID', 'DESC']] });

        if (lastShiftDetail) {
            const lastID = lastShiftDetail.shiftDetailID;
            const lastIDNumber = parseInt(lastID.substr(2));
            const newIDNumber = lastIDNumber + 1;
            newShiftDetailID = `SD${newIDNumber.toString().padStart(2, '0')}`;
        } else {
            newScheduleID = 'SD01';
        }

        const shiftDetail = await ShiftDetail.create({
            shiftDetailID: newShiftDetailID,
            shiftID: shiftID,
            userID: userID,
            status: status,
            statusCL: statusCL,
            absenceID: null
        });
        res.status(201).json(shiftDetail);
    } catch (error) {
        console.error('Error creating shift:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteShiftDetailByID = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShift = await ShiftDetail.destroy({ where: { shiftDetailID: id } });
        if (deletedShift) {
            res.status(200).json({ message: 'Shift Detail deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Shift Detail not found.' });
        }
    } catch (error) {
        console.error('Error deleting shift:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {getAllShiftDetails, createShiftDetail, getShowShift, getShowShiftDetail, createShiftDetailWeb, deleteShiftDetailByID };
