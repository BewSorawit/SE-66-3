// project/server/routes/absenceRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAbsences, createAbsence } = require('../controllers/absenceController');

// GET all absences
router.get('/absences/all', getAllAbsences);

// POST a new absence
router.post('/absences/create', createAbsence);

module.exports = router;
