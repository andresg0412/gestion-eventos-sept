class RegisterAttendeeUseCase {

    execute({ eventId, userId }) {
        return Event.findOne({ where: { id: eventId } }).then(event => {
            return event.addAttendee(userId);
        });
    }

}

module.exports = RegisterAttendeeUseCase