import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from '../../Helpers/axiosInstance.js'
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}

export const createAccount = createAsyncThunk('/user/register', async (data) => {
    try {
        let res = axiosInstance.post('user/register', data)
        toast.promise(res, {
            loading: 'Creating Account',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to create account"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const loginAccount = createAsyncThunk('/user/login', async (data) => {
    try {
        let res = axiosInstance.post('/user/login', data)
        toast.promise(res, {
            loading: 'Wait! Logging in',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to login"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAccount.fulfilled || createAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.user))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.user?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role
        })
    }
})

// export const {} = authSlice.actions
export default authSlice.reducer