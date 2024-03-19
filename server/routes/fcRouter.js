// project/server/routes/branchRoutes.js
const express = require('express');
const router = express.Router();
const { getFcView } = require('../controllers/fcController');

router.get('/dfd', getFcView);
module.exports = router;
