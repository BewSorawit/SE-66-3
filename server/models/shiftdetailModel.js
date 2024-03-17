// project/server/models/shiftdetail.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const ShiftDetail = sequelize.define('shiftdetail', {
    shiftDetailID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    shiftID: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    userID: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('OT', 'shift'),
        allowNull: false
    },
    statusCL: {
        type: DataTypes.ENUM('yes', 'no'),
        allowNull: false
    },
    absenceID: {
        type: DataTypes.STRING(10),
        allowNull: true
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});
module.exports = ShiftDetail;