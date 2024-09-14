const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const UserServiceUseCase = require('../../../../domain/usecases/UserServiceUseCase');
const UserRepository = require('../../../../domain/repositories/UserRepository');

const authenticateToken = require('../middlewares/authMiddleware');

const userServiceUseCase = new UserServiceUseCase(new UserRepository());
const userController = new UserController(userServiceUseCase);

//RUTAS DE USER
router.post('/users', (req, res) => {
    userController.handleRequest(req, res);
});
router.get('/users', (req, res) => {
    userController.getAllUsers(req, res);
});

module.exports = router