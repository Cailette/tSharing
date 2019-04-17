'use strict';
//database db:migrate
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
      },
      email: { 
          type: Sequelize.STRING, 
          validate: {isEmail:true},
          allowNull: false,
          notEmpty: true
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
      }, 
      BoardId: {
          type: Sequelize.INTEGER,
          references:'boards',
          referencesKey:'BoardId',
          notEmpty: true,
          allowNull: false 
      }
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};