import { auth } from '@/config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext()

const initialState = { isAuth: false, user: {} }

const AuthContext = ({ children }) => {

    const [state, setState] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setState({ isAuth: true, user })
            }
            setIsAppLoading(false)

        });

    }

    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            setState(initialState)
            window.toastify("Logout successfully", "success")
        })
        .catch((error) => {
            console.error(error)
            window.toastify("Please try again", "info")
        })
    }

    return (
        <Auth.Provider value={{ ...state, isAppLoading, handleLogout, dispatch: setState }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(Auth)