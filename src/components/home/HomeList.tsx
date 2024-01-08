import {useRouter} from "next/router"
import withSuspense from "@shared/withSuspense";
import Flex from "@components/Flex"
import Text from "@components/Text"
import {css} from "@emotion/react"
import Skeleton from "@components/Skeleton";
import Image from "next/image";
import styled from "@emotion/styled";
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {colors} from "@styles/colorPalette";
import {SvgIcon} from '@mui/material';
import Spacing from "@components/Spacing";
import useHomes from "@components/home/hooks/useHomes";
import ListRow from "@components/ListRow";
import BgImg from "@assets/homeSample.jpg"

function HomeList() {
    const {data} = useHomes()
    const navigate = useRouter()

    return (
        <div css={homeListStyles}>
            <Flex justify="space-between" align="center">
                <Text typography="t6" bold={true}>우리 동네 단칸 후기</Text>
                <div>
                    <SvgIcon style={{color: colors.dankanGrayPoint, fontSize: 24}} component={ArrowRightIcon}
                             inheritViewBox/>
                </div>
            </Flex>
            <Spacing size={17}/>
            <ul>
                {data?.items.map((home, index) =>
                    <ListRow
                        key={home.id}
                        left={
                            <Image src={BgImg} css={imgStyles} alt=""/>
                        }
                        contents={
                            <ListRow.Text star={home.homeTotal} per={periodFormat(home.per)} indt={dateFormat(home.indt)}
                                          cntn={home.cntn}/>
                        }
                        right={null}
                        onClick={() => {
                            navigate.push(`/home/${home.id}`)
                        }}
                    />
                )}
            </ul>
        </div>
    )
}

export function dateFormat(strDate: String) {
    const today = new Date();

    let year = strDate.substring(0,4);
    let month = strDate.substring(4,6);
    let date = strDate.substring(6,8);
    let hour = strDate.substring(8,10);
    let minute = strDate.substring(10,12);
    console.log(strDate+": "+year+","+month+","+minute)
    const timeValue = new Date(Number(year), Number(month)-1, Number(date), Number(hour), Number(minute));

    const milliSeconds = today.getTime() - timeValue.getTime()
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;

    return `${Math.floor(years)}년 전`;
}

export function periodFormat(value: number) {
    const units = ['개월 거주', '년 거주'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 12 && unitIndex < units.length - 1) {
        unitIndex += 1;
        if (scaledValue === 12) {
            scaledValue /= 12;
        } else {
            scaledValue -= 11;
        }
    }
    return `${scaledValue} ${units[unitIndex]}`;
}

export function HomeListSkeleton() {
    return (
        <div css={homeListStyles}>
            <Flex justify="space-between" align="center">
                <Text typography="t6" bold={true}>우리 동네 단칸 후기</Text>
                <div>
                    <SvgIcon style={{color: colors.dankanGrayPoint, fontSize: 24}} component={ArrowRightIcon}
                             inheritViewBox/>
                </div>
            </Flex>
            <Spacing size={17}/>
            {[...new Array(3)].map((_, idx) => (
                <ListRow
                    key={idx}
                    contents={
                        <Skeleton width={328} height={120}/>
                    }
                />
            ))}
        </div>
    )
}


export default withSuspense(HomeList, {
    /*로딩중...*/
    fallback: <HomeListSkeleton/>
})

const homeListStyles = css`
  margin: 28px 24px 0px 24px;
`

const imgStyles = css`
  width: 84px;
  height: 74px;
  border-radius: 7%;
`