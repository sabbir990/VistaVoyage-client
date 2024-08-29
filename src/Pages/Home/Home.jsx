import React from 'react'
import Banner from '../../Components/Banner/Banner'
import TourismTravelGuide from '../../Components/Tourism & Travel Guide Section/TourismTravelGuide'
import TourType from '../../Components/Tour type section/TourType'
import TouristStorySection from '../../Components/Tourist Story Section/TouristStorySection'

export default function Home() {
  return (
    <div>
        <Banner />
        <TourismTravelGuide />
        <TourType />
        <TouristStorySection />
    </div>
  )
}
