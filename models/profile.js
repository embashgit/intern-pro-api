
const db = require('../bin/database/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
  const profile = sequelize.define('profile', {
    username: Sequelize.STRING,
    password:Sequelize.STRING,
    staffid:Sequelize.STRING,

  }, {
    timestamps:true,
  });
 
  module.exports = profile;



 