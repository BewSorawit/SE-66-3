const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "schueachuai@gmail.com",
    pass: "cfjj xfre zvrn fplm",
  },
});

let storedOTP;
let otpGeneratedTime;

const OTP_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
const BASE_URL = process.env.BASE_URL;

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (email) => {
  const otp = generateOTP();
  const mailOptions = {
    from: "schueachuai@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `
    <p>Your OTP code is <strong>${otp}</strong>.</p>
    <p>Please copy and enter this OTP on the verification page to confirm your email.</p>
    <p>If you didn’t request this, please ignore this email.</p>
  `,
    // html: `
    //   <p>Your OTP code is <strong>${otp}</strong>.</p>
    //   <p>Please click the link below to confirm your email:</p>
    //   <a href="${BASE_URL}/api/otp/confirm?otp=${otp}&email=${encodeURIComponent(
    //   email
    // )}">Confirm your email</a>
    //   <p>If you didn’t request this, please ignore this email.</p>
    // `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to:", email);
    storedOTP = otp;
    otpGeneratedTime = Date.now();
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Could not send OTP");
  }
};

const verifyOTP = (inputOTP) => {
  const currentTime = Date.now();
  const isExpired = currentTime - otpGeneratedTime > OTP_EXPIRATION_TIME;

  if (isExpired) {
    console.log("OTP has expired.");
    return false;
  }

  return inputOTP === storedOTP;
};

module.exports = { sendOTP, verifyOTP };
