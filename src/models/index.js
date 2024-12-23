const mongoose = require('mongoose');

exports.User = require('./UserModel');
exports.Role = require('./RoleModel');
exports.UserRoleMap = require('./UserRoleMapModel');
exports.Mongoose = mongoose;
