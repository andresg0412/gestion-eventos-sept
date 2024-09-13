const Controller = require('./controller');
const EventServiceUseCase = require('../../../domain/usecases/EventServiceUseCase');

class EventController extends Controller {
    constructor() {
        super({ service: EventServiceUseCase });
    }
}

module.exports = EventController;