const User = require('../models/userModel');

exports.userCreateService = async (userInfo)=>{
    return User.create(userInfo);
}

exports.userFindByEmailService = async (email)=>{

    return User.findOne({email});

}

exports.userUpdateService = async (email, updateData)=>{
    return User.findOneAndUpdate({email}, {$set: updateData}, {new: true});
}


exports.userUpdateAfterVerifyEmailService = async (email)=>{
    return User.updateOne({email}, {$set: {verified: true, confirmationToken: ''}});
}
exports.updateTokenAndDateService = async (email, data)=>{
    return User.updateOne({email}, {$set: data});
}

exports.updatePasswordService = async (_id, hashedPassword) => {
    return User.updateOne({_id}, {$set: {
            password: hashedPassword,
            passwordChangedAt: new Date(),
            passwordResetToken: ""
        }});
}