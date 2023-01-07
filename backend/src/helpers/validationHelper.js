const validator = require("validator");
const {userFindByEmailService} = require("../services/userService");

class Validation{

    isEmpty = (value)=>{
        return !value
    }

    isEmailNotValid = (value) => {
        return !validator.isEmail(value)
    }

    isPasswordNotValid = (value) => {
        return !validator.isStrongPassword(value, {
            minLength: 8,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1
        })
    }

    isPasswordNotSame = (password, confirmPassword) => {
        return password !== confirmPassword
    }

    isUserExit = async (email) => {
        return await userFindByEmailService(email);
    }
}

module.exports = new Validation();