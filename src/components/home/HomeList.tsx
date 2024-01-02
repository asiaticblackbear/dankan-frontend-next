import {useRouter} from "next/router"
import withSuspense from "@shared/withSuspense";
import Link from "next/link";
import Flex from "@components/Flex"
import Text from "@components/Text"
import {css} from "@emotion/react"
import Skeleton from "@components/Skeleton";
import Image from "next/image";
import styled from "@emotion/styled";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {colors} from "@styles/colorPalette";
import {SvgIcon} from '@mui/material';
import Spacing from "@components/Spacing";
import useHomes from "@components/home/hooks/useHomes";
import ListRow from "@components/ListRow";

function HomeList() {
    const {data} = useHomes()
    const navigate = useRouter()

    return(
        <div css={homeListStyles}>
            <Flex justify="space-between" align="center">
                <Text typography="t6" bold={true}>우리 동네 단칸 후기</Text>
                <div>
                    <SvgIcon style={{ color: colors.dankanGrayPoint, fontSize: 24 }} component={KeyboardArrowRightIcon} inheritViewBox/>
                </div>
            </Flex>
            <Spacing size={17}/>
            <ul>
                {data?.items.map((home, index) =>
                    <ListRow
                        key={home.id}
                        contents={
                            <ListRow.Text title={`${index}위`} subTitle={home.name}/>
                        }
                        right={null}
                        onClick={()=>{
                            navigate.push(`/home/${home.id}`)
                        }}
                    />
                )}
            </ul>
        </div>
    )
}

export function HomeListSkeleton(){
    return(
        <div css={homeListStyles}>
            <Flex justify="space-between" align="center">
                <Text typography="t6" bold={true}>우리 동네 단칸 후기</Text>
                <div>
                    <SvgIcon style={{ color: colors.dankanGrayPoint, fontSize: 24 }} component={KeyboardArrowRightIcon} inheritViewBox/>
                </div>
            </Flex>
            <Spacing size={17}/>
            {[...new Array(3)].map((_, idx)=> (
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

const homeListStyles= css`
  margin: 28px 24px 0px 24px;
`