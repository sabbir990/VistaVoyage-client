import React from 'react'

export default function BannerItem({image, heading, text}) {
    const scrollToSection = () => {
        const section = document.getElementById('tourism-travel-guide');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative h-[600px] flex items-center justify-center text-center text-white bg-cover bg-center border rounded-lg" style={{ backgroundImage: `url(${image})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 p-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{heading}</h1>
                <p className="text-lg md:text-2xl mb-6">{text}</p>
                <button className="bg-yellow-500 text-black py-2 px-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition" onClick={scrollToSection}>Learn More</button>
            </div>
        </div>
    )
}
