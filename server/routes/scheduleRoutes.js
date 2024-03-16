// project/server/routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSchedules, createSchedule } = require('../controllers/scheduleController');

// GET all schedules
router.get('/schedules/all', getAllSchedules);

// POST a new schedule
router.post('/schedules/create', createSchedule);

module.exports = router;
