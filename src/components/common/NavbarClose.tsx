import Flex from "@components/common/Flex";
import Link from "next/link";
import Button from "@components/common/Button";
import Text from "@components/common/Text"
import Spacing from "@components/common/Spacing";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import {SvgIcon} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {getUserById} from "@remote/user";
import {useEffect, useState} from "react";

function Navbar({title, onNext}: {title: string, onNext: ()=>void}) {
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
        <Flex justify="space-between" align="center" css={navbarContainerStyles} onClick={onNext}>
            <Text typography="t6" textAlign="center" fontWeight="600">{title}</Text>
            <Spacing direction="horizontal" size={9}/>
            <SvgIcon style={{ color: colors.dankanGrayTextPoint, fontSize: 24 }} component={CloseIcon} inheritViewBox/>
        </Flex>
    )
}

const textStyles = css`
  width:100%;
  margin-right: 24px;
`

const navbarContainerStyles = css`
  padding: 14px 24px 14px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  /*border-bottom: 1px solid;*/
`

export default Navbar