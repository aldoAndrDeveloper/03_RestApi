const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email:{
        type: String,
        require: [true,'Email is required'],
        trim: true,
        unique: [true,'email must be unique'],
        minLength:[5,'email must have 5 characters'],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'Password must be provided'],
        trim: true,
        select:false
    },
    verify:{
        type: Boolean,
        default:false
    },
    verificationCode:{
        type: String,
        select: false
    },
    verificationCodeValidation:{
        type: Number,
        select: false
    },
    forgotPasswordCode:{
        type: String,
        select: false
    },
    forgotPasswordCodeValidation:{
        type: Number,
        select: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model ('User', userSchema); // 'User' is what we are going to use in the ref section for next schemas