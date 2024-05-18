import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth'
import AboutUs from './Pages/AboutUs'
import AccessDeniedPage from './Pages/AccessDeniedPage'
import ContactPage from './Pages/ContactPage'
import AddLecture from './Pages/CourseLectures/AddLecture'
import Lectures from './Pages/CourseLectures/Lectures'
import UpdateLecture from './Pages/CourseLectures/UpdateLecture'
import CourseDetail from './Pages/CoursePage/CourseDetail'
import CourseList from './Pages/CoursePage/CourseList'
import CreateCourse from './Pages/CoursePage/CreateCourse'
import UpdateCourse from './Pages/CoursePage/UpdateCourse'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import HomePage from './Pages/HomePage'
import PageNotFound from './Pages/PageNotFound'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import CheckoutPage from './Pages/Payment/CheckoutPage'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import ChangePassword from './Pages/UserAuth/ChangePassword'
import EditProfile from './Pages/UserAuth/EditProfile'
import ForgotPassword from './Pages/UserAuth/ForgotPassword'
import LoginPage from './Pages/UserAuth/LoginPage'
import Profile from './Pages/UserAuth/Profile'
import ResetPassword from './Pages/UserAuth/ResetPassword'
import SignupPage from './Pages/UserAuth/SignupPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/course" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDetail />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/denied" element={<AccessDeniedPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/lecture/add" element={<AddLecture />} />
          <Route path="/course/update" element={<UpdateCourse />} />
          <Route path="/course/lecture/update" element={<UpdateLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/me" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/course/lectures" element={<Lectures />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
