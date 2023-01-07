const {Schema, model} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is unique'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password:{
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (value)=>{
                validator.isStrongPassword(value, {
                    minLength: 8,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    minLowercase: 1
                })
            }
        }
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required'],
        validator: {
            validator: function (value){
                return value === this.password
            },
            message: 'Password does not match'
        }
    },
    role: {
        type: String,
        enum: {
            values: ['super-admin', 'admin', 'user'],
            message: 'Only role value is {VALUE}'
        },
        default: 'user'
    },

    address: {
        type: String
    },
    photo: {
      type: String,
    },

    twoFA: {
        type: Boolean,
        default: false
    },
    otp: String,
    optVerified: {
      type: Boolean,
      default: false
    },
    optExpire: Date,

    confirmationToken: String,
    confirmationTokenExpire: Date,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,

    verified: {
        type: Boolean,
        default: false
    }

}, {timestamps:true, versionKey:false });


userSchema.pre('save', function (next){
    if (!this.isModified('password')){
        return next()
    }

    const password = this.password;
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(password, salt);
    this.confirmPassword = undefined;
    next()

})

userSchema.methods.generateConfirmationToken = function(){
    const token = crypto.randomBytes(32).toString('hex');

    this.confirmationToken = token;

    let date = new Date();
    date.setMinutes( date.getMinutes() + parseInt(process.env.CONFIRMATION_TOKEN_EXPIRE_TIME));
    this.confirmationTokenExpire = date;
    return token;
};

userSchema.methods.comparePassword = function(password, hash){
    return bcrypt.compareSync(password, hash);
}

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password);
}

const userModel = model('User', userSchema);

module.exports = userModel;