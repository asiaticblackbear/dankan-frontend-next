import Flex from "@components/Flex";
import Link from "next/link";
import Button from "@components/Button";
import Text from "@components/Text"
import Spacing from "@components/Spacing";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowBackIos';
function Navbar() {
    const location = useRouter()
    const showSignButton = ["/signup", "/signin"].includes(location.pathname) === true
    console.log(showSignButton)
    return (
        <Flex align="center" css={navbarContainerStyles}>
            <Link href="/user/signin">
                <div>
                    <SvgIcon style={{ color: colors.dankanGrayTextPoint, fontSize: 24 }} component={ArrowLeftIcon} inheritViewBox/>
                </div>
            </Link>
            {showSignButton ? (
                <Link href="/signup">
                    <Button></Button>
                </Link>
            ): null }
        </Flex>
    )
}

const navbarContainerStyles = css`
  padding: 14px 24px 0px 0px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default Navbar