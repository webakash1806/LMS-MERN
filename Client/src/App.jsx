import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/LMS-Client" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
