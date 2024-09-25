// project/server/controllers/absenceController.js
const { Absence, ShiftDetail } = require("../models");

// ดึงข้อมูล Absence ทั้งหมด
const getAllAbsences = async (req, res) => {
  try {
    const absences = await Absence.findAll();
    res.json(absences);
  } catch (error) {
    console.error("Error getting absences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// สร้าง Absence ใหม่
const createAbsence = async (req, res) => {
  try {
    const { absenceID, absenceType, status, userIDsend, userIDchange } =
      req.body;
    const newAbsence = await Absence.create({
      absenceID,
      absenceType,
      status,
      userIDsend,
      userIDchange,
    });
    res.status(201).json(newAbsence);
  } catch (error) {
    console.error("Error creating absence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// สร้าง Absence ใหม่
const createAbsenceWeb = async (req, res) => {
  try {
    const { absenceType, status, userIDsend, shiftDetailID } = req.body;

    let newAbsenceID;
    let lastAbsence = await Absence.findOne({ order: [["absenceID", "DESC"]] });

    if (lastAbsence) {
      const lastID = lastAbsence.absenceID;
      const lastIDNumber = parseInt(lastID.substr(2));
      const newIDNumber = lastIDNumber + 1;
      newAbsenceID = `AB${newIDNumber.toString().padStart(3, "0")}`;
    } else {
      newAbsenceID = "AB001";
    }

    // สร้าง Absence ใหม่
    const newAbsence = await Absence.create({
      absenceID: newAbsenceID,
      absenceType: absenceType,
      status: status,
      userIDsend: userIDsend,
      userIDchange: null, // กำหนดให้ userIDchange เป็น null
    });

    // อัปเดต absenceID ใน shiftDetail ตาม shiftDetailID ที่รับเข้ามา
    if (shiftDetailID) {
      const shiftDetail = await ShiftDetail.findByPk(shiftDetailID);
      if (shiftDetail) {
        shiftDetail.absenceID = newAbsenceID;
        await shiftDetail.save();
      }
    }

    res.status(201).json(newAbsence);
  } catch (error) {
    console.error("Error creating absence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAbsenceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const absence = await Absence.findOne({ where: { absenceID: id } });

    if (!absence) {
      return res.status(404).json({ error: "Absence not found" });
    }

    absence.status = status; // กำหนดค่า status ใหม่
    await absence.save();

    res.status(200).json({ message: "Absence updated successfully" });
  } catch (error) {
    console.error("Error updating absence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAbsenceUserIDChange = async (req, res) => {
  const { id } = req.params;
  const { userIDchange } = req.body;

  try {
    const absence = await Absence.findOne({ where: { absenceID: id } });

    if (!absence) {
      return res.status(404).json({ error: "Absence not found" });
    }

    absence.userIDchange = userIDchange;
    await absence.save();

    res
      .status(200)
      .json({ message: "Absence userIDchange updated successfully" });
  } catch (error) {
    console.error("Error updating absence userIDchange:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getAllAbsences,
  createAbsence,
  createAbsenceWeb,
  updateAbsenceStatus,
  updateAbsenceUserIDChange,
};
