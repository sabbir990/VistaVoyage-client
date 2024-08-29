import React from 'react';
import Logo from '../../Components/Logo/Logo';
import ManageUsersTable from '../../Tables/ManageUsersTable';

export default function ManageUsers() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-center mb-6">
                <Logo />
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Users</h1>
                <p className="text-lg text-gray-600">
                    View, edit, and manage all the users in the system efficiently.
                </p>
            </div>
            <div className="w-full max-w-4xl rounded-lg shadow-md">
                <ManageUsersTable />
            </div>
        </div>
    );
}
