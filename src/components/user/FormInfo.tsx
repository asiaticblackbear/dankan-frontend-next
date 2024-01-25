import React from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import SvgTitle from "@assets/successTitle.svg"

import {useRouter} from "next/router";
import FixedBottomButton from "@components/common/FixedBottomButtonRight";
import {User} from "@models/user";

function FormInfo({onUser, onNext}: {onUser: any, onNext: (onUser: User)=>void}) {
    const router = useRouter()

    return (
        <Flex direction="column" css={containerStyles}>
            <Spacing size={102}/>
            <Text typography="t3" color="black" fontWeight={700}>회원가입이 완료되었습니다!</Text>
            <Spacing size={23}/>
            <Text typography="t7" color={"dankanGrayText"} css={fontHeightStyle}>이제 자취방 찾으러<br/>단칸으로 떠나볼까요?</Text>
            <Spacing size={85}/>
            <div style={{ marginTop: '0px', marginLeft: '0px' }}>
                <SvgTitle width="323" height="323"/>
            </div>
            <Spacing size={25}/>
            <FixedBottomButton label="시작하기" onClick={()=>{
                onNext(onUser)
            }}/>

            {/*</Link>*/}

        </Flex>
    )
}

const fontHeightStyle = css`
  line-height: 1.4;
`

const containerStyles = css`
  padding-right: 24px;
  padding-left: 24px;
`
export default FormInfo
