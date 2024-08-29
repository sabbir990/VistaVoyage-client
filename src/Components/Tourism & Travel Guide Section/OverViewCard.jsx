import React from 'react'

export default function OverViewCard({image, heading, text}) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img
                className="w-full"
                src={image}
                alt="VistaVoyage"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{heading}</div>
                <p className="text-gray-700 text-base">
                    {text}
                </p>
            </div>
        </div>
    )
}
