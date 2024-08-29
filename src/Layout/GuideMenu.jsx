import React from 'react'
import { NavLink } from 'react-router-dom'

export default function GuideMenu() {
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
                to="/dashboard/my-assigned-tour"
                className={({ isActive }) =>
                    isActive ? 'block py-2 px-4 bg-blue-500 text-white rounded-md' : 'block py-2 px-4 text-gray-700 hover:bg-blue-100 rounded-md'
                }
            >
                My Assigned Tour
            </NavLink>
        </nav>
    )
}
