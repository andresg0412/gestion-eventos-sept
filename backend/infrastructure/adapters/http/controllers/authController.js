const { AuthUseCase } = require('../../../../domain/usecases/AuthUseCase');


class AuthController {
    constructor(AuthUseCase) {
        this.AuthUseCase = AuthUseCase;
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.AuthUseCase.loginUser({ email, password });
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}

module.exports = AuthController;