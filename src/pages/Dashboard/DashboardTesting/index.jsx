import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashTesting from './DashTesting'

const DashboardTempory = () => {
  return (
    <Routes>
        <Route path='dashTesting' element={<DashTesting />} />
    </Routes>
  )
}

export default DashboardTempory