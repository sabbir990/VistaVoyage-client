import React from 'react';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import MyAssignedTourRows from '../Table Rows/MyAssignedTourRows';

export default function MyAssignedTourTable() {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth()

    const { data: myAssignedTours, isLoading, isPending } = useQuery({
        queryKey: ['myAssignedTours', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/my-assigned-tours/${user?.email}`);
            return data
        }
    })

    if (isLoading || isPending) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div className="container mx-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100 text-gray-600">
                    <tr>
                        <th className="py-3 px-6 text-left border-b border-gray-200">Title</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200">Place Image</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200">Tour Type</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200">Tour Duration</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200">User Email</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200">Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myAssignedTours?.map((tour, index) => {
                            return <MyAssignedTourRows tour={tour} key={index} />
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
