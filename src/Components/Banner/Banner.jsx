import React from 'react'
import bannerInfo from './bannerInfo'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import BannerItem from './BannerItem';

export default function Banner() {

    return (
        <div className='pb-6'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    bannerInfo?.map((info, index) => {
                        return <SwiperSlide key={index}>
                            <BannerItem image={info?.image} heading={info?.heading} text={info?.text} key={index} />
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}
