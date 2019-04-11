"use strict";

var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '.', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// //Models/tables
// db.user = require('./models/user')(sequelize, Sequelize);
// db.task = require('./models/task')(sequelize, Sequelize);
// db.board = require('./models/board')(sequelize, Sequelize);

// //Relations
// db.user.belongsTo(db.board);
// db.board.hasMany(db.user);
// db.task.belongsTo(db.board);
// db.board.hasMany(db.task);
// db.task.belongsTo(db.user);
// db.user.hasMany(db.task);

module.exports = db;
