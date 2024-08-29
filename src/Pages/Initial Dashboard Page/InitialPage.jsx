import React from 'react';
import Logo from '../../Components/Logo/Logo';

const InitialPage = () => {
    return (
        <div className="flex h-screen text-center">
            <main className="flex-1 p-8">
                <div className='my-4 flex items-center justify-center'>
                    <Logo />
                </div>
                <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
                <p className="text-lg text-gray-700 mb-4">
                    Use the sidebar to navigate to different sections of the website.
                    Click on any of the links to access the various features and pages available to you.
                </p>
            </main>
        </div>
    );
};

export default InitialPage;
