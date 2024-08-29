import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import RequestToAdminModal from '../Modals/RequestForAdminModal';

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <nav className="space-y-2">
            <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                    isActive ? 'block py-2 px-4 bg-blue-500 text-white rounded-md' : 'block py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md'
                }
            >
                My Profile
            </NavLink>
            <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                    isActive ? 'block py-2 px-4 bg-blue-500 text-white rounded-md' : 'block py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md'
                }
            >
                My Bookings
            </NavLink>
            <NavLink
                to="/dashboard/my-wishlist"
                className={({ isActive }) =>
                    isActive ? 'block py-2 px-4 bg-blue-500 text-white rounded-md' : 'block py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md'
                }
            >
                My Wishlist
            </NavLink>
            <button
            onClick={() => setIsOpen(true)}
                className='btn btn-info btn-block text-white'
            >
                Request To Admin
            </button>

            <RequestToAdminModal isOpen={isOpen} closeModal={closeModal} />
        </nav>
    )
}
