import { useRouter } from 'next/router'
import withSuspense from '@shared/withSuspense'
import Flex from '@components/common/Flex'
import Text from '@components/common/Text'
import { css } from '@emotion/react'
import Skeleton from '@components/common/Skeleton'
import Image from 'next/image'
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { colors } from '@styles/colorPalette'
import { SvgIcon } from '@mui/material'
import Spacing from '@components/common/Spacing'
import ListRow from '@components/common/ListRow'
import BgImg from '@assets/homeSample.jpg'
import { Home } from '@models/home'
import ErrorLocation from '@assets/errorLocation.svg'
import { getUserById } from '@remote/user'
import React, { useEffect, useState } from 'react'
import { getHomes, getMainHomes } from '@remote/home'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'

function HomeList() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [homeAddr, setHomeAddr] = useState('')

  useEffect(() => {
    console.log(data.length + 'what')
    let uid
    if (typeof window !== 'undefined') {
      uid = localStorage.getItem('uid')
      const userPoint = async () => {
        const user = await getUserById(uid!!)
        console.log('dasd' + JSON.stringify(user))
        if (user !== undefined) {
          setHomeAddr(user.homeZipCd)
          let addr = user.homeZipCd.split(' ')
          const list = await getMainHomes(addr[0] + ' ' + addr[1])
          console.log('gg' + JSON.stringify(list))
          setData(list)
        }
      }
      userPoint()
    }

  }, [])


  return (
    <div css={homeListStyles}>
      <Flex justify="space-between" align="center" onClick={() => {
        router.push({
          pathname: '/home/list',
          query: {
            homeZipCd: homeAddr,
          },
        }, '/home/list')
      }}>
        <Text typography="t6" bold={true}>우리 동네 단칸 후기</Text>
        <div>
          <SvgIcon style={{ color: colors.dankanGrayPoint, fontSize: 24 }} component={ArrowRightIcon}
                   inheritViewBox />
        </div>
      </Flex>
      <Spacing size={17} />
      <ul>
        {data?.length === 0 ? (
          <div css={emptyStyles}>
            <Spacing size={80} />
            <Flex direction="column" align="center">
              <ErrorLocation height="46px" width="46px" />
              <Spacing size={17} />
              <Text typography="t6" color="black" bold={true}>우리 동네 후기가 없네요</Text>
              <Spacing size={8} />
              <Text typography="t9" color={'dankanGrayText'}>다른 주변 정보로 검색해 보세요</Text>
            </Flex>
          </div>
        ) : null}
        {data?.length > 0 ?
          (data?.map((home: Home, index: number) =>
            <ListRow
              key={home.homeSer}
              left={
                isVideoChecked(home.filePath1 || '')
              }
              contents={
                <ListRow.Text star={home.homeTotal || 0} per={periodFormat(home.per || 0)}
                              indt={dateFormat(home.indt || '202401151800')} cntn={home.cntn || ''} />
              }
              right={null}
              onClick={() => {
                router.push(`/home/${home.homeSer}`)
              }}
            />,
          )) : null}
        {data?.length === 1 ? (<Spacing size={170} />) : null}
        {data?.length === 2 ? (<Spacing size={90} />) : null}
      </ul>
    </div>
  )
}

function isVideoChecked(file: string) {
  const videoExtensions = ['.mp4', '.webm', '.ogg']
  let fileExtension = file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2) // 파일 확장자 추출
  let isVideoFile = videoExtensions.includes(`.${fileExtension.toLowerCase()}`)
  if (isVideoFile) {
    return (
      <Flex css={videoStyles} align="center" justify="center">
        <SvgIcon style={{ color: colors.dankanPrimary, fontSize: 32 }} component={SmartDisplayIcon} inheritViewBox />
      </Flex>
    )
  } else {
    return (
      <Image src={file || BgImg} css={imgStyles} alt="" width={84} height={74} objectFit="contain" />
    )
  }
}

export function dateFormat(strDate: String) {
  const today = new Date()

  let year = strDate.substring(0, 4)
  let month = strDate.substring(4, 6)
  let date = strDate.substring(6, 8)
  let hour = strDate.substring(8, 10)
  let minute = strDate.substring(10, 12)
  console.log(strDate + ': ' + year + ',' + month + ',' + minute)
  const timeValue = new Date(Number(year), Number(month) - 1, Number(date), Number(hour), Number(minute))

  const milliSeconds = today.getTime() - timeValue.getTime()
  const seconds = milliSeconds / 1000
  if (seconds < 60) return `방금 전`
  const minutes = seconds / 60
  if (minutes < 60) return `${Math.floor(minutes)}분 전`
  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}시간 전`
  const days = hours / 24
  if (days < 7) return `${Math.floor(days)}일 전`
  const weeks = days / 7
  if (weeks < 5) return `${Math.floor(weeks)}주 전`
  const months = days / 30
  if (months < 12) return `${Math.floor(months)}개월 전`
  const years = days / 365

  return `${Math.floor(years)}년 전`
}

export function periodFormat(value: number) {
  const units = ['개월 거주', '년 거주']

  let unitIndex = 0
  let scaledValue = value

  while (scaledValue >= 12 && unitIndex < units.length - 1) {
    unitIndex += 1
    if (scaledValue === 12) {
      scaledValue /= 12
    } else {
      scaledValue -= 11
    }
  }
  return `${scaledValue} ${units[unitIndex]}`
}

export function HomeListSkeleton() {
  return (
    <div css={homeListStyles}>
      <Flex justify="space-between" align="center">
        <Text typography="t6" bold={true}>우리 동네 단칸 후기</Text>
        <div>
          <SvgIcon style={{ color: colors.dankanGrayPoint, fontSize: 24 }} component={ArrowRightIcon}
                   inheritViewBox />
        </div>
      </Flex>
      <Spacing size={17} />
      {[...new Array(3)].map((_, idx) => (
        <ListRow
          key={idx}
          contents={
            <Skeleton width={328} height={120} />
          }
        />
      ))}
    </div>
  )
}


export default withSuspense(HomeList, {
  /*로딩중...*/
  fallback: <HomeListSkeleton />,
})

const emptyStyles = css`
    
    margin: 0px 24px 0px 24px;
`


const homeListStyles = css`
    margin: 28px 24px 0px 24px;
`

const videoStyles = css`
    width: 84px;
    height: 74px;
    border-radius: 7%;
    background-color: #f5f5f5;   
`

const imgStyles = css`
    width: 84px;
    height: 74px;
    border-radius: 7%;
`