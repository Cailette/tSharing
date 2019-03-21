
var Sequelize = require("sequelize");
const db = require('../db.js');

module.exports = db.sequelize.define('user', {
    idUser: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER
    },
    email: { 
        type:Sequelize.STRING, 
        validate: {isEmail:true}
    },
    name: { 
        type: Sequelize.STRING,
        notEmpty: true
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false 
    }, 
    idBoard: {
        type: Sequelize.INTEGER,
        references:'board',
        referencesKey:'idBoard'
    }
}, {
    timestamps: false
});


