import React from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const TouristStoryCard = ({ story, refetch }) => {
    const axiosCommon = useAxiosCommon();

    const { mutateAsync } = useMutation({
        mutationFn: async (_id) => {
            const { data } = await axiosCommon.patch(`/liked/${_id}`);
            return data;
        },
        onSuccess: () => {
            if (refetch) {
                refetch();
            }
        }
    });

    const handleLike = async (_id) => {
        try {
            await mutateAsync(_id);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mb-6">
            <Link to={`/story-details/${story?._id}`}>
                <div className="flex lg:flex-row md:flex-row flex-col items-start mb-4">
                    <img
                        src={story?.profile_image}
                        alt={story?.person_name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">{story?.person_name}</h2>
                        <p className="text-gray-500">{story?.person_email}</p>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{story?.story}</p>
            </Link>
            <button
                onClick={() => handleLike(story?._id)}
                className="btn btn-outline flex items-center space-x-1"
            >
                <AiOutlineLike size={20} /> <span>Like {story?.likes}</span>
            </button>
        </div>
    );
};

export default TouristStoryCard;
