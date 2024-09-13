class UserController {
    constructor(UserServiceUseCase) {
        this.UserServiceUseCase = UserServiceUseCase;
    }
    async handleRequest(req, res) {
        try {
            const { username, email, password } = req.body;
            const result = await this.UserServiceUseCase.createUser({ username, email, password });
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
    async getAllUsers(req, res) {
        try {
            const result = this.UserServiceUseCase.getAllUsers();
            //res.status(result.status).json(result.body);
            res.status(result.status).json(result.body);
        } catch (error) {
            console.error('Error en getAllUsers:', error);
            res.status(500).json({ message: 'Error al obtener usuarios use controller' });
        }
    }
}

module.exports = UserController;