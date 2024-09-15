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

    async createAttendees(attendees, userId) {
        try {
            const query = 'INSERT INTO attendees (name, email, event_id, user_id) VALUES (?, ?, ?, ?)';
            const queryduplicate = 'SELECT * FROM attendees WHERE email = ? AND event_id = ?';

            let inseredRows = 0;
            let duplicatesRows = 0;

            for (let i = 0; i < attendees.length; i++) {
                const attendee = attendees[i];
                const email = attendee.email;
                const eventId = attendee.eventId;
                const [duplicate] = await db.execute(queryduplicate, [email, eventId]);
                if (duplicate.length === 0) {
                    const [rows] = await db.execute(query, [attendee.name, attendee.email, attendee.eventId, userId]);
                    inseredRows += rows.affectedRows;
                } else {
                    duplicatesRows += 1;
                }
            }

            return { affectedRows: inseredRows, duplicatesRows: duplicatesRows };
        } catch (error) {
            throw error;
        }
    }

}

module.exports = FileProcessorRepository;