class UserServiceUseCase {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async getAllUsers() {
        try {
            const connection = await this.UserRepository.connectdb();
            const users = await this.UserRepository.getAllUsers();
            if (!users) {
                return { status: 404, body: { message: 'No se encontraron usuarios' } };
            }
            return { status: 200, body: users };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener usuarios use case' } };
        }
    }
    async createUser({ username, email, password }) {
        try {
            const connection = await this.UserRepository.connectdb();
            if (connection === null) {
                throw { status: 500, body: { message: 'Error al conectar a la base de datos' } };
            }
            const user = await this.UserRepository.createUser({ username, email, password });
            if (!user) {
                throw { status: 500, body: { message: 'Error al crear usuario' } };
            }
            return { status: 200, body: { message: 'Usuario creado con éxito'} };
        } catch (error) {
            throw { status: 500, body: { message: 'Error al crear usuario' } };
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