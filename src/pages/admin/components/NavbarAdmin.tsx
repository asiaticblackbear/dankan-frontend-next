import Flex from "@components/common/Flex";
import Link from 'next/link'
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import {useRouter} from "next/router";
import Logo from "@assets/logo.png";
import {useSnackbar} from "@components/common/Snackbar";
import React, { useEffect, useState } from 'react'
import Spacing from "@components/common/Spacing";
import Image from "next/image";
import Text from "@components/common/Text";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function NavbarAdmin({onNext}: {onNext: (index: number) => void}) {
    const router = useRouter()
    const {showSnackbar} = useSnackbar()
    const [like, setLike] = useState(false)
    const handle = (index: number) => {
        onNext(index)
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onNext(newValue)
    };
    return (
        <div>
        <Flex justify="space-between" align="center" css={navbarContainerStyles}>
            <div onClick={()=>{
                router.replace("/admin");
            }}>
                <Image src={Logo} width={46} height={46} alt="Logo"/>
            </div>
            <Flex direction="row" align="center">
                {/*<Text typography="t5" onClick={()=>handle(0)}>매물관리 |</Text>
                <Spacing direction="horizontal"  size={6}/>
                <Text typography="t5" onClick={()=>handle(1)}>사용자관리 |</Text>
                <Spacing direction="horizontal"  size={6}/>
                <Text typography="t5" onClick={()=>handle(2)}>대학교관리</Text>*/}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped"
                >
                    <Tab
                        value={0}
                        label="매물관리"/>
                    <Tab value={1} label="사용자관리" />
                    <Tab value={2} label="대학교관리" />
                </Tabs>
            </Flex>
        </Flex>

        </div>
    )
}

const navbarContainerStyles = css`
    width: 100%;
    min-width: 1800px;
    padding: 14px 24px 14px 24px;
    position: sticky;
    max-height: 100px;
    top: 0;
    background-color: ${colors.white};
    z-index: 10;
    border-bottom: 1px solid #F2F2F2;
    /*border-bottom: 1px solid;*/
`

export default NavbarAdmin