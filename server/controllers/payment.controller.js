import Payment from "../models/payment.model.js";
import User from "../models/user.models.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js"
import crypto from 'crypto'

const razorpayApiKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Razorpay API key",
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const subscription = async (req, res, next) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)

        if (!user) {
            return next(new AppError('Please Login', 400))
        }

        if (user.role === 'ADMIN') {
            return next(new AppError('Admin Cannot purchase subscription', 400))
        }

        // console.log(process.env.RAZORPAY_KEY_ID)
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID, // The unique plan ID
            customer_notify: 1,
            total_count: 12,
        });

        // Adding the ID and the status to the user account
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        // Saving the user object
        await user.save();


        res.status(200).json({
            success: true,
            message: "Subscribed successfully",
            subscription_id: subscription.id
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const verifySubscription = async (req, res, next) => {
    try {
        const { id } = req.user
        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body

        const user = await User.findById(id)

        if (!user) {
            return next(new AppError('Please Login', 400))
        }

        const subscriptionId = user.subscription.id

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex')



        if (generatedSignature !== razorpay_signature) {
            return next(new AppError('Payment Unsuccessfull! Please try again', 400))
        }

        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        await Payment.save()

        user.subscription.status = 'active'
        await user.save()

        res.status(200).json({
            success: true,
            message: "Verified successfully",
            subscription: user.subscription
        })

    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user

        const user = await User.findById(id)

        if (!user) {
            return next(new AppError('Please Login', 400))
        }

        if (user.role === 'ADMIN') {
            return next(new AppError('Admin Cannot cancel subscription', 400))
        }

        const subscriptionId = user.subscription.id


        const subscription = await razorpay.subscriptions.cancel({
            subscriptionId
        })

        console.log(subscription)

        user.subscription.status = subscription.status

        await user.save()

        res.status(200).json({
            success: true,
            message: "Subscription cancelled!"
        })

    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const allPayments = async (req, res, next) => {
    try {
        const { count } = req.query

        const subscription = await razorpay.subscriptions.all({
            count: count || 10,

        })
        res.status(200).json({
            success: true,
            message: "All payment",
            allData: subscription
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

export {
    razorpayApiKey,
    subscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
}