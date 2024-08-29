import React from 'react';
import { Link } from 'react-router-dom';

export default function WishlistRow({wishlistedPackage}) {
    const {title = '', tour_type = '', price = '', features = '', tour_duration = '', _id = ''} = wishlistedPackage || {}
    return (
        <tr className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tour_type}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {price}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {features?.slice(0, 20)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tour_duration}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                    to={`/wishlisted-package-details/${_id}`}
                    className="text-blue-600 hover:text-blue-900"
                >
                    View Details
                </Link>
            </td>
        </tr>
    );
}
