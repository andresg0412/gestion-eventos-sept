const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.on('error', (err) => {
    console.error(err);
});

module.exports = pool