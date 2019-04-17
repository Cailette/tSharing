'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    BoardId: { type: DataTypes.INTEGER,
    references:'boards',
    referencesKey:'id'}
  }, {
    timestamps: false
  });
  User.associate = function(models) {
      User.hasMany(models.Task);
      User.belongsTo(models.Board, { foreignKey: 'BoardId' });
  };
  return User;
};