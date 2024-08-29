import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

export default function Root() {
  return (
    <div className='font-poppins'>
      <Navbar />
      <div className='px-6'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
