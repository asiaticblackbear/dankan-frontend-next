import useEventBanners from "./hooks/useEventBanners";
import withSuspense from "@shared/withSuspense";
import Link from "next/link";
import Flex from "@components/common/Flex"
import Text from "@components/common/Text"
import {css} from "@emotion/react"
import Skeleton from "@components/common/Skeleton";
import Image from "next/image";
import styled from "@emotion/styled";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import { useEffect, useState } from 'react'


function EventBanners() {
    const {data} = useEventBanners()
    const [swiper, setSwiper] = useState(null);
    /*useEffect(() => {
      const interval = setInterval(() => {
        if (swiper) {
          swiper.autoplay.start();
        }
      }, 3000); // 3초마다 자동 스크롤

      return () => clearInterval(interval);
    }, [swiper]);*/

    return (
            <Swiper
                spaceBetween={8}
                direction="horizontal"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction : false, }}
                /*centeredSlides={true}*/
                loop={true}
                height={125}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                modules={[Autoplay, Navigation]}
                onSwiper={(swiper)=>console.log("Swiper")}
            >
                {data?.map((banner) =>
                  (
                        <SwiperSlide key={banner.id} >
                            <div>
                            <Link href={banner.link}>
                                <Flex justify="space-between" align="center" css={bannerStyles}>
                                    <Flex direction="column">
                                        <Text typography="t3" bold={true}>{banner.title}</Text>
                                        <Text typography="t7">{banner.subTitle}</Text>
                                    </Flex>
                                    <Image src={banner.iconUrl} width={40} height={40} alt=""/>
                                </Flex>
                            </Link>
                            </div>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
    )
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: fit-content;
  padding: 16px;
  background-color: #eee !important;
  border-radius: 10px;
  cursor: grabbing;
  &::-webkit-scrollbar {
    display: none;
  }
  .swiper-slide {
    width: fit-content !important;
    background-color: transparent !important;
  }
`

const bannerStyles= css`
  height: 125px;
  padding:24px;
  border-radius: 8px;
  background-color: antiquewhite;
`

export default withSuspense(EventBanners, {
    /*로딩중...*/
    fallback: <Skeleton width="100%" height={125} style={{borderRadius: 8}}></Skeleton>
})