import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Flex from "@components/Flex";
import TextField from "@components/TextField"
import Button from "@components/Button";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {Link} from "react-router-dom"
import {colors} from "@styles/colorPalette";
import {FormValues} from "@models/signin";
import validator from "validator"
import SvgTitle from "@assets/singinTitle.svg"

import MuiTextField from '@mui/material/TextField';
import KakaoImg from "@assets/Kakao.png";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import {SvgIcon} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NavbarBack from "@components/NavbarBack";

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
            <Text typography="t3" fontWeight={700}>매물을 확인하고 싶은<br/>대학교를 입력해주세요</Text>
            <Spacing size={68}/>
            <div>
                <MuiTextField id="standard-basic" placeholder="학교명 검색"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),
                           }}
                           variant="standard" style={{width: "100%"}}/>
            </div>
            <Spacing size={22}/>
            <Flex direction="row">
                <SvgIcon style={{ color: colors.dankanGrayText, fontSize: 12,}} component={ErrorOutlineIcon} inheritViewBox/>
                <Spacing direction="horizontal" size={14}/>
                <Text typography="t9" color={"dankanGrayText"}>대학생이 아니신가요?<br/>해당 지역과 가장 가까운 대학을 입력해주세요!</Text>
            </Flex>

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
