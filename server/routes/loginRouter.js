// project/server/routes/loginRouter.js
const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/loginController");

router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
