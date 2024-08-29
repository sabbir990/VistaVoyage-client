import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link to="/">
            <h1 className='font-pacifico font-bold text-green-600 text-3xl'>VistaVoyage</h1>
        </Link>
    )
}
