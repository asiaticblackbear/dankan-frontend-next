import useEventBanners from "./hooks/useEventBanners";
import withSuspense from "@shared/withSuspense";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import Link from "next/link";
import Flex from "@components/Flex"
import Text from "@components/Text"
import {css} from "@emotion/react"
import Skeleton from "@components/Skeleton";
import Image from "next/image";
import styled from "@emotion/styled";

function EventBanners() {
    const {data} = useEventBanners()
    console.log("data", data)
    return (
            <Swiper
                css={eventBannerStyles}
                spaceBetween={8}
                autoplay={{
                    delay: 1000,				//자동 시간
                    disableOnInteraction: false,//스와이프 후 자동재생
                }}
                loop={true}
                height={125}
                slidesPerView={1}
            >
                {data?.map((banner) => {
                    return (
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
                    );
                })}
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

const slideStyles= css`
  height: 125px;
`
const eventBannerStyles= css`
  margin: 11px 24px 0px 24px;
`

export default withSuspense(EventBanners, {
    /*로딩중...*/
    fallback: <Skeleton width="100%" height={125} style={{borderRadius: 8}}></Skeleton>
})