'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('boards', {
      id: { 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false,
        notEmpty: true,
        type: Sequelize.INTEGER
      },
      name: { 
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false 
      },
      password: {
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false 
      }
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('boards');
  }
};