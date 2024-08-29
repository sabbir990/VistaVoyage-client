import React from 'react';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import TouristStoryCard from './TouristStoryCard';
import { Link } from 'react-router-dom';

export default function TouristStorySection() {
    const axiosCommon = useAxiosCommon();

    const { data: stories = [], refetch, isLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/stories');
            return data;
        }
    });

    return (
        <div className='mt-6'>
            <section className="text-center py-8">
                <h1 className="text-4xl font-bold mb-4">
                    Inspiring Tourist Stories
                </h1>
                <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto">
                    Discover the journeys of fellow travelers, as they share their unforgettable experiences from around the world. Let their stories inspire your next adventure.
                </p>
            </section>
            <div>
                {
                    isLoading ? <div className='flex items-center justify-center'>
                        <span className="loading loading-dots loading-lg"></span>
                    </div> : stories.length < 1 ? <p className='font-bold text-center'>No Stories Added Yet!!</p> : ""
                }
            </div>

            <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                {
                    stories.slice(0, 4).map((story, index) => {
                        return <TouristStoryCard key={index} story={story} refetch={refetch} />
                    })
                }
            </div>

            <div className="flex items-center justify-center mt-6">
                <Link to={'/all-stories'}>
                    <button className='btn btn-info hover:btn-outline'>View All Stories</button>
                </Link>
            </div>
        </div>
    );
}
