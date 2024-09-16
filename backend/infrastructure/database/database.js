const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST || 'localhost',
            port: parseInt(DB_PORT) || 3306,
            user: DB_USER || 'root',
            password: DB_PASSWORD || '1234',
            database: DB_NAME || 'proyecto-eventos',
        });
        return connection;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { createConnection };