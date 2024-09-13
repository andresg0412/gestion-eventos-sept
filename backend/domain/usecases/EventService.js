class EventService {
    execute({ title, description, startDate, endDate, location, maxAttendees, createdBy }) {
        return Event.create({ title, description, startDate, endDate, location, maxAttendees, createdBy });
    }

}