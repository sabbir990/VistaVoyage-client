import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaMapSigns, FaClock } from 'react-icons/fa';

export default function WishlistedPackageDetails() {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: packageDetails, refetch, isLoading } = useQuery({
        queryKey: ['packageDetails', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/wishlisted-package-details/${id}`);
            return data;
        }
    });

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

                <div className="mt-6">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
                        <Link to={`/wishlisted-checkout/${id}`}>
                            Book Now
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
