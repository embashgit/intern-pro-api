'use strict';

let d = new Date('year', 'month', 'day');

//set default due date
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('interns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      institution:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    duedate:{
        type:Sequelize.DATE,
        // defaultValue:d.setMonth(d.getMonth() + 6),
    },
    level:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    remark:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    roleid:{
      type:Sequelize.INTEGER,
      allowNull:false,
  },
  staffid:{
    type:Sequelize.INTEGER,
    allowNull:false,
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
    return queryInterface.dropTable('interns');
  }
};