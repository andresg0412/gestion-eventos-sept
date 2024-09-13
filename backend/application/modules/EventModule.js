const EventService = require('../../usecases/EventServiceUseCase');
const EventController = require('../http/eventController');
const EventRepository = require('../../domain/repositories/EventRepository');

class EventModule {
    constructor(appModule) {
        this.appModule = appModule;
        this.EventService = null;
        this.EventController = null;
        this.EventRepository = null;
    }

    async start() {
        this.EventService = new EventService(this.EventRepository);
        this.EventController = new EventController(this.EventService);
        this.EventRepository = new EventRepository();

        const expressRouter = await this.appModule.getExpressRouter();
        expressRouter.use('/events', this.EventController.getRouter());
    }

    getDependencies() {
        return ['express'];
    }
}

module.exports = EventModule;