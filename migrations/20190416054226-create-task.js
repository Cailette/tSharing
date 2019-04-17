'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks', {
      id: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
      },
      title: { 
          type: Sequelize.STRING, 
          allowNull: false,
          notEmpty: true
      },
      comment: { 
          type: Sequelize.STRING,
          notEmpty: false,
          allowNull: true 
      },
      date: {
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false
      }, 
      status: {
          type: Sequelize.ENUM('deleted','assigned','completed','free'),
          defaultValue: 'free',
          notEmpty: true,
          allowNull: false 
      },
      UserId: {
          type: Sequelize.INTEGER,
          references:'users',
          referencesKey:'id',
          notEmpty: true,
          allowNull: false 
      },  
      BoardId: {
          type: Sequelize.INTEGER,
          references:'boards',
          referencesKey:'id',
          notEmpty: true,
          allowNull: false 
      },
      rating: {
          type: Sequelize.FLOAT,
          allowNull: true 
      }
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasks');
  }
};