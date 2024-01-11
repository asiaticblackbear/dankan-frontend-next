import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import {FormValues} from "@/models/signin";
import validator from "validator"
import SvgTitle from "@assets/successTitle.svg"

import {useRouter} from "next/router";
import FixedBottomButton from "@components/FixedBottomButtonRight";

function FormInfo({onSubmit}: {onSubmit: ()=>void}) {
    const router = useRouter()

    return (
        <Flex direction="column">
            <Spacing size={102}/>
            <Text typography="t3" color="black" fontWeight={700} css={sidePaddingStyles}>회원가입이 완료되었습니다!</Text>
            <Spacing size={23}/>
            <Text typography="t7" color={"dankanGrayText"} css={sidePaddingStyles}>이제 자취방 찾으러<br/>단칸으로 떠나볼까요?</Text>
            <Spacing size={85}/>
            <div style={{ marginTop: '0px', marginLeft: '0px' }}>
                <SvgTitle width="323" height="323"/>
            </div>
            <Spacing size={25}/>
            <FixedBottomButton label="시작하기" onClick={()=>{
                //기동전문
                router.replace(`/`)
            }}/>

            {/*</Link>*/}

        </Flex>
    )
}

const sidePaddingStyles = css`
  padding-right: 24px;
  padding-left: 24px;
`
export default FormInfo
