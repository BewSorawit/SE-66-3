// project/server/routes/shiftDetailRoutes.js
const express = require('express');
const router = express.Router();
const { getAllShiftDetails, createShiftDetail, getShowShift } = require('../controllers/shiftDetailController');

// GET all shift details
router.get('/shiftdetails/all', getAllShiftDetails);

router.get('/shiftdetails/showShift', getShowShift);

// POST a new shift detail
router.post('/shiftdetails/create', createShiftDetail);



module.exports = router;
