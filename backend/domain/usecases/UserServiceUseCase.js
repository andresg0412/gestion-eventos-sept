class UserServiceUseCase {
    createUser({ username, email, password }) {
        return User.create({ username, email, password });
    }

    updateUser({ id, username, email, password }) {
        return User.update({ id, username, email, password });
    }

    deleteUser(id) {
        return User.delete(id);
    }

    getUserById(id) {
        return User.getById(id);
    }

    getUserEvents(id) {
        return User.getEvents(id);
    }

}