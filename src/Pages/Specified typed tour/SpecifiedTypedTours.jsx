import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import OurPackagesCard from '../../Components/Tourism & Travel Guide Section/OurPackagesCard';

export default function SpecifiedTypedTours() {
    const { type } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: toursByType = [], refetch, isLoading } = useQuery({
        queryKey: ['toursByType', type],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/tours-by-type/${type}`);
            return data;
        }
    })


    return (
        <div>
            <section className="text-center py-8">
                <h1 className="text-4xl font-bold mb-4">
                    Discover Your Ideal Tour Type
                </h1>
                <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto">
                    Choose from a variety of tours, each designed to provide unique and unforgettable experiences. Whether you seek adventure, relaxation, or cultural enrichment, we have the perfect option for you.
                </p>
            </section>

            <div className='mt-6'>
                {
                    isLoading && <div className='flex items-center justify-center'>
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                }


                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {
                        toursByType.length > 0 && toursByType?.map((tour, index) => {
                            return <OurPackagesCard key={index} singlePackage={tour} />
                        })
                    }
                </div>

                {
                    toursByType.length < 1 && <p className='font-bold text-center'>No Packages Found!</p>
                }
            </div>
        </div>
    )
}
