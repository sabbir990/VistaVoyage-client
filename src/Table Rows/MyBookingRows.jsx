import React from 'react'

export default function MyBookingRows({payment}) {
    const {title = '', image_url = "", tour_type = '', tour_duration = '', transactionId = '', guide = '', paid = ''} = payment || {}
    return (
        <tr>
            <td className="py-2 px-4">{title}</td>
            <td className="py-2 px-4">
                <img
                    className="w-24 h-16 object-cover rounded-md"
                    src={image_url}
                    alt={title}
                />
            </td>
            <td className="py-2 px-4">{tour_type}</td>
            <td className="py-2 px-4">{tour_duration}</td>
            <td className="py-2 px-4">{transactionId}</td>
            <td className="py-2 px-4">{guide}</td>
            <td className="py-2 px-4">${paid}</td>
        </tr>
    )
}
