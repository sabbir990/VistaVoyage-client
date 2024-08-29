import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className='flex items-center justify-center'>
            {console.log("Hello")}
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if(user && !loading){
        return children;
    }
    
    return <Navigate to={'/login'} state={location.pathname} />
}
