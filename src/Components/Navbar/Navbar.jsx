import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const {user, logOut, setLoading, setUser} = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()

    const handleLogOut = async() => {
        try{
            setLoading(true)
            await logOut();
            setUser(null)
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <nav className="relative bg-white shadow dark:bg-gray-800 pb-1">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Logo />
                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                aria-label="toggle menu"
                            >
                                {!isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 8h16M4 16h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
                            }`}
                    >
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <NavLink to={'/'}
                                className={`${location.pathname === '/' && 'text-white bg-gray-900 rounded-md px-4 py-2'}`}
                            >
                                Home
                            </NavLink>
                            {/* <NavLink to={'/community'}
                                href="#"
                                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Community
                            </NavLink>
                            <NavLink to={'/blogs'}
                                href="#"
                                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Blogs
                            </NavLink>
                            <NavLink to={'/about-us'}
                                href="#"
                                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                About Us
                            </NavLink> */}
                            {/* <NavLink to={'/contact-us'}
                                href="#"
                                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Contact us
                            </NavLink> */}
                            {
                                !user && <NavLink to={'/login'}
                                    href="#"
                                    className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Join Us
                                </NavLink>
                            }
                        </div>

                        {
                            user && <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu w-auto menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow">
                                <h3 className='font-bold text-lg text-center'>{user?.displayName}</h3>
                                <p className='text-center underline mb-2'>{user?.email}</p>
                                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                <li><button onClick={handleLogOut}>Logout</button></li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
