import Flex from "@components/common/Flex";
import Link from "next/link";
import Button from "@components/common/Button";
import Text from "@components/common/Text"
import Spacing from "@components/common/Spacing";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
function Navbar({onNext}: {onNext: ()=>void}) {
    return (
        <Flex align="center" css={navbarContainerStyles}>
            <div onClick={onNext}>
                <SvgIcon style={{ color: colors.dankanGrayTextPoint, fontSize: 24 }} component={ArrowLeftIcon} inheritViewBox/>
            </div>
        </Flex>
    )
}

const navbarContainerStyles = css`
  padding: 14px 24px 14px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default Navbar