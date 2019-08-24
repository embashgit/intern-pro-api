'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      middlename: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      surname: {
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      image:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobtitle:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      age:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roleid:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('staffs');
  }
};