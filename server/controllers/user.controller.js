import AppError from "../utils/error.utils"
import User from "../models/user.models"

const register = async (req, res, next) => {
    const { userName, fullName, email, password, confirmPassword } = req.body

    if (!userName || fullName || email || password || confirmPassword) {
        return next(new AppError('All Fields are required', 400))
    }

    const uniqueUser = await User.findOne({ userName })
    if (uniqueUser) {
        return next(new AppError('UserName already exists', 400))
    }

    const uniqueEmail = await User.findOne({ email })
    if (uniqueEmail) {
        return next(new AppError('Email is already registered', 400))
    }

    const user = await User.create({
        userName,
        fullName,
        email,
        password,
        confirmPassword,
        avatar: {
            publicId: null,
            secure_url: ''
        }
    })

    if (!user) {
        return next(new AppError('Registration Failed!', 400))
    }


    if (password === confirmPassword) {
        await user.save()
        user.password = undefined
        user.confirmPassword = undefined
        res.status(201).json({
            success: true,
            message: 'User registered Successfully'
        })
    }
    else {
        return next(new AppError('Password and Confirm Password must be same', 400))
    }

}

const login = (req, res) => {
    // login
}

const logout = (req, res) => {
    // logout
}

const profile = (req, res) => {
    // profile
}

export { register, login, logout, profile }