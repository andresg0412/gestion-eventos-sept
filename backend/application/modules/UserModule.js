const express = require('express');
const UserServiceUseCase = require('../../domain/usecases/UserServiceUseCase');
const UserController = require('../../infrastructure/adapters/http/userController');
const UserRepository = require('../../domain/repositories/UserRepository');
class UserModule{
    constructor() {
        this.UserServiceUseCase = null;
        this.UserController = null;
        this.UserRepository = null;
        this.expressRouter = null;
    }

    async start() {
        try {
            const server = express();
            this.expressRouter = server.use(express.json());

            this.UserRepository = new UserRepository();
            this.UserServiceUseCase = new UserServiceUseCase(this.UserRepository);
            this.UserController = new UserController(this.UserServiceUseCase);

            this.expressRouter.post('/users', (req, res) => {
                this.UserController.handleRequest(req, res);
            });
            console.log('Modulo User iniciado');
        } catch (error) {
            console.error(error);
            
        }
    }

    getDependencies() {
        return ['express'];
    }
}
module.exports = UserModule;