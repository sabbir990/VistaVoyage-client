import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import toast from 'react-hot-toast';

export default function StoryDetails() {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const { data: story, refetch, isLoading } = useQuery({
    queryKey: ['story', id],
    queryFn: async () => {
      const { data } = await axiosCommon(`/story/${id}`);
      return data;
    }
  })

  const {mutateAsync} = useMutation({
    mutationFn : async(_id) => {
      const {data} = await axiosCommon.patch(`/liked/${_id}`);
      return {data};
    },

    onSuccess : () => {
      refetch();
    }
  })

  const handleLike = async(_id) => {
    try{
      await mutateAsync(_id)
    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-start mb-4">
          <img
            src={story?.profile_image}
            alt={story?.person_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{story?.person_name}</h1>
            <p className="text-gray-500">{story?.person_email}</p>
            <p className="text-gray-500 mt-2">
              <FaCalendarAlt className="inline text-gray-600 mr-2" />
              {new Date(story?.tour_date).toLocaleDateString()}
            </p>
            <p className="text-gray-500 mt-1">
              <FaMapMarkerAlt className="inline text-gray-600 mr-2" />
              {story?.spot_name}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{story?.story}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleLike(story?._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none flex items-center"
          >
            <AiOutlineLike size={20} />
            <span className="ml-2">Like {story?.likes}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>
        <p className="text-gray-700 mb-4"><strong>Tour Length:</strong> {story?.tour_length} Days</p>
        <p className="text-gray-700"><strong>Story Date:</strong> {new Date(story?.tour_date).toLocaleDateString()}</p>
      </div>
    </div>
  )
}
