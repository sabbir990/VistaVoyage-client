import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';

export default function MyProfile() {
    const { user, setUser, logOut, setLoading, loading, resetPassword } = useAuth();
    const { role, isLoading } = useRole();
    const navigate = useNavigate();

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-dots loading-lg"></span></div>;
    }

    const handleLogOut = async () => {
        try {
            setLoading(true)

            await logOut();

            setUser(null)

            navigate('/')

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.message)
        }
    }

    const handleResetPassword = async() => {
        try{
            setLoading(true);
            await resetPassword(user?.email)
            toast.success("We've sent an email to you. Check it out!");
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt={user?.displayName || "User Profile"}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-xl font-semibold">{user?.displayName || "Anonymous"}</h2>
                    <p className="text-gray-600 mb-2">{user?.email}</p>
                    <p className="text-gray-600 font-bold mb-4">Role: {role || "User"}</p>

                    <button
                        disabled={loading}
                        onClick={handleLogOut}
                        className="bg-red-500 text-white flex items-center justify-center py-2 px-4 rounded-lg mb-4 w-full hover:bg-red-600"
                    >
                        {
                            loading ? <ImSpinner3 className='animate-spin' /> : 'Logout'
                        }
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 w-full hover:bg-blue-600"
                    >
                        <NavLink to={'/dashboard/update-profile'}>
                            Update Profile
                        </NavLink>
                    </button>
                    <button
                    onClick={handleResetPassword}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            <div className="mt-6 w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                <p className="text-gray-600">Email Verified: {user?.emailVerified ? "Yes" : "No"}</p>
                <p className="text-gray-600">Account Created: {new Date(user?.metadata?.creationTime).toLocaleDateString()}</p>
                <p className="text-gray-600">Last Sign-In: {new Date(user?.metadata?.lastSignInTime).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
