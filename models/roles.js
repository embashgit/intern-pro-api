const Sequelize = require('sequelize');
const sequelize = require('../bin/database/db').sequelize;
// const Op = require('../bin/database/db').Op;

const Role = sequelize.define('role',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    },
    name:{
        type:Sequelize.CHAR(20),
        allowNull:false,
    }
},{
    timestamps:true,
});
module.exports =Role;

