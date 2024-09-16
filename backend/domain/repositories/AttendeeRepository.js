const { createConnection } = require('../../infrastructure/database/database');

class AttendeeRepository {
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
    async getAllAttendees() {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener asistentes repository' } };
        }
        try {
            const query = 'SELECT * FROM attendees';
            const [rows] = await this.connection.execute(query);
            return rows.length > 0 ? rows : null;
        } catch (error) {
            throw error;
        }
    }
    async getAttendeeById(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener asistente repository' } };
        }
        try {
            const query = 'SELECT * FROM attendees WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async createAttendee(attendee) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al crear asistente repository' } };
        }
        try {
            const query = 'INSERT INTO attendees (event_id, user_id) VALUES (?, ?)';
            const [rows] = await this.connection.execute(query, [attendee.eventId, attendee.userId]);
            return rows.insertId;
        } catch (error) {
            throw error;
        }
    }

    async deleteAttendee(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al eliminar asistente repository' } };
        }
        try {
            const query = 'DELETE FROM attendees WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async getAttendeesByEventId(eventId) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener asistentes repository' } };
        }
        try {
            const query = 'SELECT * FROM attendees WHERE event_id = ?';
            const [rows] = await this.connection.execute(query, [eventId]);
            return rows.length > 0 ? rows : null;
        } catch (error) {
            throw error;
        }
    }

    async getAttendeesByUserId(userId) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener asistentes repository' } };
        }
        try {
            const query = 'SELECT * FROM attendees WHERE user_id = ?';
            const [rows] = await this.connection.execute(query, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAttendeeByEmail(email) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener asistentes repository' } };
        }
        try {
            const query = 'SELECT * FROM attendees WHERE email = ?';
            const [rows] = await this.connection.execute(query, [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAttendeeByEmailAndEventId(email, eventId) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener asistentes repository' } };
        }
        try {
            const query = 'SELECT * FROM attendees WHERE email = ? AND event_id = ?';
            const [rows] = await this.connection.execute(query, [email, eventId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async registerAttendee(attendee) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al registrar asistentes repository' } };
        }
        try {
            const query = 'INSERT INTO attendees (name, email, event_id, user_id) VALUES (?, ?, ?, ?)';
            const [rows] = await this.connection.execute(query, [attendee.name, attendee.email, attendee.eventId, attendee.userId]);
            return rows.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getEventById(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener eventos repository' } };
        }
        try {
            const query = 'SELECT * FROM events WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener usuario repository' } };
        }
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AttendeeRepository;