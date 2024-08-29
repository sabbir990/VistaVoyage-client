import React from 'react';
import ContentTabs from './contentTabs';

const TourismTravelGuide = () => {
    return (
        <section className="py-16 text-center" id='tourism-travel-guide'>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
                    Explore the World with Our Expert Travel Guides
                </h1>
                <p className="text-lg md:text-2xl mb-8 text-gray-600">
                    Discover top destinations, hidden gems, and must-see attractions with our comprehensive travel guides. Your next adventure starts here.
                </p>
                <ContentTabs />
            </div>
        </section>
    );
}

export default TourismTravelGuide;
