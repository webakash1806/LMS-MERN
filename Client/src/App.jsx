import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth'
import AboutUs from './Pages/AboutUs'
import AccessDeniedPage from './Pages/AccessDeniedPage'
import ChangePassword from './Pages/ChangePassword'
import ContactPage from './Pages/ContactPage'
import AddLecture from './Pages/CourseLectures/AddLecture'
import Lectures from './Pages/CourseLectures/Lectures'
import UpdateLecture from './Pages/CourseLectures/UpdateLecture'
import CourseDetail from './Pages/CoursePage/CourseDetail'
import CourseList from './Pages/CoursePage/CourseList'
import CreateCourse from './Pages/CoursePage/CreateCourse'
import UpdateCourse from './Pages/CoursePage/UpdateCourse'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import EditProfile from './Pages/EditProfile'
import ForgotPassword from './Pages/ForgotPassword'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PageNotFound from './Pages/PageNotFound'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import CheckoutPage from './Pages/Payment/CheckoutPage'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import Profile from './Pages/Profile'
import ResetPassword from './Pages/ResetPassword'
import SignupPage from './Pages/SignupPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/zenstudy" element={<HomePage />} />
        <Route path="/zenstudy/about" element={<AboutUs />} />
        <Route path="/zenstudy/contact" element={<ContactPage />} />
        <Route path="/zenstudy/login" element={<LoginPage />} />
        <Route path="/zenstudy/register" element={<SignupPage />} />
        <Route path="/zenstudy/course" element={<CourseList />} />
        <Route path="/zenstudy/course/description" element={<CourseDetail />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/zenstudy/denied" element={<AccessDeniedPage />} />
        <Route path="/zenstudy/forgot-password" element={<ForgotPassword />} />
        <Route path="/zenstudy/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/zenstudy/course/create" element={<CreateCourse />} />
          <Route path="/zenstudy/course/lecture/add" element={<AddLecture />} />
          <Route path="/zenstudy/course/update" element={<UpdateCourse />} />
          <Route path="/zenstudy/course/lecture/update" element={<UpdateLecture />} />
          <Route path="/zenstudy/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/zenstudy/me" element={<Profile />} />
          <Route path="/zenstudy/profile/edit" element={<EditProfile />} />
          <Route path='/zenstudy/changePassword' element={<ChangePassword />} />
          <Route path="/zenstudy/checkout" element={<CheckoutPage />} />
          <Route path="/zenstudy/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/zenstudy/checkout/fail" element={<CheckoutFail />} />
          <Route path="/zenstudy/course/lectures" element={<Lectures />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
