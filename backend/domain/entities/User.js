class User{

    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.eventsCreated = [];
    }

    addEventCreated(eventId) {
        if (!this.eventsCreated.includes(eventId)) {
            this.eventsCreated.push(eventId);
            return true;
        }
        return false;
    }

    removeEventCreated(eventId) {
        const index = this.eventsCreated.indexOf(eventId);
        if (index !== -1) {
            this.eventsCreated.splice(index, 1);
            return true;
        }
        return false;
    }

    getEventsCreated() {
        return this.eventsCreated;
    }

    getEventsCreatedCount() {
        return this.eventsCreated.length;
    }

    setPassword(password) {
        this.password = password;
    }
}

module.exports = User;