'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    id: { type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: false
  });
  Board.associate = function(models) {
    Board.hasMany(models.Task);
    Board.hasMany(models.User);
  };
  return Board;
};