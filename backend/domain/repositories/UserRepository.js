const db = require('../database');

class UserRepository {
    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw error;
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
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            const [rows] = await db.execute(query, [user.username, user.email, user.password]);
            return rows.insertId;
        } catch (error) {
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
}

module.exports = UserRepository;