import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/Flex";
import TextField from "@components/TextField"
import Button from "@components/Button";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import {FormValues} from "@/models/signin";
import SvgTitle from "@assets/singinTitle.svg"
import KakaoImg from "@assets/Kakao.png";
import Image from "next/image";
import {useRouter} from "next/router";

function Form({onSubmit}: {onSubmit: (formValues: FormValues)=>void}) {

    const router = useRouter()
    const [formValues, setFormValues] = useState({
        email: "", password: ""
    })

    const signup = () => {
        router.push({
            pathname:"/user/new",
            query: {
                sso : "N"
            },
        }, "/user/new")
    }


    return (
        <Flex direction="column" css={formContainerStyles}>
            <Spacing size={83}/>
            <Text typography="t3" fontWeight={700}>단기양도 자취방?<br/>단칸에서 구하자!</Text>
            <Spacing size={23}/>
            <Text typography="t7" color={"dankanGrayText"}>한 번의 회원가입으로<br/>우리 학교 앞 자취방을 찾아보세요</Text>
            <Spacing size={140}/>
            <div style={{ marginTop: '0px', marginLeft: '112px' }}>
                <SvgTitle width="224.96" height="247"/>
            </div>
            <Spacing size={25}/>

            <Button size="medium" color="kakao" onClick={()=>{onSubmit(formValues)}}>
                <Flex justify="center"  direction="row" align="center">
                <Image src={KakaoImg} css={imgStyles} alt=""/>카카오톡으로 시작하기</Flex>
            </Button>
            <Spacing size={19}/>
            {/*<Link to="/signup" css={linkStyles}>*/}
            <div css={linkStyles}>
                <Text typography="t9" color={"dankanGrayText"} style={{paddingRight: 7 }}>또는</Text>
                <Text typography="t7" color={"dankanGrayTextPoint"} fontWeight={700}
                      onClick={signup}>부동산으로 가입하기</Text>
            </div>

        </Flex>
    )
}


const formContainerStyles = css`
    padding: 24px;
`

const linkStyles = css`
  text-align: center;
  
  &>span:hover{
    color: ${colors.blue};
  }
`
const imgStyles = css`
  width: 24px;
  height: 24px;
  margin-right: 13px;
`
export default Form
