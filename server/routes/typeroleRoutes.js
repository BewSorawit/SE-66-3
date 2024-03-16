// project/server/routes/typeRoleRoutes.js
const express = require('express');
const router = express.Router();
const { getAllRoles, createRole } = require('../controllers/typeroleController');

// GET all roles
router.get('/roles/all', getAllRoles);

// POST a new role
router.post('/roles/create', createRole);

module.exports = router;
