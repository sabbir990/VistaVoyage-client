import React from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import GuidesProfileCard from './GuidesProfileCard';
import { Link } from 'react-router-dom';

export default function MeetOurGuidesSection() {
    const axiosCommon = useAxiosCommon();

    const { data: guides, isLoading } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/get-guides');
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
                    guides?.slice(0, 3)?.map((guide, index) => {
                        return <GuidesProfileCard guide={guide} key={index} />
                    })
                }
            </div>
            {
                guides.length > 3 && <div className='my-6 flex items-center justify-center'>
                    <button className='btn btn-warning'><Link to={`/all-guides`}>See All</Link></button>
                </div>
            }
        </div>
    )
}
