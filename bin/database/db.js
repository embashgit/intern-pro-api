const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'intern_dev_db',
    'postgres',
    'embash',
    {
        dialect:'postgres',
        host:'127.0.0.1',
        port:'2222',
        operatorsAliasis:false,
        pool:{
            max:9,
            min:0,
            require:30000,
            idle:10000
        }
    }
);


const db ={};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;