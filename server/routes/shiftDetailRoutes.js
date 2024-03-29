// project/server/routes/shiftDetailRoutes.js
const express = require('express');
const router = express.Router();
const { getAllShiftDetails, getShowShiftDetail, createShiftDetail, getShowShift, deleteShiftDetailByID, createShiftDetailWeb } = require('../controllers/shiftDetailController');

// GET all shift details
router.get('/shiftdetails/all', getAllShiftDetails);

router.get('/shiftdetails/showShift', getShowShift);

// POST a new shift detail
router.post('/shiftdetails/create', createShiftDetail);

router.get('/shiftdetails/showShiftDetail', getShowShiftDetail);

router.post('/shiftdetails/createWeb', createShiftDetailWeb);

router.delete('/shiftdetails/delete/:id', deleteShiftDetailByID);
module.exports = router;
