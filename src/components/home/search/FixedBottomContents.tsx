import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {createPortal} from "react-dom";
import Button from "@components/common/Button";
import Spacing from '@components/common/Spacing'
import Text from '@components/common/Text'
import Flex from '@components/common/Flex'
import React from 'react'
import Rectangle from "@assets/rectangleTemp.svg";

interface FixedBottomButtonProps {
    label: string
    onClick: () => void
}

function FixedBottomButton({label, onClick}: FixedBottomButtonProps) {

    //const $portalRoot = document.getElementById("root-portal")

    /*if($portalRoot==null){
        return null
    }*/

    return (
        <Container>
            <Spacing size={23}/>
            <Flex direction="row" justify="space-between" align="center">
                <Flex direction="row" justify="start" align="center">
                    <Text typography="t9" color="dankanPrimary">{1}</Text>
                    <Spacing direction="horizontal" size={0}/>
                    <Text typography="t9" color="dankanGray">/10</Text>
                </Flex>
                <Text typography="t9" color="dankanGray">초기화</Text>
            </Flex>
            <Spacing size={15}/>
            <div css={lineSmall}></div>
            <Spacing size={15}/>
            <Flex justify="between-space" direction="row">
                <Button full={true} size="medium" color="normal" css={buttonStyle} style={{marginRight: 12}}>건물명으로
                    검색</Button>
                <Button full={true} size="medium" css={buttonStyle} style={{marginLeft: 12}}>확인</Button>
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
  font-weight: normal;
`
const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`


export default FixedBottomButton