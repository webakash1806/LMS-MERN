import { configureStore } from '@reduxjs/toolkit'

import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice'
import LectureSlice from './Slices/LectureSlice'
import RazorpaySlice from './Slices/RazorpaySlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: RazorpaySlice,
        lecture: LectureSlice
    },
    devTools: true
})

export default store