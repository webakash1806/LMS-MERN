import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentsVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}


export const getRazorpayId = createAsyncThunk('/razorpay/key', async () => {
    try {
        const response = await axiosInstance.get('/payment/razorpay-key')
        return response.data
    } catch (e) {
        return toast.error("Failed to load!")
    }
})

export const purchaseCourse = createAsyncThunk('/razorpay/purchase-course', async () => {
    try {
        const response = await axiosInstance.post('/payment/subscribe')
        return response.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const verifyPayment = createAsyncThunk('/razorpay/purchase-verify', async (data) => {
    try {
        const response = await axiosInstance.post('/payment/verify-subscription', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            razorpay_subscription_id: data.razorpay_subscription_id
        })
        return response.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})


export const allPayment = createAsyncThunk('/razorpay/all-payment', async () => {
    try {
        const response = await axiosInstance.get('/payment?count=100')
        toast.promise(response, {
            loading: "Getting Payment Records",
            success: (data) => {
                return data?.data?.message
            },
            error: 'Failed to get payment records'
        })
        return (await response).data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})


export const unsubscribe = createAsyncThunk('/razorpay/unsubscribe', async () => {
    try {
        const response = await axiosInstance.post('/payment/unsubscribe')
        console.log(response)
        toast.promise(response, {
            loading: "Unsubscribing in process",
            success: (data) => {
                return data?.data?.message
            },
            error: 'Failed to unsubscribe'
        })
        return (await response).data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})


const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key
            })
            .addCase(purchaseCourse.fulfilled, (state, action) => {
                toast.success(action?.payload?.message)
                state.subscription_id = action?.payload?.subscription_id
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message)
                state.isPaymentsVerified = action?.payload?.success
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                toast.error(action?.payload?.message)
                state.isPaymentsVerified = action?.payload?.success
            })
            .addCase(allPayment.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments
                state.finalMonths = action?.payload?.finalMonths
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
            })
    }
})

export default razorpaySlice.reducer
