class UserController {
    constructor(UserServiceUseCase) {
        this.UserServiceUseCase = UserServiceUseCase;
    }
    async createUser(req, res) {
        try {
            if (!req.body.username || !req.body.email || !req.body.password) {
                throw { status: 400, body: { message: 'Todos los campos son requeridos' } };
            }
            const { username, email, password } = req.body;
            const result = await this.UserServiceUseCase.createUser({ username, email, password });
            res.status(result.status).json({ message: 'Usuario creado con éxito' });
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