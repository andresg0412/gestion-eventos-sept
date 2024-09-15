const ValidationsUtils = require('../../../../domain/utils/ValidationsUtils');
class EventController{
    constructor(EventServiceUseCase) {
        this.EventServiceUseCase = EventServiceUseCase;
    }

    async createEvent(req, res) {
        try {
            const { title, description, startDate, endDate, location, maxAttendees, createdBy } = req.body;
            const requiredFields = ['title', 'description', 'startDate', 'endDate', 'location', 'maxAttendees', 'createdBy'];
            
            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);
            if (validationResult !== null) {
                throw { status: 400, body: { message: validationResult } };
            }

            const result = await this.EventServiceUseCase.createEvent({ title, description, startDate, endDate, location, maxAttendees, createdBy });
            res.status(result.status).json({ message: 'Evento creado con éxito' });
            
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
            if (!req.params.id) {
                throw { status: 400, body: { message: 'Se requiere el ID del evento' } };
            }
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
            const eventData = req.body;
            if (eventData === '') {
                throw { status: 400, body: { message: 'Se requiere al menos un dato para actualizar' } };
            }

            const result = await this.EventServiceUseCase.updateEvent(id, eventData);
            res.status(result.status).json({ message: 'Evento actualizado con éxito' });
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async deleteEvent(req, res) {
        try {
            const { id } = req.params;
            const result = await this.EventServiceUseCase.deleteEvent(id);
            res.status(result.status).json({ message: 'Evento eliminado' });
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}

module.exports = EventController;