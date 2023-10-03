import { schema, model, Schema } from 'mongoose'

const userSchema = new Schema({
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
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is *'],
        trim: true
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is *'],
        trim: true
    }

})

export default userSchema