import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/Flex";
import TextField from "@components/TextField"
import Button from "@components/Button";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {Link} from "react-router-dom"
import {colors} from "@styles/colorPalette";
import {FormValues} from "@/models/signin";
import validator from "validator"
import SvgTitle from "@assets/singinTitle.svg"

function Form({onSubmit}: {onSubmit: (formValues: FormValues)=>void}) {

    const [formValues, setFormValues] = useState({
        email: "", password: ""
    })

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>)=>{ setFormValues((prevFormValues) => ({
        ...prevFormValues, [e.target.name]: e.target.value
    }))}, [])

    const errors = useMemo(()=> validate(formValues), [formValues])
    const isSuccess = Object.keys(errors).length === 0
    
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

            <Button size="medium" color="kakao" onClick={()=>{onSubmit(formValues)}}> 카카오톡으로 시작하기</Button>
            <Spacing size={19}/>
            {/*<Link to="/signup" css={linkStyles}>*/}
            <div css={linkStyles}>
                <Text typography="t9" color={"dankanGrayText"}>또는</Text> <Text typography="t7" color={"dankanGrayPoint"} fontWeight={700}>부동산으로 가입하기</Text>
            </div>
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

const linkStyles = css`
  text-align: center;
  
  &>span:hover{
    color: ${colors.blue};
  }
`

export default Form
