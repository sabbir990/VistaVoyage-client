import React from 'react'
import OurPackagesCard from './OurPackagesCard'
import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { Link } from 'react-router-dom';

export default function OurPackages() {
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
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>

                {
                    packages?.slice(0, 3)?.map((singlePackage, index) => {
                        return <OurPackagesCard
                            key={index}
                            singlePackage={singlePackage}
                        />
                    })
                }

            </div>

            {
                packages.length > 3 && <div className='mt-6'>
                    <Link to={'/all-packages'}>
                        <button className='btn btn-warning hover:btn-outline'>View Our All Packages</button>
                    </Link>
                </div>
            }
        </div>
    )
}
