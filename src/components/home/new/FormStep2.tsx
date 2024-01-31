import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import FixedBottomButton from "@components/user/FixedBottomButtonSginin";
import {useRouter} from "next/router";
import NonLinearSlider from "@components/home/Slider";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Home} from "@models/home";

function FormStep2({setHome, onNext}: {setHome: Home, onNext: (keyword: any) => void}) {
    const navigate = useRouter()
    const [name, setName] = useState("")

    const [selectedValue, setSelectedValue] = useState('1');
    const [slideValue, setSlideValue] = useState(1);

    const errors = useMemo(()=> validateUser(name), [name])
    const isSuccess = Object.keys(errors).length === 0

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log((event.target as HTMLInputElement).value)
        setSelectedValue((event.target as HTMLInputElement).value);
    };

    console.log(setHome)


    return (
        <Flex direction="column" css={formContainerStyles}>
            <Spacing size={49}/>
            <Text typography="t3" fontWeight={700}>거주 기간과<br/>방 형태를 선택해주세요</Text>
            <Spacing size={68}/>
            <Text typography="t6" fontWeight={600}>거주 기간</Text>
            <Spacing size={52}/>
            <NonLinearSlider onNext={(value)=>{
                setSlideValue(value)
            }}/>
            <Spacing size={86}/>
            <Text typography="t6" fontWeight={600}>방 형태</Text>
            <Spacing size={22}/>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue="1"
                    value={selectedValue}
                    onChange={handleChange}>
                    <FormControlLabel value="1" control={<Radio />} label="원룸" />
                    <FormControlLabel value="2" control={<Radio />} label="투룸" />
                    <FormControlLabel value="3" control={<Radio />} label="쓰리룸 이상" />
                    <FormControlLabel value="4" control={<Radio />} label="복층" />
                </RadioGroup>
            </FormControl>
            <Spacing size={100}/>
            <FixedBottomButton label="다음으로" disabled={isSuccess===true} onClick={()=>{
                onNext({"homeG": selectedValue, "per": slideValue})
                console.log("return: "+selectedValue)
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
    height: 100vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
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
