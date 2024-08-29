import React from 'react'
import useAuth from '../Hooks/useAuth'
import useRole from '../Hooks/useRole';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminRoute({children}) {
    const { user, loading, logOut } = useAuth();
    const { role, isLoading } = useRole();
    const navigate = useNavigate();
    const location = useLocation();

    if (loading || isLoading) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if(user && role === 'admin'){
        return children;
    }
    
    const logOutAndNavigate = async() => {
        try{
            await logOut();
            navigate('/login', {state : location.pathname})
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    return logOutAndNavigate()
}
