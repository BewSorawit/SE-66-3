// project/server/controllers/branchController.js
const { Branch } = require('../models');

// ดึงข้อมูล Branch ทั้งหมด
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch branches' });
  }
};


// สร้าง Branch ใหม่
const createBranch = async (req, res) => {
  const { branchID, branchName, branchAddress } = req.body;
  try {
    const branch = await Branch.create({ branchID, branchName, branchAddress });
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create branch' });
  }
};

module.exports = { getAllBranches, createBranch };
