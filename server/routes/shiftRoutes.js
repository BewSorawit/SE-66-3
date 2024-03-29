// project/server/routes/shiftRoutes.js
const express = require('express');
const router = express.Router();
const { getAllShifts, createShift, createShiftWeb, checkDuplicateShift, deleteShiftByID, getAllShiftsForPage } = require('../controllers/shiftController');

// GET all shifts
router.get('/shifts/all', getAllShifts);

// POST a new shift
router.post('/shifts/create', createShift);

router.post('/shifts/createShiftWeb', createShiftWeb);

router.get('/shifts/check/:id', checkDuplicateShift);

router.get('/shifts/allPage', getAllShiftsForPage);

router.delete('/shifts/delete/:id', deleteShiftByID);

module.exports = router;
