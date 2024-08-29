import React from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import OurPackagesCard from '../../Components/Tourism & Travel Guide Section/OurPackagesCard';

export default function AllPackages() {
    const axiosCommon = useAxiosCommon();
    const { data: packages = [], refetch, isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/packages');
            return data;
        }
    })

    if (isLoading) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    
    return (
        <div>
            <div className="text-center my-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Exclusive Travel Packages</h1>
                <p className="text-lg text-gray-600">Find your perfect getaway with our carefully curated selection of trips and adventures. There's something for every traveler!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    packages?.map((singlePackage, index) => (
                        <OurPackagesCard
                            key={index}
                            singlePackage={singlePackage}
                        />
                    ))
                }
            </div>
        </div>
    )
}
