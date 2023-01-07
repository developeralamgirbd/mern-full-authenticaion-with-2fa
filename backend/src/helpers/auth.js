const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

exports.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
}

exports.comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

exports.createToken = (user)=>{
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
}

exports.generateEmailVerifyToken = crypto.randomBytes(32).toString('hex');