import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    )
}
