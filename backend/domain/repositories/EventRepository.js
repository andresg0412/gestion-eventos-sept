const { createConnection } = require('../../infrastructure/database/database');

class EventRepository {
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
    async getAllEvents() {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener eventos repository' } };
        }
        try {
            const query = 'SELECT * FROM events';
            const [rows] = await this.connection.execute(query);
            return rows.length > 0 ? rows : [];
        } catch (error) {
            console.error('Error en getAllEvents:', error);
            throw { status: 500, body: { message: 'Error al obtener eventos repository' } };
        }
    }
    async getEventById(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener evento repository' } };
        }
        try {
            const query = 'SELECT * FROM events WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async createEvent(event) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al crear evento repository' } };
        }
        try {
            const query = 'INSERT INTO events (title, description, start_date, end_date, location, max_attendees, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const [rows] = await this.connection.execute(query, [event.title, event.description, event.startDate, event.endDate, event.location, event.maxAttendees, event.createdBy]);
            
            return rows;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Evento ya existe' } };
            }
            throw error;
        }
    }

    async updateEvent(id, fieldsToUpdate) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al actualizar evento repository' } };
        }
        try {
            const query = `UPDATE events SET ${Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ')} WHERE id = ?`;
            const values = [...Object.values(fieldsToUpdate), id];

            const [result] = await this.connection.execute(query, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteEvent(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al eliminar evento repository' } };
        }
        try {
            const query = 'DELETE FROM events WHERE id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async getUserEvents(id) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener eventos repository' } };
        }
        try {
            const query = 'SELECT * FROM events WHERE user_id = ?';
            const [rows] = await this.connection.execute(query, [id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EventRepository