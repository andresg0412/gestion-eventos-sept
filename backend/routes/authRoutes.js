const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');


router.post('/register', registerValidators, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, register);


router.post('/login', loginValidators, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, login);


module.exports = router;
