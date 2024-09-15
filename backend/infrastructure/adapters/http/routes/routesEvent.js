const express = require('express');
const router = express.Router();

const EventController = require('../../http/controllers/eventController');
const EventServiceUseCase = require('../../../../domain/usecases/EventServiceUseCase');
const EventRepository = require('../../../../domain/repositories/EventRepository');

const authenticateToken = require('../middlewares/authMiddleware');

const eventServiceUseCase = new EventServiceUseCase(new EventRepository());
const eventController = new EventController(eventServiceUseCase);


//RUTAS DE EVENTOS
router.post('/events', (req, res) => {
    eventController.createEvent(req, res);
});

router.get('/events', (req, res) => {
    eventController.getAllEvents(req, res);
});

router.get('/events/:id', (req, res) => {
    eventController.getEventById(req, res);
});

router.put('/events/:id', (req, res) => {
    eventController.updateEvent(req, res);
});

router.delete('/events/:id', (req, res) => {
    eventController.deleteEvent(req, res);
});

module.exports = router;