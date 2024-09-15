class EventServiceUseCase {
    constructor(EventRepository) {
        this.EventRepository = EventRepository;
    }

    async createEvent({ title, description, startDate, endDate, location, maxAttendees, createdBy }) {
        try {
            const event = await this.EventRepository.createEvent({ title, description, startDate, endDate, location, maxAttendees, createdBy });
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al crear evento use case' } };
        }
    }

    async getAllEvents() {
        try {
            const events = await this.EventRepository.getAllEvents();
            return { status: 200, body: events };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener eventos use case' } };
        }
    }

    async getEventById(id) {
        try {
            const event = await this.EventRepository.getEventById(id);
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener evento use case' } };
        }
    }

    async updateEvent({ id, title, description, startDate, endDate, location, maxAttendees }) {
        try {
            const event = await this.EventRepository.updateEvent({ id, title, description, startDate, endDate, location, maxAttendees });
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al actualizar evento use case' } };
        }
    }

    async deleteEvent(id) {
        try {
            const event = await this.EventRepository.deleteEvent(id);
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al eliminar evento use case' } };
        }
    }
}
module.exports = EventServiceUseCase;