import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {createPortal} from "react-dom";
import Button from "@components/common/Button";
import Spacing from '@components/common/Spacing'
import Text from '@components/common/Text'
import Flex from '@components/common/Flex'
import React from 'react'

interface FixedBottomButtonProps{
    label: string
    onClick: () => void
}

function FixedBottomButton({label, onClick}:FixedBottomButtonProps){

    //const $portalRoot = document.getElementById("root-portal")

    /*if($portalRoot==null){
        return null
    }*/

    return(
        <Container>
            <Spacing size={43}/>
            <Text typography="t3" color="black" fontWeight={700}>대학교를 변경하시겠어요?</Text>
            <Spacing size={24}/>
            <Text typography="t7" color="dankanGrayText">변경된 대학교 주변의 단칸과 후기를<br/>홈에서 볼 수 있어요</Text>
            <Spacing size={48}/>
            <Flex justify="between-space" direction="row">
                <Button full={true} size="medium" color="normal" css={buttonStyle} style={{marginRight:12}}>건물명으로 검색</Button>
                <Button full={true} size="medium" css={buttonStyle} style={{marginLeft:12}}>확인</Button>
            </Flex>
        </Container>
        //$portalRoot,
    )
}

const Container = styled.div`
  width: 100%;
  position: fixed; 
  left: 0;
  rigtht: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 24px 20px 24px
`

const buttonStyle = css`
    border-radius: 8px;
`

export default FixedBottomButton