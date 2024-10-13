// project/server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByID,
  getUserBranch,
  getAllUsersAndBranchAndRole,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");

// GET all users,
router.get("/users/all", getAllUsers);

// GET users branch
router.get("/users/getuserbranch", getUserBranch);

// POST a new user
router.post("/users/create", createUser);

router.get("/users/getAllUsersAndBranchAndRole", getAllUsersAndBranchAndRole);

router.get("/users/:id", getUserByID);

router.put("/users/:id", updateUser);

router.delete("/users/delete/:id", deleteUser);

module.exports = router;
