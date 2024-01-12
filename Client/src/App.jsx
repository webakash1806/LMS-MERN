import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth'
import AboutUs from './Pages/AboutUs'
import AccessDeniedPage from './Pages/AccessDeniedPage'
import AddLecture from './Pages/CourseLectures/AddLecture'
import Lectures from './Pages/CourseLectures/Lectures'
import UpdateLecture from './Pages/CourseLectures/UpdateLecture'
import CourseDetail from './Pages/CoursePage/CourseDetail'
import CourseList from './Pages/CoursePage/CourseList'
import CreateCourse from './Pages/CoursePage/CreateCourse'
import UpdateCourse from './Pages/CoursePage/UpdateCourse'
import EditProfile from './Pages/EditProfile'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PageNotFound from './Pages/PageNotFound'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import CheckoutPage from './Pages/Payment/CheckoutPage'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import Profile from './Pages/Profile'
import SignupPage from './Pages/SignupPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/LMS-Client" element={<HomePage />} />
        <Route path="/LMS-Client/about" element={<AboutUs />} />
        <Route path="/LMS-Client/login" element={<LoginPage />} />
        <Route path="/LMS-Client/register" element={<SignupPage />} />
        <Route path="/LMS-Client/course" element={<CourseList />} />
        <Route path="/LMS-Client/course/description" element={<CourseDetail />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/LMS-Client/denied" element={<AccessDeniedPage />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/LMS-Client/course/create" element={<CreateCourse />} />
          <Route path="/LMS-Client/course/lecture/add" element={<AddLecture />} />
          <Route path="/LMS-Client/course/update" element={<UpdateCourse />} />
          <Route path="/LMS-Client/course/lecture/update" element={<UpdateLecture />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/LMS-Client/me" element={<Profile />} />
          <Route path="/LMS-Client/profile/edit" element={<EditProfile />} />
          <Route path="/LMS-Client/checkout" element={<CheckoutPage />} />
          <Route path="/LMS-Client/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/LMS-Client/checkout/fail" element={<CheckoutFail />} />
          <Route path="/LMS-Client/course/lectures" element={<Lectures />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
