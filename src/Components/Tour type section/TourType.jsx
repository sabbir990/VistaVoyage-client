import React from 'react'
import TypeCard from './TypeCard'

export default function TourType() {
    return (
        <div>
            <section className="tour-type-section">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Discover Your Perfect Journey
                </h2>
                <p className="text-lg text-center">
                    Explore a diverse range of tour types tailored to your travel dreams.
                    From serene getaways to adventurous escapes, find the ideal experience
                    to make your trip unforgettable.
                </p>
            </section>

            <TypeCard />
        </div>
    )
}
