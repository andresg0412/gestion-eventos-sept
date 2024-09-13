class UserServiceUseCase {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async getAllUsers() {
        try {
            const users = await this.UserRepository.getAllUsers();
            return { status: 200, body: users };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener usuarios use case' } };
        }
    }
    async createUser({ username, email, password }) {
        try {
            const user = await this.UserRepository.createUser({ username, email, password });
            return { status: 200, body: user };
        } catch (error) {
            return { status: 500, body: { message: 'Error al crear usuario use case' } };
        }
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

module.exports = UserServiceUseCase;