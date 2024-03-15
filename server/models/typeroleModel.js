// project/server/models/typerole.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const TypeRole = sequelize.define('typerole', {
    roleID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    roleName: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = TypeRole;