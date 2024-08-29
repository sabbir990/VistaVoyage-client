import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../Components/Logo/Logo'
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useHostImage from '../../Hooks/useHostImage';
import { ImSpinner3 } from "react-icons/im";
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';


export default function Register() {
    const {createUser, updateUserProfile, loading, setLoading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosCommon = useAxiosCommon();

    const {mutateAsync} = useMutation({
        mutationFn : async(user) => {
            const {data} = await axiosCommon.put('/save-user', user);
            return data;
        }
    })

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        const role = form.role.value;

        if(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password) === false){
            return toast.error("Your password must have at least 6 characters, 1 uppercase, 1 lowercase, 1 special character and 1 number input!")
        }

        try{
            setLoading(true)
            const image_url = await useHostImage(image);

            const createdUserResponse = await createUser(email, password, role);
            await updateUserProfile(name, image_url)

            const userData = {
                userInformations : createdUserResponse?.user,
                role
            }

            await mutateAsync(userData)

            toast.success('User Registration Successful!')

            if(location.state !== null){
                navigate(location.state)
            }else{
                navigate('/')
            }
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-16">
            <div className='flex items-center justify-center mb-4'>
                <Logo />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name='email'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name='password'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        name='image'
                        accept="image/*"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Role</label>
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                        name='role'
                    >
                        <option value="user">User</option>
                        <option value="guide">Guide</option>
                    </select>
                </div>

                <button
                disabled={loading}
                    type="submit"
                    className="w-full bg-blue-500 flex justify-center items-center text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                
                {
                    loading ? <ImSpinner3 className='animate-spin' /> : 'Register'
                }
                </button>
            </form>

            <p className="text-center mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    )
}
