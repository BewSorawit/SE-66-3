// project/server/routes/shiftRoutes.js
const express = require('express');
const router = express.Router();
const { getAllShifts, createShift } = require('../controllers/shiftController');

// GET all shifts
router.get('/shifts/all', getAllShifts);

// POST a new shift
router.post('/shifts/create', createShift);

module.exports = router;
