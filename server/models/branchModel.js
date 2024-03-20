// project/server/models/branch.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Branch = sequelize.define('branch', {
    branchID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    branchName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    branchAddress: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});
module.exports = Branch;