import React from 'react';
import Logo from '../../Components/Logo/Logo';
import MyBookingsTable from '../../Tables/MyBookingsTable';

export default function MyBookings() {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <Logo />
                <h1 className="text-3xl font-bold mt-4">My Bookings</h1>
                <p className="text-gray-600">Manage your travel plans and reservations with ease.</p>
            </div>

            <div className="w-full max-w-4xl rounded-lg shadow-md">
                <MyBookingsTable />
            </div>
        </div>
    );
}
