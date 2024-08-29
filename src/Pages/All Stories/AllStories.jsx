import React, { useState } from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useQuery } from '@tanstack/react-query';
import TouristStoryCard from '../../Components/Tourist Story Section/TouristStoryCard';
import AddStoryModal from '../../Modals/AddStoryModal';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

export default function AllStories() {
    const axiosCommon = useAxiosCommon();
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();

    const closeModal = () => {
        setIsOpen(false)
    }

    const { data: stories = [], refetch, isLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const { data } = await axiosCommon.get("/stories");
            return data;
        }
    })

    return (
        <div>
            <div className="text-center my-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Discover Inspiring Stories
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore amazing experiences from travelers all over the world. Every story takes you on a unique journey filled with adventures, cultures, and unforgettable moments.
                </p>
            </div>
        <button className='btn btn-accent btn-block mb-6' onClick={() => {
            if(user){
                setIsOpen(true)
            }else{
                toast.error("You must login before posting a story")
            }

        }}>Add Your Story</button>

            <AddStoryModal isOpen={isOpen} refetch={refetch} closeModal={closeModal} />

            {
                isLoading && <div className='flex items-center justify-center'>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            }

            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6'>
                {
                    stories?.map((story, index) => {
                        return <TouristStoryCard key={index} story={story} refetch={refetch} />
                    })
                }
            </div>
        </div>
    )
}
