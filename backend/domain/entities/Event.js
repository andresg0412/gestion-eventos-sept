class Event {
    constructor(id, title, description, startDate, endDate, location, maxAttendees, createdBy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.maxAttendees = maxAttendees;
        this.createdBy = createdBy;
        this.attendees = [];
    }

    addAttendee(attendeeId) {
        if (this.attendees.length < this.maxAttendees && !this.attendees.includes(attendeeId)) {
            this.attendees.push(attendeeId);
            return true;
        }
        return false;
    }


    removeAttendee(attendeeId) {
        const index = this.attendees.indexOf(attendeeId);
        if (index !== -1) {
            this.attendees.splice(index, 1);
            return true;
        }
        return false;
    }

    getAttendees() {
        return this.attendees;
    }

    getAttendeesCount() {
        return this.attendees.length;
    }

    isFull() {
        return this.attendees.length === this.maxAttendees;
    }
}

module.exports = Event;