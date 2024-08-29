import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../Components/Logo/Logo'
import useAuth from '../../Hooks/useAuth'
import toast from 'react-hot-toast'
import { ImSpinner3 } from 'react-icons/im'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useMutation } from '@tanstack/react-query'

export default function Login() {
    const { login, loading, setLoading, googleLogin, gitHubLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon();

    const {mutateAsync} = useMutation({
        mutationFn : async(user) => {
            const {data} = await axiosCommon.put('/save-user', user);
            return data;
        }
    })

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true)

            await login(email, password);

            toast.success("User Login Successful!")

            if (location.state !== null) {
                navigate(location.state);
            } else {
                navigate('/')
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err);
            toast.err(err.message)
        }
    }

    const handleGoogleLogin = async() => {
        try{
            setLoading(true);

            const createdUserResponse = await googleLogin();

            const userData = {
                userInformations : createdUserResponse?.user,
                role : 'user'
            }

            await mutateAsync(userData);

            toast.success("Login Successful!!")

            if(location.state !== null){
                navigate(location.state)
            }else{
                navigate('/')
            }

            setLoading(false)

        }catch(error){
            setLoading(false)
            console.log(error);
            toast.error(error);
        }
    }

    const handleGitHubLogin = async() => {
        try{
            setLoading(true);
            
            const createdUserResponse = await gitHubLogin();

            const userData = {
                userInformations : createdUserResponse?.user,
                role : 'user'
            }

            await axiosCommon.put('/save-github-user', userData);

            toast.success('Login Successful!');

            if(location.state !== null){
                navigate(location.state)
            }else{
                navigate('/')
            }

            setLoading(false);
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
            <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>

            {/* Email and Password Form */}
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
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
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-500 flex justify-center items-center text-center text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    {
                        loading ? <ImSpinner3 className='animate-spin' /> : 'Login'
                    }
                </button>
            </form>

            <div className="text-center my-4 text-gray-600">OR</div>

            {/* Google and GitHub Login Buttons */}
            <div className="flex flex-col space-y-3">
                <button
                onClick={handleGoogleLogin}
                    className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
                >
                    <FaGoogle /> <span>Continue with Google</span>
                </button>
                <button
                onClick={handleGitHubLogin}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors"
                >
                    <FaGithub /> <span>Continue with GitHub</span>
                </button>
            </div>

            {/* Register Link */}
            <p className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    )
}
