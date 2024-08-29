import React from 'react'
import AddedPackagesRow from '../Table Rows/AddedPackagesRow'
import useAxiosCommon from '../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';

export default function AddedPackagesTable() {
    const axiosCommon = useAxiosCommon();
    
    const {data : packages = [], refetch, isLoading} = useQuery({
        queryKey : ['packages'],
        queryFn : async() => {
            const {data} = await axiosCommon.get('/all-packages');
            return data;
        }
    })

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Tour Type</th>
                        <th className="py-2 px-4 text-left">Price</th>
                        <th className="py-2 px-4 text-left">Tour Duration</th>
                        <th className="py-2 px-4 text-left">Highlights</th>
                        <th className="py-2 px-4 text-left">Contact Information</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        packages?.map((singlePackage, index) => {
                            return <AddedPackagesRow singlePackage={singlePackage} key={index} isLoading={isLoading} refetch={refetch} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
