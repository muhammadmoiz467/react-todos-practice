import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Todos from './Todos'
import DashboardTempory from './DashboardTesting'

const Dashboard = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='todos/*' element={<Todos />} />
                <Route path='dashboardTempory/*' element={<DashboardTempory />} />
            </Routes>

        </>
    )
}

export default Dashboard