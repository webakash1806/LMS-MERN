import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    lectures: []
}

export const getCourseLectures = createAsyncThunk("/course/lectures", async (courseId) => {
    try {
        const response = axiosInstance.get(`/course/${courseId}`)
        toast.promise(response, {
            loading: "Loading lectures",
            success: "Lectures loaded successfully",
            error: "Failed to load the lectures"
        })

        return (await response).data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const addCourseLectures = createAsyncThunk("/course/create/lectures", async (data) => {
    try {
        console.log(data[1])
        const response = axiosInstance.post(`/course/create/lectures/${data[0]}`, data[1])
        toast.promise(response, {
            loading: "Adding lecture",
            success: "Lectures added successfully",
            error: "Failed to add the lectures"
        })

        return (await response).data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateCourseLecture = createAsyncThunk("/course/update/lectures", async (data) => {
    try {
        const response = axiosInstance.put(`/course/update/lectures/${data[0]}/${data[1]}`, data[2])
        toast.promise(response, {
            loading: "Updating lecture",
            success: "Lectures updated successfully",
            error: "Failed to update the lectures"
        })

        return (await response).data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const deleteCourseLecture = createAsyncThunk("/course/remove/lectures", async (data) => {
    try {
        const response = axiosInstance.delete(`/course/remove/lectures/${data[0]}/${data[1]}`, data[2])
        toast.promise(response, {
            loading: "Removing lecture",
            success: "Lectures removed successfully",
            error: "Failed to remove the lectures"
        })

        return (await response).data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.lectures
            })
            .addCase(addCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.course?.lectures
            })
            .addCase(updateCourseLecture.fulfilled, (state, action) => {
                state.lectures = action?.payload?.course?.lectures
            })
    }
})

export default lectureSlice.reducer