import React, { createContext, useEffect, useState } from 'react'
import LoadingSpinner from '../components/common/Spinner';
import { auth } from '../config/firebase/firebase'

export const AuthContext: any = createContext(null);
interface props {
    children?: React.ReactElement
}
const AuthProvider = ({ children }: props) => {
    const [user, setUser]: [any, any] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const unSubscribe = auth.onAuthStateChanged(user => {
            setUser(user);

            setLoading(false)
        })
        return unSubscribe;
    }, [])
    if (loading) return <LoadingSpinner />
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider;