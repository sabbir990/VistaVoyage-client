import React from 'react';
import ManageUsersRow from '../Table Rows/ManageUsersRow';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxiosCommon from '../Hooks/useAxiosCommon';

export default function ManageUsersTable() {
    const axiosCommon = useAxiosCommon();
    const {user} = useAuth();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/all-users');
            return data;
        }
    })

    return (
        <div className="overflow-x-auto mt-6">
            <p className='text-gray-500 text-sm'>** Users who've logged in using their github account will never be able to show their email ( Github doesn't provide email ) </p>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">User ID</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Role</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                {
                    isLoading && <div className='flex items-center justify-center'>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                }
                <tbody>
                    {
                        users?.filter((information) => information?.userInformations?.email !== user?.email )?.map((user, isLoading, refetch, index) => {
                            return <ManageUsersRow key={index} user={user} isLoading={isLoading} refetch={refetch} />
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
