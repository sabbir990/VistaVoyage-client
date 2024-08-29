import React from 'react';
import { Link } from 'react-router-dom';

export default function GuidesProfileCard({ guide }) {
    const {
        userInformations: { displayName, email, photoURL },
        role, _id
    } = guide;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto">
            {/* Guide Image */}
            <div className="bg-gray-200 h-40">
                <img
                    className="h-full w-full object-cover"
                    src={photoURL}
                    alt={displayName}
                />
            </div>

            {/* Guide Info */}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
                <p className="text-gray-600">{email}</p>

                <div className="mt-4">
                    <span className="inline-block bg-blue-500 text-white text-sm font-semibold py-1 px-4 rounded-full">
                        {role}
                    </span>
                </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    <Link to={`/guide-profile/${_id}`}>
                        Details
                    </Link>
                </button>
            </div>
        </div>
    );
}
