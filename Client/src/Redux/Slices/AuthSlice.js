import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from '../../Helpers/axiosInstance.js'
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
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

export const logout = createAsyncThunk('/user/logout', async () => {
    try {
        let res = axiosInstance.get('/user/logout')
        toast.promise(res, {
            loading: 'Wait! Logging out',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to logout"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const userProfile = createAsyncThunk('/user/details', async () => {
    try {
        const res = axiosInstance.get("/user/me")

        return (await res).data
    } catch (e) {
        toast.error(e?.message)
    }
})

export const editProfile = createAsyncThunk('user/update-profile', async (data) => {
    try {
        let res = axiosInstance.put(`user/update-profile/${data[0]}`, data[1])
        toast.promise(res, {
            loading: "Updating Profile!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update!"
        })
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
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.user))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.user?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role
        }).
            addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('role', action?.payload?.user?.role)
                state.isLoggedIn = true
                state.data = action?.payload?.user
                state.role = action?.payload?.user?.role
            }).addCase(logout.fulfilled, (state) => {
                localStorage.clear()
                state.data = {}
                state.isLoggedIn = false
                state.role = ""
            }).addCase(userProfile.fulfilled, (state, action) => {
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