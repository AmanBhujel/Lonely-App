const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

// ----Protection middleware to check the jwt token---------
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id)

            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed.' });
        }
    }
    if (!token) {
        res.status(201).json({ error: 'Not authorized, no token.' });
    }
};

module.exports = { protect };
