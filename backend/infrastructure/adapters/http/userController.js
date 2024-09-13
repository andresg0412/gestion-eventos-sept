const Controller = require('./controller');
const UserServiceUseCase = require('../../usecases/UserServiceUseCase');

class UserController extends Controller {
    constructor() {
        super({ service: UserServiceUseCase });
    }
}

module.exports = UserController;