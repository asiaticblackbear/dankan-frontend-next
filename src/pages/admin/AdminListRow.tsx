import Flex from "@components/common/Flex"
import Text from "@components/common/Text"
import {ReactNode, useState} from "react";
import {css} from "@emotion/react";
import {Rating} from "@mui/material";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {Home} from "@models/home";
import {dateFormat, periodFormat} from "@components/home/HomeList";

interface ListRowProps {
    left?: ReactNode
    contents: ReactNode
    right?: ReactNode
    withArrow?: boolean
    onClick?: () => void
}

function ListRow({left, contents, right, withArrow, onClick}: ListRowProps) {
    return (
        <Flex as="li" css={listRowContainerStyles} onClick={onClick}>
            <Flex css={listRowLeftStyle}>{left}</Flex>
            <Flex css={listRowContentsStyles}>{contents}</Flex>
            <Flex>{right}</Flex>
        </Flex>
    )
}

function ListRowTexts({home}: { home:Home }) {
    return (
        <Flex direction="column">
            <Spacing size={8}/>
            <Flex direction="row" align="center">
                <Text typography="t6" color="dankanPrimary" bold={true}>
                {home.name}
            </Text>
            <Spacing direction="horizontal" size={8}/><StyledRating name="half-rating-read" defaultValue={home.homeTotal} precision={0.1} size="small" readOnly/>
            </Flex>
            <Spacing size={8}/>
            <Flex direction="row">
                <Text typography="t10">
                    {home.homeAddr}
                </Text>
                <Spacing direction="horizontal" size={8}/>
                <Text typography="t10" color="dankanGray">{numberToGroup(home.homeG ||"")}</Text>
                <Spacing direction="horizontal" size={2}/>
                <Text typography="t10" color="dankanGray">{periodFormat(home.per || 0)}</Text>
                <Spacing direction="horizontal" size={2}/>
                <Text typography="t10" color="dankanGray" bold={true}>·</Text>
                <Spacing direction="horizontal" size={2}/>
                <Text typography="t10" color="dankanGray">{dateFormat(home.indt || '202401151800')}</Text>
            </Flex>
            <Spacing size={8}/>
            <Text typography="t10" css={ellipsisStyles}>
                {home.cntn}
            </Text>
        </Flex>
    )
}
function numberToGroup(value: string){
    let group = "기타"
    if(value === "1") group = "원룸"
    else if(value === "2") group = "투룸"
    else if(value === "3") group = "쓰리룸 이상"
    else if(value === "4") group = "복층"
    return group
}
function IconArrowRight() {
    return (
        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"
             width={24}
             height={24}
        ><title/>
            <path
                d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
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
    border-bottom: 1px solid #F2F2F2;
`

const listRowLeftStyle = css`
    margin-right: 14px;
`

const listRowContentsStyles = css`
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
    letter-spacing: 2px;
    line-height: 1.2;
`

ListRow.Text = ListRowTexts
export default ListRow