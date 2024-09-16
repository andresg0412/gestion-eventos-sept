const { createConnection } = require('../../infrastructure/database/database');
class FileProcessorRepository {
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
    async createEvents(events) {
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al crear evento repository' } };
        }
        try {
            const query = 'INSERT INTO events (title, description, start_date, end_date, location, max_attendees, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)';

            let inseredRows = 0;

            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const [rows] = await this.connection.execute(query, [event.title, event.description, event.startDate, event.endDate, event.location, event.maxAttendees, event.createdBy]);
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
        if (!this.connection) {
            throw { status: 500, body: { message: 'Error al crear asistentes repository' } };
        }
        try {
            const query = 'INSERT INTO attendees (name, email, event_id, user_id) VALUES (?, ?, ?, ?)';
            const queryduplicate = 'SELECT * FROM attendees WHERE email = ? AND event_id = ?';

            let inseredRows = 0;
            let duplicatesRows = 0;

            for (let i = 0; i < attendees.length; i++) {
                const attendee = attendees[i];
                const email = attendee.email;
                const eventId = attendee.eventId;
                const [duplicate] = await this.connection.execute(queryduplicate, [email, eventId]);
                if (duplicate.length === 0) {
                    const [rows] = await this.connection.execute(query, [attendee.name, attendee.email, attendee.eventId, userId]);
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