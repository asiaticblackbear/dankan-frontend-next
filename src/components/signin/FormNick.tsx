import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import {User} from "@models/user";
import MuiTextField from '@mui/material/TextField';
import NavbarBack from "@components/NavbarBack";
import FixedBottomButton from "@components/signin/FixedBottomButtonSginin";
import {useRouter} from "next/router";

function FormUniv({onSubmit}: {onSubmit: ()=>void}) {
    const navigate = useRouter()
    const [name, setName] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const errors = useMemo(()=> validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);

    const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    return (
        <Flex direction="column" css={formContainerStyles}>
            <NavbarBack/>
            <Spacing size={70}/>
            <Text typography="t3" fontWeight={700}>마지막 단계예요!<br/>닉네임을 설정해주세요</Text>
            <Spacing size={68}/>
            <div>
                <MuiTextField id="standard-basic" placeholder="최소 2자, 최대 12자" value={name} ref={inputRef}
                           variant="standard" style={{width: "100%"}} onChange={handleFormValues}/>
            </div>
            <FixedBottomButton label="닉네임 입력하기" disabled={isSuccess===false} onClick={()=>{
                navigate.push(`/user/info`)
            }}/>

        </Flex>
    )
}

function validateUser(name: string){
    let errors = {}
    if(name.length < 2 || name.length > 12 ){
        errors = "최소 2자, 최대 12자를 입력해주세요"
    }
    return errors;
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
