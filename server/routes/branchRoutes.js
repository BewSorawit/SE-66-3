// project/server/routes/branchRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBranches, createBranch } = require('../controllers/branchController');

// GET all branches
router.get('/', getAllBranches);

// POST a new branch
router.post('/', createBranch);

module.exports = router;
