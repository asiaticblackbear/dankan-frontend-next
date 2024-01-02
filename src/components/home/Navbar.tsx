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

function Navbar() {
    const location = useRouter()
    const showSignButton = ["/signup", "/signin"].includes(location.pathname) === true
    console.log(showSignButton)
    return (
        <Flex justify="space-between" align="center" css={navbarContainerStyles}>
            <Link href="/">
                <Flex direction="row" alignItems="center">
                    <Text typography="t5" bold={true}>나의 학교</Text>
                    <Spacing size={9}/>
                    <div>
                        <SvgIcon style={{ color: colors.dankanGrayPoint, fontSize: 24 }} component={ArrowDownIcon} inheritViewBox/>
                    </div>
                </Flex>
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
  padding: 14px 24px 0px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default Navbar