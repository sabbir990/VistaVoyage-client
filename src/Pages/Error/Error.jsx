import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</h2>
                <p className="text-gray-500 text-center mt-2">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Go Back Home
                </Link>
            </div>

            <div className="mt-8">
                <img 
                    src="https://i.ibb.co/QdF6R9F/404-illustration.png" 
                    alt="Error Illustration" 
                    className="w-full max-w-md mx-auto"
                />
            </div>
        </div>
    );
}
