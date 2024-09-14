const db = require('../../infrastructure/database/database');
class FileProcessorRepository {

    async createEvents(events) {
        try {
            const query = 'INSERT INTO events (title, description, start_date, end_date, location, max_attendees, created_by) VALUES ?';
            const values = [events];
            const [rows] = await db.execute(query, [values]);
            return rows;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Evento ya existe' } };
            }
            throw error;
        }
    }
}

module.exports = FileProcessorRepository;