import { schema, model, Schema } from 'mongoose'

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    userName: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: [true, 'Name is Required'],
        minLength: [5, 'Name must be more than 5 character'],
        maxLength: [30, 'Name should not be more than 30 character'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is *'],
        trim: true,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is *'],
        trim: true,
        select: false
    },
    avatar: {
        publicId: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,

}, { timestamps: true })

export default userSchema