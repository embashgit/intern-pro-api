const db = require('../bin/database/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Staff =  sequelize.define('staff', {
    
    firstname: Sequelize.STRING,
    
    middlename:Sequelize.STRING,
      
    surname: Sequelize.STRING,
    
    email:Sequelize.STRING,
    
    image:{
      type:Sequelize.STRING,
      allowNull:true,
    },
  
    gender:Sequelize.STRING,
     
    jobtitle:Sequelize.STRING,
     
    age:Sequelize.INTEGER,
   
    roleid:Sequelize.INTEGER,
   
  }, {
    timestamps:true,
  });

module.exports = Staff;