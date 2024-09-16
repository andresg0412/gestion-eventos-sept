const { createConnection } = require('../../infrastructure/database/database');

class GeolocationRepository {
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
    async getEventLocation(eventId) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al obtener localizaciones repository' } };
        }
        try {
            const query = 'SELECT * FROM events WHERE id = ?';
            const [rows] = await this.connection.execute(query, [eventId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = GeolocationRepository;