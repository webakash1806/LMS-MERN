import { configureStore } from '@reduxjs/toolkit'

import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice'
import LectureSlice from './Slices/LectureSlice'
import RazorpaySlice from './Slices/RazorpaySlice'
import StatsSlice from './Slices/StatsSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: RazorpaySlice,
        lecture: LectureSlice,
        stats: StatsSlice
    },
    devTools: true
})

export default store