// project/server/models/typetime.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const TypeTime = sequelize.define('typetime', {
    timeID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    timeStart: {
        type: DataTypes.TIME,
        allowNull: false
    },
    timeEnd: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = TypeTime;