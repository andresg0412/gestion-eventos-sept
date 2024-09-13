const EventRepository = require('../../domain/repositories/EventRepository');
const EventServiceUseCase = require('../../usecases/EventServiceUseCase');

class PresentationEventService {
    constructor() {
        this.EventRepository = new EventRepository();
        this.EventServiceUseCase = new EventServiceUseCase(this.EventRepository);
    }

    async createEvent(title, description, startDate, endDate, location, maxAttendees, createdBy) {
        return this.EventServiceUseCase.createEvent(title, description, startDate, endDate, location, maxAttendees, createdBy);
    }

    async updateEvent(id, title, description, startDate, endDate, location, maxAttendees) {
        return this.EventServiceUseCase.updateEvent(id, title, description, startDate, endDate, location, maxAttendees);
    }

    async deleteEvent(id) {
        return this.EventServiceUseCase.deleteEvent(id);
    }

    async getEventById(id) {
        return this.EventServiceUseCase.getEventById(id);
    }

    async getUserEvents(id) {
        return this.EventServiceUseCase.getUserEvents(id);
    }
}

module.exports = PresentationEventService;