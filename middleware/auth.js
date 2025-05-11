const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {userId: decoded.userId};
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

exports.authorize = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};