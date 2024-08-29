import React from 'react'
import { NavLink } from 'react-router-dom';
export default function AdminMenu() {
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
                to="/dashboard/add-package"
                className={({ isActive }) =>
                    isActive ? 'block py-2 px-4 bg-blue-500 text-white rounded-md' : 'block py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md'
                }
            >
                Add Package
            </NavLink>
            <NavLink
                to="/dashboard/manage-users"
                className={({ isActive }) =>
                    isActive ? 'block py-2 px-4 bg-blue-500 text-white rounded-md' : 'block py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md'
                }
            >
                Manage Users
            </NavLink>
        </nav>
    )
}
