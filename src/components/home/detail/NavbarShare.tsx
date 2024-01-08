import Flex from "@components/Flex";
import Link from "next/link";
import Button from "@components/Button";
import Text from "@components/Text"
import Spacing from "@components/Spacing";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowLeftIcon from "@mui/icons-material/ArrowBackIos";
import LikeIcon from "@assets/detailLike.svg"
import ShareIcon from "@assets/detailShare.svg"

function NavbarShare() {
    const location = useRouter()
    const showSignButton = ["/signup", "/signin"].includes(location.pathname) === true
    console.log(showSignButton)
    return (
        <Flex justify="space-between" align="center" css={navbarContainerStyles}>
            <Link href="/">
                <div>
                    <SvgIcon style={{color: colors.dankanGrayTextPoint, fontSize: 24}} component={ArrowLeftIcon}
                             inheritViewBox/>
                </div>
            </Link>
            <Link href="/">
                <Flex direction="row" align="center">
                    <div>
                        <ShareIcon/>
                    </div>
                    <Spacing direction="horizontal"  size={21}/>
                    <div>
                        <LikeIcon/>
                    </div>
                </Flex>
            </Link>
        </Flex>
    )
}

const navbarContainerStyles = css`
  padding: 14px 24px 14px 24px;
  position: sticky;
  top: 0;
  background-color: ${
          colors.white
  };
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default NavbarShare