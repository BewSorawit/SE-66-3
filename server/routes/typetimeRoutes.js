// project/server/routes/typeTimeRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTypeTimes, createTypeTime, getTypeTimeById, checkDuplicateTypeTime } = require('../controllers/typetimeController');

// GET all type times
router.get('/typetimes/all', getAllTypeTimes);

// GET type time by ID
router.get('/typetimes/:id', getTypeTimeById);

router.get('/typetimes/check/:id', checkDuplicateTypeTime);

// POST a new type time
router.post('/typetimes/create', createTypeTime);

module.exports = router;
