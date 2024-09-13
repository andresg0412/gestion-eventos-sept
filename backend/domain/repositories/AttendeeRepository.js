const db = require('../database');

class AttendeeRepository {
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
}