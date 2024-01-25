import {colors} from "@styles/colorPalette";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {createPortal} from "react-dom";
import OutButton from "@components/home/OutButton";
import Spacing from "@components/common/Spacing";
import Flex from "@components/common/Flex";
import SvgTitle from "@assets/pointTitle.svg";
import Text from "@components/common/Text";

interface FixedBottomContentsProps{
    label?: string
    uid?: string
}

function FixedBottomContents({label, uid}:FixedBottomContentsProps){
    return(
            <div css={containerStyle}>
                <OutButton id={uid}/>
                <Spacing size={47}/>
                <div css={bottomContentStyle}>
                    <Flex justify="left" align="center" css={flexStyle}>
                        <Text typography="t3" color="dankanGrayText" bold={true}>단칸</Text>
                        <Spacing direction="horizontal" size={36}/>
                        <Flex direction="column">
                            <Text typography="t11" color="dankanGrayText">상호: 네스트소프트 | 대표: 정재현 | 사업자등록번호: 317-06-02039</Text>
                            <Spacing size={4}/>
                            <Text typography="t11" color="dankanGrayText">서비스 이용문의: 010-9210-2745 | 이메일 jjangjh2222@naver.com</Text>
                            <Spacing size={4}/>
                            <Text typography="t11" color="dankanGrayText">주소: 한양대학교ERICA 제5공학관 SW창업1실 </Text>
                        </Flex>

                    </Flex>
                </div>
            </div>

    )
}


const containerStyle = css`
  position: relative;
  width: 100%;
  left: 0;
  rigtht: 0;
  bottom: 0;
  background-color: ${colors.white};
`
const bottomContentStyle = css`
  width: 100%;
  height: 110px;
  background-color: ${colors.dankanFooter};
  padding: 20px 40px 20px 40px
`

const flexStyle = css`
  width: 100%;
  height: 100%;
`

/*const leftStyles= css`
  margin: 0px 37px 0px 0px;
`

const rightStyles= css`
  margin: 0px 0px 0px 40px;
`*/

export default FixedBottomContents