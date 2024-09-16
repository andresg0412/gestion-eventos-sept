class AttendeeRegisterUseCase {
    constructor(AttendeeRepository) {
        this.AttendeeRepository = AttendeeRepository;
    }

    async getAllAttendees () {
        try {
            const connection = await this.AttendeeRepository.connectdb();
            const result = await this.AttendeeRepository.getAllAttendees();
            if (!result) {
                return { status: 404, body: { message: 'No existen asistentes registrados' } };
            }
            return { status: 200, body: result };
        } catch (error) {
            throw error;
        }
    }

    async registerAttendeeToEvent(attendee) {
        try {
            const connection = await this.AttendeeRepository.connectdb();
            const { name, email, eventId, userId } = attendee;

            const event = await this.AttendeeRepository.getEventById(eventId);
            if (!event) {
                return { status: 404, body: { message: 'El evento no existe' } };
            }
            const user = await this.AttendeeRepository.getUserById(userId);
            if (!user) {
                return { status: 404, body: { message: 'El usuario del sistema no existe' } };
            }

            const result = await this.AttendeeRepository.getAttendeeByEmailAndEventId(email, eventId);

            if (result) {
                return { status: 409, body: { message: 'El asistente ya se encuentra registrado para este evento' } };
            } else {
                const newAttendee = await this.AttendeeRepository.registerAttendee(attendee);
                if (newAttendee) {
                    return { status: 201, body: { message: 'Asistente registrado' } };
                } else {
                    return { status: 500, body: { message: 'Error al registrar el asistente' } };
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteAttendee(id) {
        try {
            const connection = await this.AttendeeRepository.connectdb();
            const result = await this.AttendeeRepository.deleteAttendee(id);
            if (result) {
                return { status: 200, body: { message: 'Asistente eliminado' } };
            } else {
                return { status: 404, body: { message: 'Asistente no encontrado' } };
            }
        } catch (error) {
            throw error;
        }
    }

    async getAttendeesByEventId(eventId) {
        try {
            const connection = await this.AttendeeRepository.connectdb();
            const result = await this.AttendeeRepository.getAttendeesByEventId(eventId);
            if (!result) {
                return { status: 404, body: { message: 'No existen asistentes registrados' } };
            }
            return { status: 200, body: result };
        } catch (error) {
            throw error;
        }
    }
}
module.exports = AttendeeRegisterUseCase;