// project/server/routes/fullcalendar.js
const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/fullcalendar');

router.post('/events', createEvent);

module.exports = router;
