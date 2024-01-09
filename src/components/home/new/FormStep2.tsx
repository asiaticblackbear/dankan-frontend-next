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
import NonLinearSlider from "@components/home/Slider";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function FormStep2({onNext}: {onNext: (keyword: string) => void}) {
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
            <Spacing size={49}/>
            <Text typography="t3" fontWeight={700}>거주 기간과<br/>방 형태를 선택해주세요</Text>
            <Spacing size={68}/>
            <Text typography="t6" fontWeight={600}>거주 기간</Text>
            <Spacing size={24}/>
            <NonLinearSlider/>
            <Spacing size={86}/>
            <Text typography="t6" fontWeight={600}>방 형태</Text>
            <Spacing size={22}/>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="one" control={<Radio />} label="원룸" />
                    <FormControlLabel value="two" control={<Radio />} label="투룸" />
                    <FormControlLabel value="three" control={<Radio />} label="쓰리룸 이상" />
                    <FormControlLabel value="other" control={<Radio />} label="복층" />
                </RadioGroup>
            </FormControl>

            <FixedBottomButton label="다음으로" disabled={isSuccess===true} onClick={()=>{
                onNext("")
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
export default FormStep2
