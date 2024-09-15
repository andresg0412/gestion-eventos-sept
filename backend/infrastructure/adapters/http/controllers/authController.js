const { AuthUseCase } = require('../../../../domain/usecases/AuthUseCase');
const ValidationUtils = require('../../../../domain/utils/ValidationsUtils');

class AuthController {
    constructor(AuthUseCase) {
        this.AuthUseCase = AuthUseCase;
    }
    async login(req, res) {
        try {
            if (!req.body) {
                throw { status: 400, body: { message: 'Bad request' } };
            }
            
            const { email, password } = req.body;
            const fielsRequired = ['email', 'password'];

            const validation = await ValidationUtils.validateRequiredFields({ ...req.body }, fielsRequired);
            if (validation !== null) {
                throw { status: 400, body: { message: validation } };
            }

            const result = await this.AuthUseCase.loginUser({ email, password });
            res.status(200).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}
module.exports = AuthController;
