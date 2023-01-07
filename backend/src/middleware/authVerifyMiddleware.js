const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authVerifyMiddleware = async (req, res, next)=>{
    try {
        req.auth = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        next();
    }catch (error) {
        return res.status(401).json({error: error.message})
    }

}

exports.isSuperAdmin = async (req, res, next)=>{
    try {
        const user = await User.findById(req.auth?._id);

        if (user?.role !== 'super-admin'){
            return res.status(401).json({error: 'Unauthorized access'})
        }else {
            next()
        }

    }catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}