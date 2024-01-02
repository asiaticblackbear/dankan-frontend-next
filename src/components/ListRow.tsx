import Flex from "./Flex"
import Text from "./Text"
import {ReactNode} from "react";
import {css} from "@emotion/react";

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

function ListRowTexts({title, subTitle}: {title: string, subTitle: string}){
    return (
        <Flex direction="column">
            <Text bold={true}>{title}</Text>
            <Text typography="t7">{subTitle}</Text>
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

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyle= css`
  margin-right: 14px;
`

const listRowContentsStyles= css`
    flex: 1;
`
ListRow.Text = ListRowTexts
export default ListRow