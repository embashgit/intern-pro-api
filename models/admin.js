
const db = require('../bin/database/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
 const Admin = sequelize.define('admin', {
    staffid: Sequelize.INTEGER,
    roleid: Sequelize.INTEGER,
  }, {
    timestamps:true,
  });
 
  module.exports = Admin
 