const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//funcion para registrar un usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    } else if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }
    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({ name, email, password:hashedPassword });
            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

//funcion para iniciar sesion
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credential' });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 3600000
        });
        res.json({ user: user.email });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}