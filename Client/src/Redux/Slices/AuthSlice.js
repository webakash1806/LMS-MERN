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
        const res = axiosInstance.post('user/register', data)
        toast.promise(res, {
            loading: 'Creating Account',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to create account"
        })
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

// export const {} = authSlice.actions
export default authSlice.reducer