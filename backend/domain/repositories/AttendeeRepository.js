const db = require('../../infrastructure/database/database');

class AttendeeRepository {

    async getAllAttendees() {
        try {
            const query = 'SELECT * FROM attendees';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
    async getAttendeeById(id) {
        try {
            const query = 'SELECT * FROM attendees WHERE id = ?';
            const [rows] = await db.execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async createAttendee(attendee) {
        try {
            const query = 'INSERT INTO attendees (event_id, user_id) VALUES (?, ?)';
            const [rows] = await db.execute(query, [attendee.eventId, attendee.userId]);
            return rows.insertId;
        } catch (error) {
            throw error;
        }
    }

    async deleteAttendee(id) {
        try {
            const query = 'DELETE FROM attendees WHERE id = ?';
            const [rows] = await db.execute(query, [id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async getAttendeesByEventId(eventId) {
        try {
            const query = 'SELECT * FROM attendees WHERE event_id = ?';
            const [rows] = await db.execute(query, [eventId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAttendeesByUserId(userId) {
        try {
            const query = 'SELECT * FROM attendees WHERE user_id = ?';
            const [rows] = await db.execute(query, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAttendeeByEmail(email) {
        try {
            const query = 'SELECT * FROM attendees WHERE email = ?';
            const [rows] = await db.execute(query, [email]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAttendeeByEmailAndEventId(email, eventId) {
        try {
            const query = 'SELECT * FROM attendees WHERE email = ? AND event_id = ?';
            const [rows] = await db.execute(query, [email, eventId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async registerAttendee(attendee) {
        try {
            const query = 'INSERT INTO attendees (name, email, event_id, user_id) VALUES (?, ?, ?, ?)';
            const [rows] = await db.execute(query, [attendee.name, attendee.email, attendee.eventId, attendee.userId]);
            return rows.insertId;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = AttendeeRepository;