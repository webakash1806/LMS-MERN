import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth'
import AboutUs from './Pages/AboutUs'
import AccessDeniedPage from './Pages/AccessDeniedPage'
import CourseDetail from './Pages/CoursePage/CourseDetail'
import CourseList from './Pages/CoursePage/CourseList'
import CreateCourse from './Pages/CoursePage/CreateCourse'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PageNotFound from './Pages/PageNotFound'
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
        <Route path="/LMS-Client/contact" element={<AccessDeniedPage />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/LMS-Client/course/create" element={<CreateCourse />} />
        </Route>

        <Route path="/LMS-Client/me" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
