const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'ls-d8711bbe6a4638679f80de44d1d1ab5bb5e32d45.c28evfenbknb.us-east-1.rds.amazonaws.com',
            port: parseInt(DB_PORT),
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
