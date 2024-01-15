import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0
}

export const getStatsData = createAsyncThunk('/stats/get', async () => {
    try {
        const response = axiosInstance.get('/admin/stats')
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

const statSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            console.log(action)
            state.allUsersCount = action?.payload?.usersCount
            state.subscribedCount = action?.payload?.subscribedUser
        })
    }
})

export default statSlice.reducer