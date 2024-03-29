// project/server/routes/typeTimeRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTypeTimes, createTypeTime, checkDuplicateTypeTime, getTypeTimeById, deleteTypeTimeById } = require('../controllers/typetimeController');

// GET all type times
router.get('/typetimes/all', getAllTypeTimes);

// POST a new type time
router.post('/typetimes/create', createTypeTime);


router.delete('/typetimes/delete/:id', deleteTypeTimeById);
// GET type time by ID
router.get('/typetimes/:id', getTypeTimeById);

router.get('/typetimes/check/:id', checkDuplicateTypeTime);
module.exports = router;
