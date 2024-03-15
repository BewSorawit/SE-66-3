// project/server/models/fcdetail.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const FCDetail = sequelize.define('fcdetail', {
    fcDetailID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    userID: {
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
module.exports = FCDetail;