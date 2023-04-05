const jwt = require('jsonwebtoken');

const { logger } = require('./logger');


JWT_SECRET_KEY= '0d597307518f707d0b429e10b63c8658b63ceaab8b4f76c92d5236358fb0c0f98e2a91554666565f485058a77cfb4ecc6ab0'

const generate = (id,name, role, privilege_level) => { 
    const token = jwt.sign({ id, name, role, privilege_level }, JWT_SECRET_KEY, { expiresIn: '1d'}); 
    return 'Bearer ' + token;
};

const decode = (token) => {
    try {
        /* Use this before method:  const token = req.headers.authorization.split(' ')[1]; */
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
} 