class CreateEventUseCase {
    execute({ title, description, startDate, endDate, location, maxAttendees, createdBy }) {
        const event = new Event(title, description, startDate, endDate, location, maxAttendees, createdBy);
        return event;
    }
}