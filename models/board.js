'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    id: { 
        autoIncrement: true, 
        primaryKey: true, 
        notEmpty: true,
        type: DataTypes.INTEGER
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
    }
  }, {
    timestamps: false
  });
  Board.associate = function(models) {
    Board.hasMany(models.Task);
    Board.hasMany(models.User);
  };
  return Board;
};