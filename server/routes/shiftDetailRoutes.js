// project/server/routes/shiftDetailRoutes.js
const express = require('express');
const router = express.Router();
const { getAllShiftDetails, createShiftDetail, getShowShiftDetail, createShiftDetailWeb, deleteShiftDetailByID } = require('../controllers/shiftDetailController');

// GET all shift details
router.get('/shiftdetails/all', getAllShiftDetails);

router.get('/shiftdetails/showShiftDetail', getShowShiftDetail);

router.post('/shiftdetails/createWeb', createShiftDetailWeb);

// POST a new shift detail
router.post('/shiftdetails/create', createShiftDetail);

router.delete('/shiftdetails/delete/:id', deleteShiftDetailByID);

module.exports = router;
