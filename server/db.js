const user = require('./keys');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: user.name,
    password: user.password,
    host :'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;