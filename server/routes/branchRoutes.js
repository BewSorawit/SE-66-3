// project/server/routes/branchRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBranches, createBranch } = require('../controllers/branchController');

// GET all branches
router.get('/branches/all', getAllBranches);

// POST a new branch
router.post('/branches/create', createBranch);

module.exports = router;
