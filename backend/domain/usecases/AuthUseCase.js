const { UserRepository } = require('../repositories/UserRepository');
const { JwtUtils } = require('../utils/JwtUtils');
const { PasswordUtils } = require('../utils/PasswordUtils');

class AuthUseCase {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async loginUser({ email, password }) {
        const user = await this.UserRepository.getUserByUseremail(email);
        if (!user) {
            throw { status: 401, body: { message: 'Credenciales incorrectas' } };
        }
        const passwordMatch = await PasswordUtils.comparePasswords(password, user.password_hash);
        if (!passwordMatch) {
            throw { status: 401, body: { message: 'Credenciales incorrectas' } };
        }
        const token = JwtUtils.generateToken({ id: user.id });
        return { token };
    }
}

module.exports = AuthUseCase;