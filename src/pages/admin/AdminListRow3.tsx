import Flex from "@components/common/Flex"
import Text from "@components/common/Text"
import {ReactNode} from "react";
import {css} from "@emotion/react";
import {Rating} from "@mui/material";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {Univ} from "@models/univ"

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

function ListRowTexts({obj}: { obj: Univ }) {
    return (
        <Flex direction="column">
            <Spacing direction="horizontal" size={8}/>
            <Flex direction="row" align="center">
            <Text typography="t6" color="dankanPrimary" bold={true}>{obj.univName}</Text>
                {/*<Spacing direction="horizontal" size={8}/>
            <Text typography="t10" color="dankanGray">({obj.univEnme})</Text>*/}
            </Flex>
            <Spacing size={8}/>
            <Text typography="t10" css={ellipsisStyles}>
                {obj.univAddr}
            </Text>
        </Flex>
    )
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
    border-bottom: 1px solid #F2F2F2;
    padding: 8px 0px;
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