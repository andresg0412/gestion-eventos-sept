const { UserRepository } = require('../repositories/UserRepository');
const JwtUtils = require('../utils/JwtUtils');
const PasswordUtils = require('../utils/PasswordUtils');

class AuthUseCase {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async loginUser({ email, password }) {
        const connection = await this.UserRepository.connectdb();
        const user = await this.UserRepository.getUserByUseremail(email);
        if (!user) {
            throw { status: 401, body: { message: 'Credenciales incorrectas' } };
        }
        const passwordMatch = await PasswordUtils.comparePassword(password, user.password_hash);
        if (!passwordMatch) {
            throw { status: 401, body: { message: 'Credenciales incorrectas' } };
        }
        const token = await JwtUtils.generateToken({ id: user.id });
        return { status: 200, body: { 'token': token, 'message': 'Login exitoso' } };
    }
}
module.exports = AuthUseCase;
