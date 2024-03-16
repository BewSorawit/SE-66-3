// project/server/models/shift.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Shift = sequelize.define('shift', {
    shiftID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // ทำให้ shiftID เป็น auto-increment
    },
    scheduleID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    branchID: {
        type: DataTypes.STRING(10), // ตัวแปร branchID ยังคงเป็น STRING
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = Shift;
