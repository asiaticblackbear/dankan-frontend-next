import Flex from "@components/common/Flex";
import {Home} from "@models/home";
import Spacing from "@components/common/Spacing";
import Text from "@components/common/Text";
import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {Rating} from "@mui/material";
import Image from "next/image"
import {css} from "@emotion/react";
import BgImg from "@assets/homeSample.jpg";
import {dateFormat, periodFormat} from "@components/home/HomeList";
import React from 'react'
import Link from 'next/link'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface ListRowProps {
    home?: Home
    onClick?: () => void
}

const maskingName = (value?: string) => {
    if(value==null) return "비공개"
    if (value.length === 2) {
        return value.replace(/(?<=.{1})./gi, '*');
    } else if (value.length > 2) {
        return value.replace(/(?<=.{2})./gi, '*');
    } else if (value.length > 3) {
        return value.replace(/(?<=.{3})./gi, '*');
    } else {
        return value;
    }
};

function ListRow({home, onClick}: ListRowProps) {
    console.log("reload")
    const imgs = [home?.filePath1, home?.filePath2, home?.filePath3]
    console.log("ListRow", JSON.stringify(imgs))
    return (
        <div>
            {home ? (
                <Flex as="li" onClick={onClick}>
                    <Flex direction="column" css={formStyles}>
                        <Spacing size={2}/>
                        <Text typography="t9" color="dankanGrayTextPoint" bold={true}>{maskingName(home.inid)}</Text>
                        <Spacing size={7}/>
                        <Flex direction="row" align="center">
                            <StyledRating name="half-rating-read" defaultValue={home.homeTotal || 0} precision={0.1}
                                          size="small" readOnly/>
                            <Spacing direction="horizontal" size={13}/>
                            <Flex direction="row">
                                <Text typography="t10" color="dankanGray">{periodFormat(home.per || 0)}</Text>
                                <Spacing direction="horizontal" size={2}/>
                                <Text typography="t10" color="dankanGray" bold={true}>·</Text>
                                <Spacing direction="horizontal" size={2}/>
                                <Text typography="t10"
                                      color="dankanGray">{dateFormat(home.indt || "202401151800")}</Text>
                            </Flex>
                        </Flex>
                        <Spacing size={14}/>
                        <Flex direction="column">
                            <Text typography="t10" css={ellipsisStyles}>
                                {home.cntn} <Text typography="t10" color="dankanGrayText">{numberToGroup(home.homeG as string)}</Text>
                            </Text>

                        </Flex>

                        <Spacing size={16}/>
                        {<Swiper
                          style={{width: "100%", maxWidth:"390px"}}
                          spaceBetween={8}
                          centeredSlides={true}
                          height={170}
                          autoHeight={true}
                          slidesPerView={1}
                          pagination={{
                              type: 'fraction',
                              renderFraction: function (currentClass, totalClass) {
                                  return `<div style="width:42px;margin: 0 auto;background-color: rgba(0, 0, 0, 0.5);color: #fff;font-size: 11px;padding: 5px;border-radius: 5px; "><span class="${currentClass}"></span>` +
                                    `<span class="swiper-pagination-divider"> / </span>` +
                                    `<span class="${totalClass}"></span></div>`;
                              }, // fraction 아이템을 렌더링하는 함수
                          }}
                          modules={[Pagination]}
                        >
                            {imgs?.map((filePath, index) =>
                              filePath && (
                                <SwiperSlide key={index} >
                                    <div>
                                        {isVideoChecked(filePath)}
                                    </div>
                                </SwiperSlide>
                              )
                            )}
                        </Swiper>}

                        {/*{home.filePath1? isVideoChecked(home.filePath1): null}
                        {home.filePath2? isVideoChecked(home.filePath2): null}
                        {home.filePath3? isVideoChecked(home.filePath3): null}*/}
                        <Spacing size={14}/>
                        <Text typography="t9" color="dankanGray">{home.homeAddr}</Text>
                        <Spacing size={14}/>

                        <div css={lineSmall}/>
                    </Flex>
                </Flex>) : null}
        </div>
    )



    function numberToGroup(value: string){
        let group = "(기타)"
        if(value === "1") group = "(원룸)"
        else if(value === "2") group = "(투룸)"
        else if(value === "3") group = "(쓰리룸 이상)"
        else if(value === "4") group = "(복층)"
        return group
    }
}

function isVideoChecked(file: string){
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    let fileExtension = file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2); // 파일 확장자 추출
    let isVideoFile = videoExtensions.includes(`.${fileExtension.toLowerCase()}`);
    if (isVideoFile) {
        return (
          <video controls width="100%" height="170" css={imgStyles} >
              <source src={`${file}`} type={`video/${file.split('.').pop()}`} />
              Your browser does not support the video tag.
          </video>
        );
    } else {
        return (
          <Image src={file} css={imgStyles} alt="" width={340} height={170} layout="responsive" quality={100} style={{marginTop:"8px"}}/>
        );
    }
}

const ellipsisStyles = css`
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  display: -webkit-box;
  letter-spacing: 2px;
  line-height: 1.2;
`



const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: `${colors.dankanPrimary}`,
    },
    '& .MuiRating-iconHover': {
        color: `${colors.dankanSecondPrimary}`,
    },
});

const imgStyles = css`
  height: 180px;
    max-height: 280px;
  border-radius: 7px;
`

const formStyles = css`
  padding-top: 17px;
  width: 100%;
`
const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`
const lineMedium = css`
  border-top: 7px solid #F0F0F0;
`

const bannerStyles= css`
  height: 180px;
  padding:24px;
  border-radius: 8px;
  background-color: white;
`

const fractionStyles = css`
  /* fraction pagination 스타일 수정 */
  .swiper-pagination-fraction {
    background-color: rgba(0, 0, 0, 0.5); /* 투명 검은색 배경 */
    color: #fff; /* 흰색 글자 */
    font-size: 11px; /* 폰트 크기 11px */
    padding: 5px; /* 패딩 설정 */
    border-radius: 5px; /* 모서리를 둥글게 만듦 */
  }
`;


export default ListRow