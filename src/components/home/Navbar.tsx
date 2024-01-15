import Flex from "@components/common/Flex";
import Link from "next/link";
import Button from "@components/common/Button";
import Text from "@components/common/Text"
import Spacing from "@components/common/Spacing";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {getUserById} from "@remote/user";
import {useEffect, useState} from "react";

function Navbar({onSubmit}: {onSubmit: ()=>void}) {
    const location = useRouter()
    const showSignButton = ["/signup", "/signin"].includes(location.pathname) === true

    const [item, setItem] = useState("대학교")
    useEffect(() => {
        let uid
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid")
            const userPoint = async () => {
                const data = await getUserById(uid!!)
                console.log("dasd"+JSON.stringify(data))
                setItem(data?.univZipCd)
            }
            userPoint();
        }

    },[])

    console.log(showSignButton)
    return (
        <Flex justify="space-between" align="center" css={navbarContainerStyles} onClick={onSubmit}>
                <Flex direction="row" align="center">
                    <Text typography="t5" bold={true}>{item}</Text>
                    <Spacing direction="horizontal" size={9}/>
                    <SvgIcon style={{ color: colors.dankanGrayPoint, fontSize: 24 }} component={ArrowDownIcon} inheritViewBox/>
                </Flex>
            {showSignButton ? (
                <Link href="/signup">
                    <Button></Button>
                </Link>
            ): null }
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