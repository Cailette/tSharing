'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: DataTypes.INTEGER,
        notEmpty: true
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false,
        notEmpty: true
    },
    comment: { 
        type: DataTypes.STRING,
        notEmpty: false,
        allowNull: true 
    },
    date: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false
    }, 
    status: {
        type: DataTypes.ENUM('deleted','assigned','completed','free'),
        defaultValue: 'free',
        notEmpty: true,
        allowNull: false 
    },
    UserId: { 
        type: DataTypes.INTEGER,
        references:'users',
        referencesKey:'id',
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
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'UserId' });
    Task.belongsTo(models.Board, { foreignKey: 'BoardId' });
    Task.hasMany(models.Rate);
  };
  return Task;
};