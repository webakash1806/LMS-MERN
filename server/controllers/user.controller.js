import User from "../models/user.models.js"
import AppError from "../utils/error.utils.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // httpOnly: true,
    // secure: true
}

const register = async (req, res, next) => {
    const { userName, fullName, email, password, confirmPassword } = req.body

    if (!userName || !fullName || !email || !password || !confirmPassword) {
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

    if (req.file) {
        console.log(req.file)
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            })
            if (result) {
                user.avatar.public_id = result.public_id
                user.avatar.secure_url = result.secure_url

                fs.rm(`uploads/${req.file.filename}`)
            }
        }
        catch (err) {
            return next(new AppError('File can not get uploaded', 500))
        }
    }

    const token = await user.generateJWTToken()

    res.cookie('token', token, cookieOption)

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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new AppError('Email and Password is required', 400))
        }

        const user = await User.findOne({
            email
        }).select('+password')

        if (!user || !user.comparePassword(password)) {
            return next(new AppError('Email or Password is wrong', 400))
        }

        const token = await user.generateJWTToken()
        user.password = undefined
        res.cookie('token', token, cookieOption)

        // if (token) {
        //     return next(new AppError('User already logged in, Please Logout', 400))
        // }

        console.log(token)

        res.status(200).json({
            success: true,
            message: 'Login Successfull!',
            user
        })

    }
    catch (err) {
        return next(new AppError(err.message, 500))
    }

}

const logout = (req, res) => {
    const token = ""
    const cookiesOption = { logoutAt: new Date(), httpOnly: true }

    try {
        res.cookie("token", token, cookiesOption)
        res.status(200).json({ success: true, message: "Logged out" })
    }
    catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

const profile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)

        res.status(200).json({
            success: true,
            message: "User Details",
            user
        })
    }
    catch (err) {
        return next(new AppError("Failed to fetch" + err.message, 500))
    }
}

export { register, login, logout, profile }