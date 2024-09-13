const UserServiceUseCase = require('../../usecases/UserServiceUseCase');
const UserController = require('../http/userController');
const UserRepository = require('../../domain/repositories/UserRepository');

class UserModule {
    constructor(appModule) {
        this.appModule = appModule;
        this.UserServiceUseCase = null;
        this.UserController = null;
        this.UserRepository = null;
    }

    async start() {
        this.UserServiceUseCase = new UserServiceUseCase(this.UserRepository);
        this.UserController = new UserController(this.UserServiceUseCase);
        this.UserRepository = new UserRepository();

        const expressRouter = await this.appModule.getExpressRouter();
        expressRouter.use('/users', this.UserController.getRouter());
    }

    getDependencies() {
        return ['express'];
    }
}

module.exports = UserModule;