'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    comment: DataTypes.STRING,
    date: DataTypes.STRING,
    status: DataTypes.ENUM('deleted','assigned','completed','free'),
    rating: DataTypes.FLOAT,
    BoardId: { type: DataTypes.INTEGER,
      references:'boards',
      referencesKey:'id'},
    UserId: { type: DataTypes.INTEGER,
      references:'users',
      referencesKey:'id'}
  }, {
    timestamps: false
  });
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'UserId' });
    Task.belongsTo(models.Board, { foreignKey: 'BoardId' });
  };
  return Task;
};