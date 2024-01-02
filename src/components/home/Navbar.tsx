import Flex from "@components/Flex";
import Link from "next/link";
import Button from "@components/Button";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";

function Navbar() {
    const location = useRouter()
    const showSignButton = ["/signup", "/signin"].includes(location.pathname) === true
    console.log(showSignButton)
    return (
        <Flex justify="space-between" align="center" css={navbarContainerStyles}>
            <Link href="/">홈</Link>
            {showSignButton ? (
                <Link href="/signup">
                    <Button></Button>
                </Link>
            ): null }
        </Flex>
    )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default Navbar