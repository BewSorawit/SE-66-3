const express = require("express");
const { refreshAccessToken } = require("../controllers/tokenController");
const router = express.Router();

router.post("token/refresh-token", refreshAccessToken);

module.exports = router;
