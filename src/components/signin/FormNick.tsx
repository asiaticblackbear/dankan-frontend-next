import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import {FormValues} from "@models/signin";
import MuiTextField from '@mui/material/TextField';
import NavbarBack from "@components/NavbarBack";
import FixedBottomButton from "@components/signin/FixedBottomButtonSginin";

function FormUniv({onSubmit}: {onSubmit: (formValues: FormValues)=>void}) {

    const [formValues, setFormValues] = useState({
        email: "", password: ""
    })

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>)=>{ setFormValues((prevFormValues) => ({
        ...prevFormValues, [e.target.name]: e.target.value
    }))}, [])
    
    return (
        <Flex direction="column" css={formContainerStyles}>
            <NavbarBack/>
            <Spacing size={70}/>
            <Text typography="t3" fontWeight={700}>마지막 단계예요!<br/>닉네임을 설정해주세요</Text>
            <Spacing size={68}/>
            <div>
                <MuiTextField id="standard-basic" placeholder="최소 2자, 최대 12자"
                           variant="standard" style={{width: "100%"}}/>
            </div>
            <FixedBottomButton label="닉네임 입력하기" onClick={()=>{}}/>

        </Flex>
    )
}


const formContainerStyles = css`
    padding-left: 24px;
    padding-right: 24px;
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
export default FormUniv
