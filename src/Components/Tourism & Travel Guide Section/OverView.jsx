import React from 'react'
import OverViewCard from './OverViewCard'
import informations from './OverviewInformations'

export default function OverView() {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
        {
            informations?.map((information, index) => {
                return <OverViewCard key={index} image={information?.image} heading={information?.heading} text={information?.text} />
            })
        }
    </div>
  )
}
