const db = require('../../infrastructure/database/database');
const { User } = require('../../domain/entities/User');
const { PasswordUtils } = require('../../domain/utils/PasswordUtils');

class UserRepository {
    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await db.execute(query);
            console.log(rows);
            return rows.length > 0 ? rows : [];
        } catch (error) {
            console.error('Error en getAllUsers:', error);
            throw { status: 500, body: { message: 'Error al obtener usuarios repository' } };
        }
    }
    async getUserById(id) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await db.execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
    async createUser(user) {
        try {
            const passwordHash = PasswordUtils.hashPassword(user.password);
            const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
            const [rows] = await db.execute(query, [user.username, user.email, passwordHash]);
            return rows;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Usuario ya existe' } };
            }
            throw error;
        }
    }

    async updateUser(user) {
        try {
            const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
            const [rows] = await db.execute(query, [user.username, user.email, user.id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            const [rows] = await db.execute(query, [id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async getUserEvents(id) {
        try {
            const query = 'SELECT * FROM events WHERE user_id = ?';
            const [rows] = await db.execute(query, [id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUseremail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await db.execute(query, [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;