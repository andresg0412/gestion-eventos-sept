const EventServiceUseCase = require('../../domain/usecases/EventServiceUseCase');
const EventController = require('../../infrastructure/adapters/http/eventController');
const EventRepository = require('../../domain/repositories/EventRepository');
class EventModule {
    constructor() {
        this.EventServiceUseCase = null;
        this.EventController = null;
        this.EventRepository = null;
        this.expressRouter = null;
    }

    async start() {
        try {
            const express = require('express');
            this.expressRouter = express.Router();

            this.EventRepository = new EventRepository();
            this.EventServiceUseCase = new EventServiceUseCase(this.EventRepository);
            this.EventController = new EventController(this.EventService);

            this.expressRouter.post('/events', (req, res) => this.EventController.handleRequest(req, res));
            console.log('Modulo Event iniciado');
        } catch (error) {
            console.error(error);
        }
    }


    getDependencies() {
        return ['express'];
    }
}

module.exports = EventModule;