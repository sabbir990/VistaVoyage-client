import React from 'react'

import tourTypes from './TourTypes'
import { Link } from 'react-router-dom'

export default function TypeCard() {
    return (
        <section className="p-6 bg-gray-100 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {tourTypes.map((tour, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <Link to={`/specified-typed-tour/${tour?.title}`}>
                            <img src={tour.image} alt={tour.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                                <p className="text-gray-600">{tour.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
