
var Sequelize = require("sequelize");
const db = require('../db.js');

module.exports = db.sequelize.define('board', {
    idBoard: { 
        autoIncrement: true, 
        primaryKey: true, 
        notEmpty: true,
        type: Sequelize.INTEGER
    },
    name: { 
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false 
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false 
    }
}, {
    timestamps: false
});


