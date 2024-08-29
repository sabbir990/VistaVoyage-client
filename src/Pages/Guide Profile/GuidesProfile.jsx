import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosCommon from '../../Hooks/useAxiosCommon';

export default function GuidesProfile() {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: guideDetails, isLoading } = useQuery({
        queryKey: ['guideDetails'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/guide-details/${id}`);
            return data
        }
    })

    const {
        userInformations: { displayName = '', email = '', photoURL = '', emailVerified = false } = {},
        providerData = [],
        stsTokenManager: { lastLoginAt = '' } = {},
        role = '',
      } = guideDetails || {};
      
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
                {/* Guide Header */}
                <div className="bg-gray-200">
                    <img
                        className="w-full h-48 object-cover"
                        src={photoURL}
                        alt={displayName}
                    />
                </div>

                {/* Guide Info */}
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-800">{displayName}</h2>
                    <p className="text-gray-600">{email}</p>
                    {emailVerified && (
                        <p className="text-green-600 mt-2">Email Verified</p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center">
                        <span className="inline-block bg-blue-500 text-white text-sm font-semibold py-1 px-4 rounded-full">
                            {role}
                        </span>
                        <p className="text-gray-600 ml-4">Last Login: {new Date(lastLoginAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
