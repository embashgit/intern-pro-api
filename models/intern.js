
const db = require('../bin/database/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
  const Intern = sequelize.define('intern', {
    status: Sequelize.STRING,
    remark:Sequelize.STRING,
    level:Sequelize.STRING,
    institution:Sequelize.STRING,
    roleid:Sequelize.INTEGER,
    staffid:Sequelize.INTEGER,
    duedate:Sequelize.DATE,
  }, {
    timestamps:true,
  });
 
  module.exports = Intern