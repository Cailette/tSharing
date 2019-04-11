var Sequelize = require("sequelize");
const db = require('../db.js');

module.exports = db.sequelize.define('task', {
        idTask: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        title: { 
            type: Sequelize.STRING, 
            allowNull: false,
            notEmpty: true
        },
        comment: { 
            type: Sequelize.STRING,
            notEmpty: false,
            allowNull: true 
        },
        date: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false
        }, 
        status: {
            type: Sequelize.ENUM('deleted','assigned','completed','free'),
            defaultValue: 'free',
            notEmpty: true,
            allowNull: false 
        },
        idUser: {
            type: Sequelize.INTEGER,
            references:'user',
            referencesKey:'idUser',
            notEmpty: true,
            allowNull: false 
        },  
        idBoard: {
            type: Sequelize.INTEGER,
            references:'board',
            referencesKey:'idBoard',
            notEmpty: true,
            allowNull: false 
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: true 
        }
    }, {
        timestamps: false
    });