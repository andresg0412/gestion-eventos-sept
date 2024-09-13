const UserRepository = require('../../domain/repositories/UserRepository');
const UserServiceUseCase = require('../../usecases/UserServiceUseCase');

class PresentationUserService {
    constructor() {
        this.UserRepository = new UserRepository();
        this.UserServiceUseCase = new UserServiceUseCase(this.UserRepository);
    }

    async createUser(username, email, password) {
        return this.UserServiceUseCase.createUser(username, email, password);
    }

    async updateUser(id, username, email, password) {
        return this.UserServiceUseCase.updateUser(id, username, email, password);
    }

    async deleteUser(id) {
        return this.UserServiceUseCase.deleteUser(id);
    }

    async getUserById(id) {
        return this.UserServiceUseCase.getUserById(id);
    }

    async getUserEvents(id) {
        return this.UserServiceUseCase.getUserEvents(id);
    }
}

module.exports = PresentationUserService;