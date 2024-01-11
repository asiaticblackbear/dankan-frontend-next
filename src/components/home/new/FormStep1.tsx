import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/Flex";
import Text from "@components/Text"
import {css} from "@emotion/react";
import Spacing from "@components/Spacing";
import {colors} from "@styles/colorPalette";
import {FormValues} from "@models/signin";
import MuiTextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import {SvgIcon} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NavbarBack from "@components/NavbarBack";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getUnivAll} from "@remote/user";
import {Univ} from "@models/univ";
import ErrorInfo from "@assets/errorInfo.svg"

function FormStep1({onNext}: {onNext: (keyword: string) => void}) {

    const [keyword, setKeyword] = useState('')
    const [focus, setFocus] = useState(false)
    const navigate = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const {data} = useQuery(['univs', keyword], () => getUnivAll(keyword),
        {enabled: (keyword !== '' && keyword.length >= 2)})

    console.log('data', data)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);


    const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }, [])

    const handleFocus = useCallback(() => {
        console.log("test111");
        setFocus(true)
    }, [])

    const handleBlur = useCallback(() => {
        console.log("test111");
        setFocus(false)
    }, [])

    console.log("keyword", keyword)


    return (
        <Flex direction="column" css={formContainerStyles}>

            <Spacing size={50}/>
            <Text typography="t3" fontWeight={700}>거주한 집의<br/>주소를 입력해주세요</Text>
            <Spacing size={68}/>
            <div>
                <MuiTextField id="standard-basic" placeholder="주소 찾기" ref={inputRef} value={keyword}
                              onChange={handleKeyword} onFocus={handleFocus} onBlur={handleBlur}
                              InputProps={{
                                  startAdornment: (
                                      <InputAdornment position="start">
                                          <SearchIcon/>
                                      </InputAdornment>
                                  ),
                              }}
                              variant="standard" style={{width: "100%"}}/>
            </div>
            <Spacing size={4}/>
            {keyword == '' && !focus ? (
                <div>
                    <Spacing size={18}/>
                    <Flex direction="row">
                        <SvgIcon style={{color: colors.dankanGrayText, fontSize: 12,}} component={ErrorOutlineIcon}
                                 inheritViewBox/>
                        <Spacing direction="horizontal" size={14}/>
                        <Text typography="t9" color={"dankanGrayText"}>후기에는 동(면, 읍)과 단지명까지만 노출됩니다</Text>
                    </Flex>
                </div>
            ) : null}

            {keyword == '' && focus ? (
                <div>
                    <Spacing size={150}/>
                    <Flex direction="column" align="center">
                        <ErrorInfo height="46px" width="46px"/>
                        <Spacing size={17}/>
                        <Text typography="t6" color="black" bold={true}>이렇게 검색해 보세요</Text>
                        <Spacing size={8}/>
                        <Text typography="t9" color={"dankanGrayText"}>동(면, 읍) + 건물 이름<br/>도로명 + 건물 번호</Text>
                    </Flex>
                </div>
            ) : null}

            {keyword.length>=2 && data?.length===0 ? (
                <div>
                    <Spacing size={150}/>
                    <Flex direction="column" align="center">
                        <ErrorInfo height="46px" width="46px"/>
                        <Spacing size={17}/>
                        <Text typography="t6" color="black" bold={true}>검색 결과가 없어요</Text>
                        <Spacing size={8}/>
                        <Text typography="t9" color={"dankanGrayText"}>다시 한 번 검색해 보세요</Text>
                    </Flex>
                </div>
            ): null}

            {keyword !== '' && data?.length !== 0 ? (
                <ul css={listContainerStyles}>
                    {data?.map((item: Univ, index: number) =>
                        <Flex as="li" css={listRowContainerStyles} onClick={()=>{
                            onNext(keyword)
                        }}>
                            <Flex direction="column" justify="center" css={rowContainerStyles}>
                                <Text typography="t7" color="black">{item.univName}</Text>
                                <Text typography="t10" color="dankanGrayText">{item.univAddr}</Text>
                            </Flex>
                        </Flex>
                    )}
                </ul>
            ) : null}
        </Flex>
    )
}

const listContainerStyles = css`
  overflow: auto;
`


const listRowContainerStyles = css`
  padding: 8px 0px;
  height: 70px;
  border-bottom:1px solid;
  border-color: var(--dankanGrayPoint);
`

const rowContainerStyles = css`
  padding-left: 6px;
`


const formContainerStyles = css`
  padding-left: 24px;
  padding-right: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
const imgStyles = css`
  width: 24px;
  height: 24px;
  margin-right: 13px;
`
export default FormStep1
