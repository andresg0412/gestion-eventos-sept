class EventController{
    constructor(EventServiceUseCase) {
        this.EventServiceUseCase = EventServiceUseCase;
    }

    async createEvent(req, res) {
        try {
            const { title, description, startDate, endDate, location, maxAttendees, createdBy } = req.body;

            if (!title || !description || !startDate || !endDate || !location || !maxAttendees || !createdBy) {
                throw { status: 400, body: { message: 'All fields are required' } };
            }

            const result = await this.EventServiceUseCase.createEvent({ title, description, startDate, endDate, location, maxAttendees, createdBy });
            res.status(result.status).json({ message: 'Event created successfully' });
            
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async getAllEvents(req, res) {
        try {
            const result = await this.EventServiceUseCase.getAllEvents();
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async getEventById(req, res) {
        try {
            const { id } = req.params;
            const result = await this.EventServiceUseCase.getEventById(id);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const { title, description, startDate, endDate, location, maxAttendees } = req.body;
            const result = await this.EventServiceUseCase.updateEvent({ id, title, description, startDate, endDate, location, maxAttendees });
            res.status(result.status).json({ message: 'Event updated successfully' });
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async deleteEvent(req, res) {
        try {
            const { id } = req.params;
            const result = await this.EventServiceUseCase.deleteEvent(id);
            res.status(result.status).json({ message: 'Event deleted successfully' });
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}
module.exports = EventController;