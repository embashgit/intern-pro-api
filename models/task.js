const db = require('../bin/database/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
  const Task = sequelize.define('task', {
    staffid: Sequelize.INTEGER,
    status: Sequelize.STRING,
    description:Sequelize.STRING,
    duedate:Sequelize.STRING,
    title:Sequelize.STRING,
  }, {});
  module.exports =Task