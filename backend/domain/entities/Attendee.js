class Attendee {
    constructor(id, name, userId, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.eventIds = [];
    }

    addEvent(eventId) {
        if (!this.eventIds.includes(eventId) && this.eventIds.length < 5) {
            this.eventIds.push(eventId);
            return true;
        }
        return false;
    }
}


module.exports = Attendee;