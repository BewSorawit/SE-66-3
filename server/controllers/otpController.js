const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (email) => {
  const otp = generateOTP();
  const mailOptions = {
    from: "schueachuai@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
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
