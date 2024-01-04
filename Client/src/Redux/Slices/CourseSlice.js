import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

console.log(initialState)

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        let res = axiosInstance.get("/course")
        toast.promise(res, {
            loading: "Loading Courses...",
            success: "Courses loaded successfully",
            error: "Something went wrong!"
        })
        res = (await res).data.course
        console.log(res)

        return res
    }
    catch (e) {
        toast.error(e?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(state)
                console.log(action.payload)
                state.courseData = [...action.payload]
            }
        })
    }
})


export default courseSlice.reducer