import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Flex from "@components/common/Flex";
import Text from "@components/common/Text"
import {css} from "@emotion/react";
import Spacing from "@components/common/Spacing";
import {colors} from "@styles/colorPalette";
import InputAdornment from "@mui/material/InputAdornment";
import { SvgIcon, TextField } from '@mui/material'
import Image from "next/image";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import ErrorInfo from "@assets/errorInfo.svg"
import SearchedIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'

import NavbarBack from '@components/common/NavbarBack'
import {getHomeName, getHomes, getNameGroupHomes} from '@remote/home'
import { Home } from '@models/home'
import BgImg from "@assets/homeSample.jpg";
import ListRow from "@components/home/search/ListRow";
import {dateFormat, periodFormat} from "@components/home/HomeList";

function FormHomeSearch({onNext}: {onNext: (univ: string) => void}) {
    const router = useRouter()

    const [keyword, setKeyword] = useState('')

    const {data} = useQuery(['homes', keyword], () =>  (getNameGroupHomes(keyword)),
        {enabled: (keyword !== '' && keyword.length >= 2)})
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);
    const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }, [])

  const handleClear = () => {
    setKeyword('')
  }


    return (
        <div>
            <NavbarBack title="건물명으로 검색" onNext={()=>{
                router.back()
            }} />
            <Flex direction="column" css={formContainerStyles}>

                <div style={{ padding: '18px 0px 13px 0px' }}>
                    <TextField id="outlined-basic" placeholder="건물명으로 검색"
                               inputRef={inputRef}
                               value={keyword}
                               onChange={handleKeyword}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchedIcon />
                                       </InputAdornment>
                                   ),
                                   endAdornment: keyword && (
                                       <IconButton onClick={handleClear} edge="end">
                                           <CancelIcon />
                                       </IconButton>
                                   ),
                               }}
                               variant="outlined" style={{ width: '100%' }} />
                </div>
                <Spacing size={4}/>

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

                {keyword !== '' && data?.length > 0 ? (
                    <div>
                        <Spacing size={22}/>
                        <Text typography="t6" color="black" bold={true}>{data.length}개의 건물</Text>
                        <Spacing size={17}/>
                        <div css={lineSmall}></div>
                        <ul css={listContainerStyles}>
                            {data?.map((item: Home, index: number) =>
                                <ListRow
                                    key={item.homeSer}
                                    left={
                                        <Image src={item.filePath1||BgImg} css={imgStyles} alt="" width={110} height={100}/>
                                    }
                                    contents={
                                        <ListRow.Text home={item} name={item.name||""} addr={item.homeAddr||""}/>
                                    }
                                    right={null}
                                    onClick={() => {
                                        router.push({
                                            pathname:"/home/"+item.homeSer,
                                        })
                                    }}
                                />
                            )}
                        </ul>
                    </div>
                ) : null}
            </Flex>
        </div>
    )
}

const listContainerStyles = css`
  overflow: auto;
`
const fontHeightStyle = css`
  line-height: 1.4;
`

const listRowContainerStyles = css`
  padding: 8px 0px;
  height: 70px;
  border-bottom:1px solid;
  border-color: ${colors.dankanGrayPoint};
`

const rowContainerStyles = css`
  padding-left: 6px;
`

const imgStyles = css`
  width: 100%;
  height: 100%;
  border-radius: 7%;
`

const formContainerStyles = css`
  margin-left: 24px;
  margin-right: 24px;
`
const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
export default FormHomeSearch