const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

class JwtUtils {

    static async generateToken(user) {
        return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    }

    static async verifyToken(token) {
        try {
            const result = await jwt.verify(token, JWT_SECRET);
            return result
        } catch (err) {
            throw new Error('Invalid token');
        }
    }
}
module.exports = JwtUtils;