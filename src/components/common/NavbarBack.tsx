import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import Link from "next/link";
import Button from "@components/common/Button";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
function Navbar({title, onNext}: {title: string, onNext: ()=>void}) {
    const router = useRouter()
    const showSignButton = ["/signup", "/signin"].includes(router.pathname) === true
    console.log(showSignButton)
    return (
        <Flex align="center" css={navbarContainerStyles}>

                <div onClick={onNext}>
                    <SvgIcon style={{ color: colors.dankanGrayTextPoint, fontSize: 24 }} component={ArrowLeftIcon} inheritViewBox/>
                </div>
                <Text typography="t6" textAlign="center" fontWeight="600" css={textStyles}>{title}</Text>


        </Flex>
    )
}

const textStyles = css`
  width:100%;
  margin-right: 24px;
`

const navbarContainerStyles = css`
  width: 100%;
  padding: 14px 24px 14px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default Navbar