// project/server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, createUser , getUserBranch ,getAllUsersAndBranchAndRole,deleteUser,getUserById,updateUser} = require('../controllers/userController');

// GET all users
router.get('/users/all', getAllUsersAndBranchAndRole);

// GET users branch
router.get('/users/getuserbranch', getUserBranch);

// POST a new user
router.post('/users/create', createUser);



//delete
router.delete('/users/delete/:id', deleteUser);

// GET user by ID
router.get('/users/:id', getUserById);

// PUT update user
router.put('/users/:id', updateUser);


router.get('/users/getAllUsersAndBranchAndRole', getAllUsersAndBranchAndRole);
module.exports = router;


