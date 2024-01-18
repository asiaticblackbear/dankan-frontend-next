import NavbarClose from "@components/common/NavbarClose";
import {useRouter} from "next/router";
import Flex from "@components/common/Flex";
import {IconButton, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchedIcon from "@mui/icons-material/Search";
import {css} from "@emotion/react";
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import FixedBottomContents from "@components/home/search/FixedBottomContents";
import DualListSelection from '@components/home/search/DualList'
import Spacing from '@components/common/Spacing'
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import styled from "@emotion/styled";
import {colors} from "@styles/colorPalette";
import {getUnivAll} from "@remote/user";
import {useQuery} from "react-query";
import {getZipAll, getZipSearch} from "@remote/zip";

function SearchIcon() {
    return null;
}

function HomeSearch() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null)
    const [keyword, setKeyword] = useState('')

    const {data} = useQuery(['homes', keyword], () => getZipSearch(keyword),
        {enabled: (keyword !== '' && keyword.length >= 2)})
    const handleClear = () => {
        setKeyword('');
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, []);

    const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }, [])

    return (
        <div>
            <NavbarClose title="후기 볼 지역 선택" onNext={() => {
                router.back()
            }}/>
            <Flex direction="column">
                <div style={{padding: "18px 0px 13px 0px"}} css={formContainerStyles}>
                    <TextField id="outlined-basic" placeholder="지역명으로 검색"
                               value={keyword}
                               onChange={handleKeyword}
                               ref={inputRef}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchedIcon/>
                                       </InputAdornment>
                                   ),
                                   endAdornment: keyword && (
                                       <IconButton onClick={handleClear} edge="end">
                                           <CancelIcon/>
                                       </IconButton>
                                   ),
                               }}
                               variant="outlined" style={{width: "100%"}}/>
                </div>

                <Spacing size={25}/>
                {keyword == '' ? <DualListSelection/> : null}

                <Spacing size={25}/>
            </Flex>

        </div>
    )

}

const formContainerStyles = css`
  margin-left: 24px;
  margin-right: 24px;
`

export default HomeSearch