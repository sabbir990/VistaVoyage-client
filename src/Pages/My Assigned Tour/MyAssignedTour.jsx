import React from 'react';
import Logo from '../../Components/Logo/Logo'; // Adjust the path according to your project structure
import MyAssignedTourTable from '../../Tables/MyAssignedTourTable';

export default function MyAssignedTour() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center mb-8">
                <Logo />
                <h1 className="text-3xl font-bold mt-4">My Assigned Tours</h1>
                <p className="text-gray-500 text-center mt-2">
                    View and manage the tours you are assigned to. Explore details and stay organized with your tasks.
                </p>
            </div>

            <div className="w-full max-w-4xl rounded-lg shadow-md">
                <MyAssignedTourTable />
            </div>
        </div>
    );
}
