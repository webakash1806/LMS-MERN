import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BsArrowBarLeft, BsArrowLeft } from 'react-icons/bs'
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
                const response = await dispatch(verifyPayment(paymentDetails))
                response?.payload?.success ? navigate('/zenstudy/checkout/success') : navigate('/zenstudy/checkout/fail')
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
            <div className='flex items-center justify-center h-[90vh] '>
                <form action="" onSubmit={handleSubscription}
                    className='bg-gradient-to-t  overflow-x-hidden from-[#15191E]   to-[#13157df6] relative h-[24rem] pt-3 flex flex-col items-center justify-between text-white bg-[#0063f8aa] rounded-md shadow-md shadow-[#3646a0]'>
                    <div className='flex items-center w-fit justify-between  p-2 gap-3 pr-5 rounded-lg left-0 rounded-b-none text-[1.1rem]'>
                        <BsArrowLeft onClick={() => navigate(-1)} className='text-[#BEC1FC] cursor-pointer text-[1.3rem] absolute left-4' />
                        <h1 className='tracking-wide text-[1.2rem] font-semibold'>Subscribe</h1>
                    </div>
                    <div className='h-[19.5rem] bg-[#1A202A] mx-5 p-3 w-[15rem] flex flex-col items-center justify-around rounded-md rounded-b-none'>
                        <p className='text-center text-[0.92rem]'>This purchase will allow you to access of available courses will be also available</p>
                        <p className='text-[1.25rem] tracking-wide font-semibold'>	&#8377; 499</p>
                        <div className='text-center text-[0.8rem] tracking-wide text-slate-400'>
                            <p>100% refundable</p>
                            <p>*Terms and Condition applied</p>
                        </div>
                        <button type='submit' className='bg-[#FF6700] hover:bg-[#ff4d00] p-2 text-[1.1rem] capitalize rounded-md w-full font-semibold tracking-wide'>subscribe</button>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CheckoutPage
