const ValidationsUtils = require('../../../../domain/utils/ValidationsUtils');
class AttendeeController {
    constructor(AttendeeServiceUseCase) {
        this.AttendeeServiceUseCase = AttendeeServiceUseCase;
    }

    async getAllAttendees(req, res) {
        try {
            const result = await this.AttendeeServiceUseCase.getAllAttendees();
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async registerAttendeeToEvent(req, res) {
        try {
            const { name, email, eventId, userId } = req.body;
            const requiredFields = ['name', 'email', 'eventId', 'userId'];

            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);

            if (validationResult !== null) {
                throw { status: 400, body: { message: validationResult } };
            }
            
            const result = await this.AttendeeServiceUseCase.registerAttendeeToEvent(req.body);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async deleteAttendee(req, res) {
        try {
            const result = await this.AttendeeServiceUseCase.deleteAttendee(req.params.id);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async getAttendeesByEventId(req, res) {
        try {
            const result = await this.AttendeeServiceUseCase.getAttendeesByEventId(req.params.eventId);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}
module.exports = AttendeeController