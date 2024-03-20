// project/server/models/index.js
const Absence = require('./absenceModel');
const Branch = require('./branchModel');
const FCDetail = require('./fcdetailModel');
const ManagerReplyToFC = require('./managerreplytofcModel');
const Schedule = require('./scheduleModel');
const Shift = require('./shiftModel');
const ShiftDetail = require('./shiftdetailModel');
const TypeRole = require('./typeroleModel');
const TypeTime = require('./typetimeModel');
const User = require('./userModel');

// Define associations between tables
Absence.belongsTo(User, { foreignKey: 'userIDsend', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Absence.belongsTo(User, { foreignKey: 'userIDchange', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Absence, { foreignKey: 'userIDsend' });
User.hasMany(Absence, { foreignKey: 'userIDchange' });

FCDetail.belongsTo(User, { foreignKey: 'userID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
FCDetail.belongsTo(Branch, { foreignKey: 'branchID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Branch.hasMany(FCDetail, { foreignKey: 'branchID' });

ManagerReplyToFC.belongsTo(User, { foreignKey: 'userID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ManagerReplyToFC.belongsTo(Absence, { foreignKey: 'absenceID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(ManagerReplyToFC, { foreignKey: 'userID' });
Absence.hasMany(ManagerReplyToFC, { foreignKey: 'absenceID' });

Shift.belongsTo(Schedule, { foreignKey: 'scheduleID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Shift.belongsTo(TypeTime, { foreignKey: 'timeID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Shift.belongsTo(Branch, { foreignKey: 'branchID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Schedule.hasMany(Shift, { foreignKey: 'scheduleID' });
TypeTime.hasMany(Shift, { foreignKey: 'timeID' });
Branch.hasMany(Shift, { foreignKey: 'branchID' });

ShiftDetail.belongsTo(Absence, { foreignKey: 'absenceID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ShiftDetail.belongsTo(Shift, { foreignKey: 'shiftID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ShiftDetail.belongsTo(User, { foreignKey: 'userID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Absence.hasMany(ShiftDetail, { foreignKey: 'absenceID' });
Shift.hasMany(ShiftDetail, { foreignKey: 'shiftID' });
User.hasMany(ShiftDetail, { foreignKey: 'userID' });

User.belongsTo(TypeRole, { foreignKey: 'roleID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.belongsTo(Branch, { foreignKey: 'branchID', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
TypeRole.hasMany(User, { foreignKey: 'roleID' });
Branch.hasMany(User, { foreignKey: 'branchID' });

module.exports = {
    Absence,
    Branch,
    FCDetail,
    ManagerReplyToFC,
    Schedule,
    Shift,
    ShiftDetail,
    TypeRole,
    TypeTime,
    User
};
