// project/server/index.js
const https = require("https");
const fs = require("fs");
const app = require("./config/express");
const { mysqlConnection, sequelize } = require("./database/db");
const { readdirSync } = require("fs");

const port = process.env.PORT || 3001;

const sslOptions = {
  key: fs.readFileSync("./ssl/private.key"),
  cert: fs.readFileSync("./ssl/certificate.crt"),
};

// สร้างฟังก์ชันสำหรับเริ่มต้นเซิร์ฟเวอร์
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Sequelize database synchronized.");

    await new Promise((resolve, reject) => {
      mysqlConnection.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL database:", err);
          reject(err);
        } else {
          console.log("Connected to MySQL database.");
          resolve();
        }
      });
    });
    https.createServer(sslOptions, app).listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

// ใช้ readdirSync เพื่อเพิ่มเส้นทางการเรียกใช้เมื่อมีไฟล์ routes เพิ่มเข้ามา
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// เรียกใช้ฟังก์ชัน startServer เพื่อเริ่มต้นเซิร์ฟเวอร์
startServer();
