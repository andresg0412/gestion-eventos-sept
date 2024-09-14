const db = require('../../infrastructure/database/database');

class GeolocationRepository {
    async getEventLocation(eventId) {
        try {
            const query = 'SELECT * FROM events WHERE id = ?';
            const [rows] = await db.execute(query, [eventId]);
            return rows.length > 0 ? rows[0] : [];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GeolocationRepository;