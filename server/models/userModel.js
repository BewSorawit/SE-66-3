// project/server/models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const User = sequelize.define('user', {
    userID: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    surName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    dateBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    passwordUser: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    branchID: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    roleID: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    // Other model options
    timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = User;