class AttendeeRegisterUseCase {
    constructor(AttendeeRepository) {
        this.AttendeeRepository = AttendeeRepository;
    }

    async getAllAttendees () {
        try {
            const result = await this.AttendeeRepository.getAllAttendees();
            return { status: 200, body: result };
        } catch (error) {
            throw error;
        }
    }

    async registerAttendeeToEvent(attendee) {
        try {
            const { name, email, eventId, userId } = attendee;
            const result = await this.AttendeeRepository.getAttendeeByEmailAndEventId(email, eventId);

            if (result) {
                return { status: 409, body: 'Attendee already registered for this event' };
            } else {
                const newAttendee = await this.AttendeeRepository.registerAttendee(attendee);
                if (newAttendee) {
                    return { status: 201, body: 'Attendee registered successfully' };
                } else {
                    return { status: 500, body: 'Error registering attendee' };
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteAttendee(id) {
        try {
            const result = await this.AttendeeRepository.deleteAttendee(id);
            if (result) {
                return { status: 200, body: 'Attendee deleted successfully' };
            } else {
                return { status: 404, body: 'Attendee not found' };
            }
        } catch (error) {
            throw error;
        }
    }

    async getAttendeesByEventId(eventId) {
        try {
            const result = await this.AttendeeRepository.getAttendeesByEventId(eventId);
            return { status: 200, body: result };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AttendeeRegisterUseCase;