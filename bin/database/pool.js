const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'intern_dev_db',
    password: 'embash',
    port: 2222,
  });


  module.exports = pool;