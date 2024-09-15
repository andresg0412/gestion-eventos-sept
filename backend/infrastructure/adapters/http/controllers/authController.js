const { AuthUseCase } = require('../../../../domain/usecases/AuthUseCase');


class AuthController {
    constructor(AuthUseCase) {
        this.AuthUseCase = AuthUseCase;
    }
    async login(req, res) {
        try {
            if (!req.body) {
                throw { status: 400, body: { message: 'Bad request' } };
            }
            if (!req.body.email || !req.body.password) {
                throw { status: 400, body: { message: 'Email y password son requeridos' } };
            }
            const { email, password } = req.body;
            const result = await this.AuthUseCase.loginUser({ email, password });
            res.status(200).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}
module.exports = AuthController;
