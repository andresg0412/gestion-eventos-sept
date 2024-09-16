const ValidationsUtils = require('../../../../domain/utils/ValidationsUtils');
class UserController {
    constructor(UserServiceUseCase) {
        this.UserServiceUseCase = UserServiceUseCase;
    }
    async createUser(req, res) {
        try {
            const requiredFields = ['username', 'email', 'password'];
            const { username, email, password } = req.body;
            const validationResult = await ValidationsUtils.validateRequiredFields({ ...req.body }, requiredFields);

            if (validationResult !== null) {
                throw { status: 400, body: { message: validationResult } };
            }
            const result = await this.UserServiceUseCase.createUser({ username, email, password });
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async getAllUsers(req, res) {
        try {
            const result = await this.UserServiceUseCase.getAllUsers();
            res.status(result.status).json(result.body);
        } catch (error) {
            console.error('Error en getAllUsers:', error);
            res.status(500).json({ message: 'Error al obtener usuarios use controller' });
        }
    }
}

module.exports = UserController;