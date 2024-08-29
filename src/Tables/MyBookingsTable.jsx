import React from 'react';
import MyBookingRows from '../Table Rows/MyBookingRows';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';

export default function MyBookingsTable() {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: payments = [], isLoading, isPending } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/my-payments/${user?.email}`);
            return data
        }
    })

    if (isPending) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div className="container mx-auto">

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">Image</th>
                        <th className="py-2 px-4">Tour Type</th>
                        <th className="py-2 px-4">Tour Duration</th>
                        <th className="py-2 px-4">Transaction ID</th>
                        <th className="py-2 px-4">Guide</th>
                        <th className="py-2 px-4">Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments?.map((payment, index) => {
                            return <MyBookingRows payment={payment} key={index} />
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
