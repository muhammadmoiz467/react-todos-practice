import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NoPage from '@/components/Misc/NoPage'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

const Auth = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<NoPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Auth