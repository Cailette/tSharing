
var Sequelize = require("sequelize");
const db = require('../db.js');

module.exports = db.sequelize.define('user', {
    idUser: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER,
        notEmpty: true
    },
    email: { 
        type: Sequelize.STRING, 
        validate: {isEmail:true},
        allowNull: false,
        notEmpty: true
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
    }, 
    idBoard: {
        type: Sequelize.INTEGER,
        references:'board',
        referencesKey:'idBoard',
        notEmpty: true,
        allowNull: false 
    }
}, {
    timestamps: false
});


