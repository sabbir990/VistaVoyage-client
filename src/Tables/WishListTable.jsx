import React from 'react';
import WishlistRow from '../Table Rows/WishlistRow';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';

export default function WishListTable() {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { data: wishlistedItems, isLoading } = useQuery({
        queryKey: ['wishlistedItems', user?.email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/all-wishlisted-items/${user?.email}`);
            return data;
        }
    });

    return (
        <div className="mt-6 max-w-full overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tour Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Features
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tour Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                        </th>
                    </tr>
                    {
                        isLoading && <div className='flex items-center justify-center'>
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    }
                </thead>
                <tbody>
                    {wishlistedItems?.map((wishlistedPackage, index) => (
                        <WishlistRow wishlistedPackage={wishlistedPackage} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
