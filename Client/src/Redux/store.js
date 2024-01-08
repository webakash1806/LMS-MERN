import { configureStore } from '@reduxjs/toolkit'

import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice'
import RazorpaySlice from './Slices/RazorpaySlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        payment: RazorpaySlice
    },
    devTools: true
})

export default store