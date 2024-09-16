const { createConnection } = require('../../infrastructure/database/database');
const { User } = require('../../domain/entities/User');
const PasswordUtils = require('../utils/PasswordUtils');

class UserRepository {
    constructor() {
        this.connection = null;
    }

    async connectdb() {
        try {
            this.connection = await createConnection();
        } catch (error) {
            console.error('Error en connectdb:', error);
            throw { status: 500, body: { message: 'Error al conectar con la base de datos' } };
        }
    }
    async getAllUsers() {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener usuarios repository' } };
        }
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await this.connection.execute(query);

            if (!rows || rows.length === 0) {
                return [];
            };

            const filteredRows = rows.map(user => {
                const { password_hash, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });

            return filteredRows;
        } catch (error) {
            console.error('Error en getAllUsers:', error);
            throw { status: 500, body: { message: 'Error al obtener usuarios repository' } };
        }
    }
    async getUserById(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener usuario repository' } };
        }
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
    async createUser(user) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al crear usuario repository' } };
        }
        try {
            const passwordHash = await PasswordUtils.hashPassword(user.password);
            const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
            const [rows] = await this.connection.execute(query, [user.username, user.email, passwordHash]);
            return rows;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Usuario ya existe' } };
            }
            throw error;
        }
    }

    async updateUser(user) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al actualizar usuario repository' } };
        }
        try {
            const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
            const [rows] = await this.connection.execute(query, [user.username, user.email, user.id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al eliminar usuarios repository' } };
        }
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async getUserEvents(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener usuarios repository' } };
        }
        try {
            const query = 'SELECT * FROM events WHERE user_id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUseremail(email) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener usuarios repository' } };
        }
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await this.connection.execute(query, [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;