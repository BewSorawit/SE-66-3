// project/server/models/shift.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Shift = sequelize.define('shift', {
    shiftID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    scheduleID: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    timeID: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    branchID: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = Shift;