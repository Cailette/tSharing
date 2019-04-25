'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    id: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: DataTypes.INTEGER,
        notEmpty: true
    },
    value: { 
      type: DataTypes.INTEGER,
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
    TaskId: { 
        type: DataTypes.INTEGER,
        references:'boards',
        referencesKey:'id',
        notEmpty: true,
        allowNull: false 
    }
  }, {
    timestamps: false
  });
  Rate.associate = function(models) {
    Rate.belongsTo(models.User, { foreignKey: 'UserId' });
    Rate.belongsTo(models.Task, { foreignKey: 'TaskId' });
  };
  return Rate;
};