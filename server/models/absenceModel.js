// project/server/models/absence.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Absence = sequelize.define('absence', {
    absenceID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    absenceType: {
        type: DataTypes.ENUM('late', 'absence'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('in branch', 'out branch', 'FC Broadcasting'),
        allowNull: false
    },
    userIDsend: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    userIDchange: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = Absence;
