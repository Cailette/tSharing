// var Sequelize = require("sequelize");
// const db = require('../db.js');

// module.exports = db.sequelize.define('user', {
//         idUser: { 
//             autoIncrement: true, 
//             primaryKey: true, 
//             type: Sequelize.INTEGER,
//             notEmpty: true
//         },
//         email: { 
//             type: Sequelize.STRING, 
//             validate: {isEmail:true},
//             allowNull: false,
//             notEmpty: true
//         },
//         name: { 
//             type: Sequelize.STRING,
//             notEmpty: true,
//             allowNull: false 
//         },
//         password: {
//             type: Sequelize.STRING,
//             notEmpty: true,
//             allowNull: false 
//         }, 
//         idBoard: {
//             type: Sequelize.INTEGER,
//             references:'board',
//             referencesKey:'idBoard',
//             notEmpty: true,
//             allowNull: false 
//         }
//     }, {
//         timestamps: false
//     });

'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = DataTypes.define('user', {
        idUser: DataTypes.INTEGER,
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        idBoard: DataTypes.INTEGER
    }, {});
    User.associate = function(models) {
        User.hasMany(models.Tasks);
        User.belongsTo(models.Board, { foreignKey: 'idBoard' });
    };
    return User;
};