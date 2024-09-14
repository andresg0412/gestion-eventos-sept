const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthUseCase = require('../../../../domain/usecases/AuthUseCase');
const UserRepository = require('../../../../domain/repositories/UserRepository');
const authenticateToken = require('../middlewares/authMiddleware');

const authUseCase = new AuthUseCase(new UserRepository);
const authController = new AuthController(authUseCase);

router.post('/login', (req, res) => {
    authController.login(req, res);
});

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});
module.exports = router;