import React from 'react'

export default function MyAssignedTourRows({tour}) {
    const {title = '', image_url = '', tour_type = '', tour_duration = '', userEmail = '', paid = 0} = tour
    return (
        <tr>
            <td className="py-3 px-6 border-b border-gray-200">{title}</td>
            <td className="py-3 px-6 border-b border-gray-200">
                <img
                    className="w-32 h-20 object-cover rounded-md"
                    src={image_url}
                    alt={title}
                />
            </td>
            <td className="py-3 px-6 border-b border-gray-200">{tour_type}</td>
            <td className="py-3 px-6 border-b border-gray-200">{tour_duration}</td>
            <td className="py-3 px-6 border-b border-gray-200">{userEmail}</td>
            <td className="py-3 px-6 border-b border-gray-200">${paid}</td>
        </tr>
    )
}
