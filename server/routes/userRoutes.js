// project/server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser , getUserBranch } = require('../controllers/userController');

// GET all users
router.get('/users/all', getAllUsers);

// GET users branch
router.get('/users/getuserbranch', getUserBranch);

// POST a new user
router.post('/users/create', createUser);

module.exports = router;
