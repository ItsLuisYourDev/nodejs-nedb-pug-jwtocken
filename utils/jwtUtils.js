const jwt = require('jsonwebtoken');

const generateToken = (userId, isAdmin) => {
    return jwt.sign({ userId, isAdmin }, 'tu_secreto', { expiresIn: '1h' });
};

module.exports = { generateToken };
