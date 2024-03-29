// project/server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserByID } = require('../controllers/userController');

// GET all users
router.get('/users/all', getAllUsers);

// POST a new user
router.post('/users/create', createUser);

router.get('/users/:id', getUserByID);

module.exports = router;
