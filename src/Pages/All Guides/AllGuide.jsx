import React from 'react';
import Logo from '../../Components/Logo/Logo';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import GuidesProfileCard from '../../Components/Meet our guides/GuidesProfileCard';

export default function AllGuide() {
    const axiosCommon = useAxiosCommon();

    const { data: guides, isLoading } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/get-guides');
            return data;
        }
    })
    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-8">
                <Logo />
                <h1 className="text-4xl font-extrabold text-gray-800 mt-4">
                    Meet Our Guides
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Discover experienced guides ready to lead your next adventure.
                </p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    guides?.map((guide, index) => {
                        return <GuidesProfileCard guide={guide} />
                    })
                }
            </div>
        </div>
    );
}
