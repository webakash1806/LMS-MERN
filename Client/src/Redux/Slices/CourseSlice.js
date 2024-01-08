import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        let res = axiosInstance.get("/course")
        toast.promise(res, {
            loading: "Loading Courses...",
            success: "Courses loaded successfully",
            error: "Something went wrong!"
        })
        res = (await res).data.course
        return res
    }
    catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const createCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let res = axiosInstance.post("/course/create", data)
        toast.promise(res, {
            loading: "Adding Courses!",
            success: (data) => {
                return data?.data.message
            },
            error: "failed to create course"
        })

        return (await res).data
    }
    catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const deleteCourse = createAsyncThunk("/course/remove", async (data) => {
    try {
        let res = axiosInstance.delete(`/course/remove/${data}`)
        toast.promise(res, {
            loading: 'Wait! removing course',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to remove course"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = [...action.payload]
            }
        })
    }
})


export default courseSlice.reducer