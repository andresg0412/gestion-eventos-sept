const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD, // Reemplaza por tu contraseña real
            database: DB_NAME
        });

        console.log('Conexión exitosa');
        await connection.end();
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

testConnection();
