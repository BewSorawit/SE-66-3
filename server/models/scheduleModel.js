// project/server/models/schedule.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Schedule = sequelize.define('schedule', {
    scheduleID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = Schedule;