// project/server/routes/absenceRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllAbsences,
  createAbsence,
  updateAbsenceUserIDChange,
  createAbsenceWeb,
  updateAbsenceStatus,
} = require("../controllers/absenceController");

// GET all absences
router.get("/absences/all", getAllAbsences);

// POST a new absence
router.post("/absences/create", createAbsence);

router.post("/absences/createWeb", createAbsenceWeb);

router.put("/absences/updateStatus/:id", updateAbsenceStatus);

router.put("/absences/updateUser/:id", updateAbsenceUserIDChange);

module.exports = router;
