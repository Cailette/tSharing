'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
      },
      UserId: {
          type: Sequelize.INTEGER,
          references:'users',
          referencesKey:'id',
          notEmpty: true,
          allowNull: false 
      },  
      TaskId: {
          type: Sequelize.INTEGER,
          references:'tasks',
          referencesKey:'id',
          notEmpty: true,
          allowNull: false 
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rates');
  }
};