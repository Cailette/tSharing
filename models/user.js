'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: DataTypes.INTEGER,
        notEmpty: true
    },
    email: { 
        type: DataTypes.STRING, 
        validate: {isEmail:true},
        allowNull: false,
        notEmpty: true
    },
    name: { 
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false 
    }, 
    BoardId: { 
        type: DataTypes.INTEGER,
        references:'boards',
        referencesKey:'id',
        notEmpty: true,
        allowNull: false 
    }
  }, {
    timestamps: false
  });
  User.associate = function(models) {
      User.hasMany(models.Task);
      User.belongsTo(models.Board, { foreignKey: 'BoardId' });
      User.hasMany(models.Rate);
  };
  return User;
};