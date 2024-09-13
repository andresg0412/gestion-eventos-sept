const db = require('../../infrastructure/database/database');

class EventRepository {

    async getAllEvents() {
        try {
            const query = 'SELECT * FROM events';
            const [rows] = await db.execute(query);
            return rows.length > 0 ? rows : [];
        } catch (error) {
            console.error('Error en getAllEvents:', error);
            throw { status: 500, body: { message: 'Error al obtener eventos repository' } };
        }
    }
    async getEventById(id) {
        try {
            const query = 'SELECT * FROM events WHERE id = ?';
            const [rows] = await db.execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async createEvent(event) {
        try {
            const query = 'INSERT INTO events (title, description, start_date, end_date, location, max_attendees, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const [rows] = await db.execute(query, [event.title, event.description, event.startDate, event.endDate, event.location, event.maxAttendees, event.createdBy]);
            return rows;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Evento ya existe' } };
            }
            throw error;
        }
    }

    async updateEvent(event) {
        try {
            const query = 'UPDATE events SET title = ?, description = ?, start_date = ?, end_date = ?, location = ?, max_attendees = ? WHERE id = ?';
            const [rows] = await db.execute(query, [event.title, event.description, event.startDate, event.endDate, event.location, event.maxAttendees, event.id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteEvent(id) {
        try {
            const query = 'DELETE FROM events WHERE id = ?';
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

module.exports = EventRepository