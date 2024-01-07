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

function FormInfo({onSubmit}: {onSubmit: (formValues: FormValues)=>void}) {
    const navigate = useRouter()
    const [formValues, setFormValues] = useState({
        email: "", password: ""
    })

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>)=>{ setFormValues((prevFormValues) => ({
        ...prevFormValues, [e.target.name]: e.target.value
    }))}, [])

    const errors = useMemo(()=> validate(formValues), [formValues])
    const isSuccess = Object.keys(errors).length === 0
    
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
            <FixedBottomButton label="시작하기" disabled={false} onClick={()=>{
                navigate.push(`/`)
            }}/>

            {/*</Link>*/}

        </Flex>
    )
}

function validate(formValues: FormValues){
    let errors: Partial<FormValues> = {}
    if(validator.isEmail(formValues.email) == false){
        errors.email = "이메일 형식을 확인해주세요"
    }
    if(formValues.password.length < 8){
        errors.email = "비밀번호를 8글자 이상 입력해주세요"
    }
    return errors;
}

const formContainerStyles = css`
    padding: 24px;
`
const sidePaddingStyles = css`
  padding-right: 24px;
  padding-left: 24px;
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
export default FormInfo
