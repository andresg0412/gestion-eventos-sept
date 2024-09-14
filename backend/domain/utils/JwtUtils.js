const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

class JwtUtils {

    static generateToken(user) {
        return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = JwtUtils;