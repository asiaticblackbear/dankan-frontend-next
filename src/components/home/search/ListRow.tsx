import Flex from "@components/common/Flex"
import Text from "@components/common/Text"
import {ReactNode} from "react";
import {css} from "@emotion/react";
import {Rating} from "@mui/material";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {Home} from "@models/home";

interface ListRowProps{
    left?: ReactNode
    contents: ReactNode
    right?: ReactNode
    withArrow?:boolean
    onClick?: () => void
}

function ListRow({left, contents, right, withArrow, onClick}: ListRowProps){
    return(
        <div>
            <Spacing size={12}/>
            <Flex as="li" css={listRowContainerStyles} onClick={onClick}>
                <Flex css={listRowLeftStyle}>{left}</Flex>
                <Flex css={listRowContentsStyles}>{contents}</Flex>
            </Flex>
            <Spacing size={12}/>
            <div css={lineSmall}></div>
        </div>
    )
}

function ListRowTexts({home, name, addr}: {home: Home, name: string, addr: string}){
    let star = home.homeTotal||0
    let count = home.per||1
    let value = (star / count)
    console.log(JSON.stringify(home))
    return (
        <Flex direction="column">
            <Spacing size={8}/>
            <Flex direction="column" align="left">
                <Text typography="t5" color="black" bold={true}>{name}</Text>
                <Spacing size={7}/>
                <Text typography="t9" color="dankanGrayTextPoint" >{addr}</Text>
            </Flex>
            <Spacing size={28}/>
            <Flex direction="row" align="center">
                <StyledRating name="half-rating-read" defaultValue={value} precision={0.1} size="small" readOnly />
                <Spacing direction="horizontal" size={4}/>
                <Text typography="t10" color="black">{value}</Text>
                <Spacing direction="horizontal" size={4}/>
                <Text typography="t10" color="dankanGray">({count})</Text>
            </Flex>

        </Flex>
    )
}

function IconArrowRight(){
    return(
        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"
             width={24}
             height={24}
        ><title/><path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
        </svg>
    )
}



const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: `${colors.dankanPrimary}`,
    },
    '& .MuiRating-iconHover': {
        color: `${colors.dankanSecondPrimary}`,
    },
});


const listRowContainerStyles = css`
  padding: 8px 0px;
`

const listRowLeftStyle= css`
  flex: 1;
  margin-right: 14px;
`

const listRowContentsStyles= css`
    flex: 1.8;
`

const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`

const ellipsisStyles = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing:2px;
  line-height : 1.2;
`

ListRow.Text = ListRowTexts
export default ListRow