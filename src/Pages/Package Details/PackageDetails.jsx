import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaMapSigns, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';

export default function PackageDetails() {
  const { user } = useAuth();
  const {role} = useRole();
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const { data: packageDetails, refetch, isLoading } = useQuery({
    queryKey: ['packageDetails', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/package-details/${id}`);
      return data;
    }
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (wishlistedPackage) => {
      const { data } = await axiosCommon.post('/wishlist-package', wishlistedPackage);
      return data
    },

    onSuccess: () => {
      toast.success("Package added to wishlist successfully!")
    }
  })

  const handleAddToWishlist = async () => {
    delete packageDetails?._id;

    const wishlistedPackage = {
      ...packageDetails, userEmail: user?.email
    }

    try {
      if (user) {
        if (role !== 'user') {
          return toast.error("You must be user before adding an item to wishlist!")
        }
        await mutateAsync(wishlistedPackage);
      } else {
        toast.error("You Must login before adding an item to wishlist")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <img
          src={packageDetails?.image_url}
          alt={packageDetails?.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-2">{packageDetails?.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{packageDetails?.sub_title}</p>

        <div className="flex items-center mb-4">
          <FaMapSigns className="text-gray-600 mr-2" />
          <span className="text-xl font-medium">{packageDetails?.tour_type}</span>
        </div>

        <div className="flex items-center mb-4">
          <FaClock className="text-gray-600 mr-2" />
          <span className="text-xl font-medium">{packageDetails?.tour_duration}</span>
        </div>

        <div className="flex items-center mb-6">
          <FaDollarSign className="text-gray-600 mr-2" />
          <span className="text-2xl font-semibold">{`$${packageDetails?.price}`}</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
          <ul className="list-disc list-inside text-gray-700">
            {packageDetails?.features}
          </ul>
        </div>

        <button className='btn btn-accent' onClick={handleAddToWishlist}>Add to Wishlist</button>

        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
            <Link to={`/checkout/${id}`}>
              Book Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
