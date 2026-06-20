import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Todos from './Todos'
import DashboardTempory from './DashboardTesting'
// import Home from './Home/index'
import Home from './Home/index'

const Index = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='todos/*' element={<Todos />} />
                <Route path='dashboardTempory/*' element={<DashboardTempory />} />
                <Route path='*' element={<h1>Page Not Found!</h1>} />
            </Routes>

        </>
    )
}

export default Index
