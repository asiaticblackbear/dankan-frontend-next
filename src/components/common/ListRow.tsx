import Flex from "./Flex"
import Text from "./Text"
import {ReactNode} from "react";
import {css} from "@emotion/react";
import {Rating} from "@mui/material";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";

interface ListRowProps{
    left?: ReactNode
    contents: ReactNode
    right?: ReactNode
    withArrow?:boolean
    onClick?: () => void
}

function ListRow({left, contents, right, withArrow, onClick}: ListRowProps){
    return(
        <Flex as="li" css={listRowContainerStyles} onClick={onClick}>
            <Flex css={listRowLeftStyle}>{left}</Flex>
            <Flex css={listRowContentsStyles}>{contents}</Flex>
            <Flex>{right}</Flex>
            {withArrow ? <IconArrowRight/> : null }
        </Flex>
    )
}

function ListRowTexts({star, per, indt, cntn}: {star: number, per: string, indt: string, cntn: string}){
    return (
        <Flex direction="column">
            <StyledRating name="half-rating-read" defaultValue={star} precision={0.1} size="small" readOnly />
            <Spacing size={7}/>
            <Flex direction="row">
                <Text typography="t10" color="dankanGray">{per}</Text>
                <Spacing direction="horizontal" size={2}/>
                <Text typography="t10" color="dankanGray" bold={true}>·</Text>
                <Spacing direction="horizontal" size={2}/>
                <Text typography="t10" color="dankanGray">{indt}</Text>
            </Flex>
            <Spacing size={7}/>
            <Text typography="t10" css={ellipsisStyles}>
                {cntn}
            </Text>
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
  margin-right: 14px;
`

const listRowContentsStyles= css`
    flex: 1;
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