// project/server/models/managerreplytofc.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const ManagerReplyToFC = sequelize.define('managerreplytofc', {
    replyID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    absenceID: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('yes', 'no'),
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});
module.exports = ManagerReplyToFC;