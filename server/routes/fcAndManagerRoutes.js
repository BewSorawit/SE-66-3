// project/server/routes/branchRoutes.js
const express = require("express");
const router = express.Router();
const { mysqlConnection } = require("../database/db");
const { getAllFcDetail } = require('../controllers/fcDetailsController');

const db = mysqlConnection;
router.get("/FcView", (req, res) => {
  const sql = `SELECT branches.branchID as branchID, absences.absenceID as absenceID, branches.branchName as branchName, DATE_FORMAT(schedules.date,'%e %M %Y') AS date,
    typetimes.timeStart as timeStart, typetimes.timeEnd as timeEnd, absences.status as status
    FROM (((((shifts INNER JOIN branches ON shifts.branchID = branches.branchID)
    INNER JOIN schedules ON schedules.scheduleID = shifts.scheduleID)
    INNER JOIN typetimes ON shifts.timeID = typetimes.timeID)
    INNER JOIN shiftdetails ON shifts.shiftID = shiftdetails.shiftID)
    INNER JOIN absences ON shiftdetails.absenceID = absences.absenceID )
    WHERE absences.status = 'out branch'
 `;

  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

router.get("/FcView/send/:absenceID", (req, res) => {
  const absenceID = req.params.absenceID;
  const sql = `
    SELECT
        a.absenceID as absenceID,
        b.branchName as branchName,
        DATE_FORMAT(s.date,'%e %M %Y') AS date,
        tt.timeStart as timeStart,
        tt.timeEnd as timeEnd
    FROM
    shifts sh
        INNER JOIN branches b ON sh.branchID = b.branchID
        INNER JOIN schedules s ON s.scheduleID = sh.scheduleID
        INNER JOIN typetimes tt ON sh.timeID = tt.timeID
        INNER JOIN shiftdetails sd ON sh.shiftID = sd.shiftID
        INNER JOIN absences a ON sd.absenceID = a.absenceID
    WHERE
    a.absenceID = ?;
`;

  db.query(sql, [absenceID], (err, data) => {
    if (err)
      return res.status(500).json({ error: "Error fetching branch details" });
    return res.json(data);
  });
});

router.get("/ManagerView", (req, res) => {
  const sql = `
    SELECT 
    absences.absenceID AS absenceID, 
    branches.branchID as branchID,
    branches.branchName AS branchName, 
    DATE_FORMAT(schedules.date, '%e %M %Y') AS date, 
    typetimes.timeStart AS timeStart, 
    typetimes.timeEnd AS timeEnd, 
    absences.status AS status
FROM 
    (((((shifts 
    INNER JOIN branches ON shifts.branchID = branches.branchID) 
    INNER JOIN schedules ON schedules.scheduleID = shifts.scheduleID) 
    INNER JOIN typetimes ON shifts.timeID = typetimes.timeID) 
    INNER JOIN shiftdetails ON shifts.shiftID = shiftdetails.shiftID) 
    INNER JOIN absences ON shiftdetails.absenceID = absences.absenceID) 
WHERE 
    absences.status = 'FC';
`;
  // change status

  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

router.get("/ManagerView/sendFC/:absenceID", (req, res) => {
  const absenceID = req.params.absenceID; // รับค่า absenceID จากพารามิเตอร์
  const sql = `
  SELECT 
  absences.absenceID AS absenceID,
  branches.branchID as branchID,
  branches.branchName AS branchName, 
  DATE_FORMAT(schedules.date, '%e %M %Y') AS date, 
  typetimes.timeStart AS timeStart, 
  typetimes.timeEnd AS timeEnd, 
  absences.status AS status
FROM 
  (((((shifts 
  INNER JOIN branches ON shifts.branchID = branches.branchID) 
  INNER JOIN schedules ON schedules.scheduleID = shifts.scheduleID) 
  INNER JOIN typetimes ON shifts.timeID = typetimes.timeID) 
  INNER JOIN shiftdetails ON shifts.shiftID = shiftdetails.shiftID) 
  INNER JOIN absences ON shiftdetails.absenceID = absences.absenceID) 
WHERE 
    absences.absenceID = ?;
 `; // เพิ่มเงื่อนไขใน WHERE clause สำหรับระบุ absenceID และสถานะเป็น 'FC'

  db.query(sql, [absenceID], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

router.put("/FcView/update/:absenceID", (req, res) => {
  const sql = `UPDATE absences
    SET status = ?
    WHERE absenceID = ?;
    `;

  const { status } = req.body;
  const absenceID = req.params.absenceID;

  db.query(sql, [status, absenceID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating absence status" });
    }
    return res.json(data);
  });
});

// GET request เพื่อดึงรายชื่อพนักงานทั้งหมด
router.get("/ManagerView/User", (req, res) => {
  db.query("SELECT userID, firstName FROM users", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json("Error fetching user data");
      return;
    } else {
      res.json(data);
    }
  });
});

// POST request เพื่อบันทึกข้อมูลผู้ใช้ลงในฐานข้อมูล
router.post("/ManagerView/saveDataUser", (req, res) => {
  const { absenceID, userID, status } = req.body;

  // ทำการบันทึกข้อมูลลงในฐานข้อมูล
  const sql =
    "INSERT INTO managerreplytofcs (absenceID, userID, status) VALUES (?, ?, ?)";
  db.query(sql, [absenceID, userID, status], (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json("Error saving data");
      return;
    }
    console.log("Data inserted successfully");
    res.status(200).json("Data saved successfully");
  });
});

router.get("/FcCheck", (req, res) => {
  const sql = `SELECT branches.branchID as branchID,
  managerreplytofcs.status AS statusMana,
  IFNULL(users.firstName, 'Unknown') AS firstName,
  absences.absenceID AS absenceID,
  branches.branchName AS branchName,
  DATE_FORMAT(schedules.date, '%e %M %Y') AS date,
  typetimes.timeStart AS timeStart,
  typetimes.timeEnd AS timeEnd,
  absences.status AS status
FROM
  (((((((shifts
  INNER JOIN branches ON shifts.branchID = branches.branchID)
  INNER JOIN schedules ON schedules.scheduleID = shifts.scheduleID)
  INNER JOIN typetimes ON shifts.timeID = typetimes.timeID)
  INNER JOIN shiftdetails ON shifts.shiftID = shiftdetails.shiftID)
  INNER JOIN absences ON shiftdetails.absenceID = absences.absenceID)
  INNER JOIN managerreplytofcs ON managerreplytofcs.absenceID = absences.absenceID)
  LEFT JOIN users ON users.userID = managerreplytofcs.userID)
WHERE
absences.status = 'CHECK';
`;

  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

router.get("/FcCheck/send/:absenceID", (req, res) => {
  const absenceID = req.params.absenceID;
  const sql = `SELECT 
  managerreplytofcs.status AS statusMana,
  managerreplytofcs.userID AS userIDchange,
  IFNULL(users.firstName, 'Unknown') AS firstName,
  absences.absenceID AS absenceID,
  branches.branchName AS branchName,
  DATE_FORMAT(schedules.date, '%e %M %Y') AS date,
  typetimes.timeStart AS timeStart,
  typetimes.timeEnd AS timeEnd,
  absences.status AS status
FROM
  (((((((shifts
  INNER JOIN branches ON shifts.branchID = branches.branchID)
  INNER JOIN schedules ON schedules.scheduleID = shifts.scheduleID)
  INNER JOIN typetimes ON shifts.timeID = typetimes.timeID)
  INNER JOIN shiftdetails ON shifts.shiftID = shiftdetails.shiftID)
  INNER JOIN absences ON shiftdetails.absenceID = absences.absenceID)
  INNER JOIN managerreplytofcs ON managerreplytofcs.absenceID = absences.absenceID)
  LEFT JOIN users ON users.userID = managerreplytofcs.userID)
WHERE
absences.status = 'CHECK' AND absences.absenceID = ?
`;

  db.query(sql, [absenceID], (err, data) => {
    if (err)
      return res.status(500).json({ error: "Error fetching branch details" });
    return res.json(data);
  });
});

router.put("/UserChange/:absenceID", (req, res) => {
  const { userIDchange } = req.body;
  const absenceID = req.params.absenceID;
  const sql = `UPDATE absences
                     SET userIDchange = ?
                     WHERE absenceID = ? ;`;

  db.query(sql, [userIDchange, absenceID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating absence status" });
    }
    return res.json(data);
  });
});

router.delete("/delete/:absenceID", (req, res) => {
  const absenceID = req.params.absenceID;
  const sql = `DELETE FROM managerreplytofcs WHERE absenceID = ?`;

  db.query(sql, [absenceID], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      console.log("Delete successful");
      res.send("Delete successful");
    }
  });
});

router.get("/FcCheck/send/:absenceID", (req, res) => {
  const absenceID = req.params.absenceID;
  const sql = `S`;

  db.query(sql, [absenceID], (err, data) => {
    if (err)
      return res.status(500).json({ error: "Error fetching branch details" });
    return res.json(data);
  });
});


router.get("/Fcdetails", getAllFcDetail);
module.exports = router;
