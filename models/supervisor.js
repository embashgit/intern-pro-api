const db = require('../bin/database/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
  const Supervisor = sequelize.define('supervisor', {
    staffid: Sequelize.INTEGER,
    roleid: Sequelize.INTEGER,
    
  }, {
    timestamps:true,
  });

  module.exports = Supervisor