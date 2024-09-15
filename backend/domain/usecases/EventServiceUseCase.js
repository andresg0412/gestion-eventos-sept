class EventServiceUseCase {
    constructor(EventRepository) {
        this.EventRepository = EventRepository;
    }

    async createEvent({ title, description, startDate, endDate, location, maxAttendees, createdBy }) {
        try {
            const event = await this.EventRepository.createEvent({ title, description, startDate, endDate, location, maxAttendees, createdBy });
            if (!event) {
                return { status: 500, body: { message: 'Error al crear evento' } };
            }
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al crear evento' } };
        }
    }

    async getAllEvents() {
        try {
            const events = await this.EventRepository.getAllEvents();
            if (!events) {
                return { status: 404, body: { message: 'Eventos no encontrados' } };
            }
            return { status: 200, body: events };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener eventos' } };
        }
    }

    async getEventById(id) {
        try {
            const event = await this.EventRepository.getEventById(id);
            if (!event) {
                return { status: 404, body: { message: 'Evento no encontrado' } };
            }
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener evento' } };
        }
    }

    async updateEvent(id, eventData) {
        try {
            const allowedFields = ['title', 'description', 'startDate', 'endDate', 'location', 'maxAttendees'];
            const fieldsToUpdate = {};

            Object.keys(eventData).forEach(key => {
                if (allowedFields.includes(key)) {
                    fieldsToUpdate[key] = eventData[key];
                }
            });

            if (Object.keys(fieldsToUpdate).length === 0) {
                throw { status: 400, body: { message: 'No se proporcionaron campos válidos para actualizar' } };
            }

            const result = await this.EventRepository.updateEvent(id, fieldsToUpdate);
            return { status: 200, body: { message: 'Evento actualizado con éxito' } };
        } catch (error) {
            return { status: 500, body: { message: 'Error al actualizar evento use case' } };
        }
    }

    async deleteEvent(id) {
        try {
            const event = await this.EventRepository.deleteEvent(id);
            if (!event) {
                return { status: 404, body: { message: 'Evento no encontrado' } };
            }
            return { status: 200, body: event };
        } catch (error) {
            return { status: 500, body: { message: 'Error al eliminar evento use case' } };
        }
    }
}

module.exports = EventServiceUseCase;