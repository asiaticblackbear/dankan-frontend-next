import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/common/Flex";
import TextField from "@components/common/TextField"
import Button from "@components/common/Button";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import {Link} from "react-router-dom"
import {colors} from "@styles/colorPalette";
import {FormValues} from "@models/signin";
import validator from "validator"

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
            <TextField label="이메일" name="email" placeholder="dankan@gmail.com" onChange={handleFormValues} value={formValues.email}></TextField>
            <Spacing size={16}/>
            <TextField label="비밀번호" type="password" name="password" onChange={handleFormValues} value={formValues.password}></TextField>
            <Spacing size={32}/>
            <Button size="medium" disabled={isSuccess===false} onClick={()=>{onSubmit(formValues)}}>로그인</Button>
            <Spacing size={12}/>
            {/*<Link to="/signup" css={linkStyles}>*/}
            <div css={linkStyles}>
                <Text typography="t7">또는</Text> <Text typography="t6">부동산으로 가입하기</Text>
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
