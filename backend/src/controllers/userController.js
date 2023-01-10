const {isEmpty, isEmailNotValid, isPasswordNotValid, isPasswordNotSame, isUserExit} = require('../helpers/validationHelper');
const {
    userCreateService,
    userUpdateService,
    userUpdateAfterVerifyEmailService,
    updateTokenAndDateService,
    updatePasswordService,
} = require("../services/userService");
const {comparePassword, createToken, hashPassword, generateEmailVerifyToken} = require("../helpers/auth");
const User = require('../models/userModel');
const {upload} = require("../helpers/imageUploadHelper");
const multer = require("multer");
const {sendEmailVerifyMail, sendPasswordResetLinkMail} = require("../helpers/sendMail");

exports.register = async (req, res)=>{
    try {

        const {
            name,
            email,
            password,
            confirmPassword,
            address
        } = req.body;

        // Input field validation
        if (isEmpty(name)) return res.status(400).json({error: 'Name is required'});
        if (isEmpty(email)) return res.status(400).json({error: 'Email is required'});
        if (isEmailNotValid(email)) return res.status(400).json({error: 'Please provide a valid email address'});
        if (isEmpty(password)) return res.status(400).json({error: 'Password is required'});
        if (isPasswordNotValid(password)) return res.status(400).json({error: 'Password must be 8 character and contain at least one uppercase, one lowercase, one number and one special character'});
        if (isEmpty(confirmPassword)) return res.status(400).json({error: 'Confirm Password is required'});
        if (isPasswordNotSame(password, confirmPassword)) return res.status(400).json({error: "Password doesn't match"});
        // Check user is exits
        if (await isUserExit(email)) return res.status(400).json({emailError: 'Email already exits'});

        // if user is not exits than create a user
        const userInfo = {name, email, password, confirmPassword, address};
        const user = await userCreateService(userInfo);

        // Email confirmation token create
        const token = await user.generateConfirmationToken();
        await user.save({validateBeforeSave: false});
        const isSend = await sendEmailVerifyMail(email, token);

        // console.log(send)
        user.password = undefined;
        res.status(200).json({
            status: 'success',
            message: isSend && 'Successfully create account, Please verify your email',
            user
        })

    }catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

exports.emailVerify = async (req, res)=>{

    /**
     * 1. check account is exits under the request email
     * 2. check token is valid under the account
     */

    const email = req.params.email;
    const token = req.params.token;

    const user = await isUserExit(email);

    if (!user){
        return res.status(400).json({
            status: 'fail',
            error: 'User not found. create a account'
        })
    }
    const currentTime = new Date().getMinutes();
    const expireTime = user.confirmationTokenExpire.getMinutes();

    if(user.verified){
        return res.status(200).json({
            status: 'success',
            success: 'Email already verified',
        })
    }

    // Checked whether the request token is equal to the user confirmation Token
    if(token !== user.confirmationToken){
        return res.status(400).json({
            status: 'fail',
            error: 'invalid token',
        })
    }

    // Checked whether current time is greater than or equal to token expiration date
    if (currentTime >= expireTime){
        return res.status(400).json({
            status: 'fail',
            error: 'verification link expired',
        })
    }

    /*	If the steps above validation is true, I will
        user.verified = true,
        user.confirmationToken = ''
    */
    const verifyUser = await userUpdateAfterVerifyEmailService(email);
    if (verifyUser.verified){
        return res.status(200).json({
            status: 'success',
            success: 'Email already verified'
        })
    }
    res.status(200).json({
        status: 'success',
        success: 'Email verified successfully',
        verify: verifyUser.verified
    });
}


exports.resendEmail = async (req, res)=>{
    try {
        const email = req.params.email;
        if (isEmailNotValid(email)) {
            return res.status(400).json({
                status: 'fail',
                error: 'Please provide a valid email'
            });
        }

        const user = await isUserExit(email);
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        if (user.verified){
            return res.status(400).json({
                status: 'fail',
                error: 'Email already verified'
            });
        }

        const token = generateEmailVerifyToken;
        let date = new Date();
        date.setMinutes( date.getMinutes() + parseInt(process.env.CONFIRMATION_TOKEN_EXPIRE_TIME));

        const data = {
            confirmationToken: token,
            confirmationTokenExpire: date
        }

        await updateTokenAndDateService(user.email, data);

        await sendEmailVerifyMail(email, token);

        res.status(200).json({
            status: 'success',
            success: 'Verification link send'
        });

    }catch (err){
        res.status(500).json({
            status: 'fail',
            error: err.message
        });
    }

}

exports.login = async (req, res) => {

    try {
        const {email, password} = req.body;

        if (isEmpty(email)) return res.status(400).json({error: 'Email is required'});
        if (isEmpty(password)) return res.status(400).json({error: 'Password is required'});

        const user = await isUserExit(email);
        if (!user) return res.status(400).json({emailError: 'User not found'});

        if(!comparePassword(password, user.password)) return res.status(400).json({passwordError: 'Password incorrect'});

        if(!user.verified) return res.status(200).json({error: 'Email not verify, please verify your email'});

        user.password = undefined;

        const token = createToken(user);

        res.status(200).json({
            status: 'success',
            user,
            token
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

exports.profile = async (req, res) => {
    try {
        const user = await isUserExit(req.auth?.email);
        if (!user) return res.status(400).json({error: 'User not found'});

        user.password = undefined
        res.status(200).json({
            status: "success",
            user
        })

    }catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        upload(req, res, async (error)=>{

            const {name, address, oldPassword, password, confirmPassword} = req.body;

            if (isEmpty(name)) return res.status(400).json({error: 'Name is required'});
            if (isEmpty(password)) return res.status(400).json({error: 'Password is required'});
            if (isPasswordNotValid(password)) return res.status(400).json({error: 'Password must be 8 character and contain at least one uppercase, one lowercase, one number and one special character'});
            if (isEmpty(confirmPassword)) return res.status(400).json({error: 'ConfirmPassword is required'});
            if (isEmpty(oldPassword)) return res.status(400).json({error: 'Old password is required'});

            // login user email
            const email = req.auth?.email;
            // uploaded photo name
            const photo = req.file?.filename;
            // find password
            const user = await User.findOne({email}, {password: 1, _id: 0});
            if(!user) return res.status(400).json({error: 'User not found'});

            // compare between request oldPassword and login find password
            if(!comparePassword(oldPassword, user.password)) return res.status(200).json({error: 'Old password not match'});

            // compare between password and confirmPassword
            if (isPasswordNotSame(password, confirmPassword)) return res.status(200).json({error: 'Password not match2'});

            // create hash Password
            const hashedPassword = hashPassword(password);
            // update user data
            const updateData = {name, password: hashedPassword, address, photo};
            const updated = await userUpdateService(email, updateData);

            updated.password = undefined;

            // multer error handle
            if (error instanceof multer.MulterError){
                res.status(400).json({
                    status: "Fail",
                    error: error.message
                })
            }else if(error) {
                res.status(400).json({
                    status: "Fail",
                    error: error.message
                })
            }

            res.status(200).json({
                status: 'success',
                user: updated
            })

        })



    }catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }

}

exports.resetPassword = async (req, res)=>{
    try {
        const {email} = req.body;

        const user = await isUserExit(email);

        if (!user){
            return res.status(400).json({
                status: 'fail',
                emailError: 'User not found'
            })
        }

        const token = generateEmailVerifyToken;

        let date = new Date();
        date.setMinutes( date.getMinutes() + parseInt(process.env.CONFIRMATION_TOKEN_EXPIRE_TIME));
        const data = {
            passwordResetToken: token,
            passwordResetExpires: date
        }

        await updateTokenAndDateService(email, data);

        await sendPasswordResetLinkMail(email, token);

        res.status(200).json({
            status: 'success',
            message: 'Password reset link send'
        })

    }catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.resetPasswordResponse = async (req, res)=>{
    try {
        const email = req.params.email;
        const token = req.params.token;

        res.status(200).json({
            status: 'Success',
            email,
            token
        })

    }catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.newPasswordCreate = async (req, res)=>{
    try {
        const {email, token, password, confirmPassword} = req.body;

        const user = await isUserExit(email)

        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        if (isPasswordNotValid(password)) return res.status(400).json({ passwordError: "Password must be 8 character and contain at least one uppercase, one lowercase, one number and one special character"});

        if (isPasswordNotSame(password, confirmPassword)) return res.status(400).json({ passwordError: "Password doesn't match"});

        if (token !== user.passwordResetToken) return res.status(400).json({ error: 'Invalid token'});

        const currentTime = new Date();
        const expireTime = user.passwordResetExpire;

        // Checked whether current time is greater than or equal to token expiration date
        if (currentTime.getTime() >= expireTime) return res.status(400).json({ error: 'Token expired'})

        const hashedPassword = hashPassword(password);

        await updatePasswordService(user._id, hashedPassword);

        res.status(200).json({
            status: 'success',
            message: 'Password Reset successfully'
        });

    }catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}


