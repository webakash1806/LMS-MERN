import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { getRazorpayId, purchaseCourse, verifyPayment } from '../../Redux/Slices/RazorpaySlice'

const CheckoutPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const razorpayKey = useSelector((state) => state?.razorpay?.key)
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id)
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentsVerified)
    const userData = useSelector((state) => state?.auth?.data)
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }
    console.log(isPaymentVerified)
    const handleSubscription = async (e) => {
        e.preventDefault()
        console.log(razorpayKey)
        if (!razorpayKey || !subscription_id) {
            return toast.error("Something went wrong!")
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: 'LMS',
            theme: {
                color: "#F37254"
            },
            prefill: {
                email: userData.email,
                name: userData.fullName
            },
            description: "Subscription",
            handler: async (res) => {
                paymentDetails.razorpay_payment_id = res.razorpay_payment_id,
                    paymentDetails.razorpay_subscription_id = res.razorpay_subscription_id,
                    paymentDetails.razorpay_signature = res.razorpay_signature

                toast.success("Payment Successfull!")
                console.log(paymentDetails)
                const response = await dispatch(verifyPayment(paymentDetails))
                console.log(response)
                response?.payload?.success ? navigate('/LMS-Client/checkout/success') : navigate('/LMS-Client/checkout/fail')

            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    async function load() {
        await dispatch(getRazorpayId())
        await dispatch(purchaseCourse())
    }

    useEffect(() => {
        load()
    }, [])
    return (
        <HomeLayout>
            <form action="" onSubmit={handleSubscription}>
                <div>subscribe</div>

                <button type='submit' className='bg-yellow-800'>subscribe</button>
            </form>
        </HomeLayout>
    )
}

export default CheckoutPage
