const db = require('../../infrastructure/database/database');
class FileProcessorRepository {

    async createEvents(events) {
        try {
            const query = 'INSERT INTO events (title, description, start_date, end_date, location, max_attendees, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
            
            let inseredRows = 0;

            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const [rows] = await db.execute(query, [event.title, event.description, event.startDate, event.endDate, event.location, event.maxAttendees, event.createdBy]);
                inseredRows += rows.affectedRows;
            }

            return { affectedRows: inseredRows };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, body: { message: 'Evento ya existe' } };
            }
            throw error;
        }
    }
}

module.exports = FileProcessorRepository;