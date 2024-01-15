 import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import SvgTitle from "@assets/successTitle.svg"
import {useRouter} from "next/router";
import FixedBottomButton from "@components/common/FixedBottomButtonRight";
import {Home} from "@models/home";

function FormStep4({setHome, setPoint, setImage, onNext}: {setHome: Home, setPoint: number, setImage: File[], onNext: (keyword: any, point: number, setImage: File[]) => void}){
    const navigate = useRouter()

    console.log("FormStep4: "+JSON.stringify(setHome), +"point: "+setPoint+ "setImageFiles: "+setImage.length)
    
    return (
        <Flex direction="column">
            <Spacing size={102}/>
            <Text typography="t3" color="black" fontWeight={700} css={sidePaddingStyles}>후기 등록이 완료되었습니다!</Text>
            <Spacing size={152}/>
            <div style={{ marginTop: '0px', marginLeft: '0px' }}>
                <SvgTitle width="323" height="323"/>
            </div>
            <Spacing size={25}/>
            <FixedBottomButton label="홈으로" disabled={false} onClick={()=>{
                console.log()
                onNext(setHome, setPoint, setImage)
            }}/>
            {/*</Link>*/}

        </Flex>
    )
}

const sidePaddingStyles = css`
  padding-right: 24px;
  padding-left: 24px;
`
export default FormStep4
