import React, { createContext, useEffect, useState } from 'react'
import auth from '../Firebase/Firebase.config';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const axiosCommon = useAxiosCommon();

    const createUser = async (email, password, role) => {
        try {
            setLoading(true);
            return createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            setLoading(false)
            console.log(err);
            toast.error(err.message)
        }
    }

    const updateUserProfile = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const gitHubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.log("Logged Out")
            }

            setLoading(false)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authObject = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        login,
        googleLogin,
        gitHubLogin,
        logOut,
        updateUserProfile,
        resetPassword
    }
    return (
        <AuthContext.Provider value={authObject}>
            {children}
        </AuthContext.Provider>
    )
}
