const express = require('express');
const router = express.Router();

const AttendeeController = require('../controllers/attendeeController');
const AttendeeRegisterUseCase = require('../../../../domain/usecases/AttendeeRegisterUseCase');
const AttendeeRepository = require('../../../../domain/repositories/AttendeeRepository');

const authenticateToken = require('../middlewares/authMiddleware');

const attendeeRegisterUseCase = new AttendeeRegisterUseCase(new AttendeeRepository());
const attendeeController = new AttendeeController(attendeeRegisterUseCase);

//RUTAS DE ASISTENTES
router.post('/attendee', (req, res) => {
    attendeeController.registerAttendeeToEvent(req, res);
});

router.get('/attendees', (req, res) => {
    attendeeController.getAllAttendees(req, res);
});

router.delete('/attendee/:id', (req, res) => {
    attendeeController.deleteAttendee(req, res);
});

router.get('/attendees/:eventId', (req, res) => {
    attendeeController.getAttendeesByEventId(req, res);
});

module.exports = router;