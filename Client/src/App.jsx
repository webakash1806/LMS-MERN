import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AboutUs from './Pages/AboutUs'
import HomePage from './Pages/HomePage'
import PageNotFound from './Pages/PageNotFound'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/LMS-Client" element={<HomePage />} />
        <Route path="/LMS-Client/about" element={<AboutUs />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
