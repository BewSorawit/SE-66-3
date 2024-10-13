const express = require("express");
const { sendOTP } = require("../controllers/otpController");
const { confirmUserCreation } = require("../controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();
router.post("/otp/send", sendOTP);
router.get("/otp/confirm", confirmUserCreation);

module.exports = router;
