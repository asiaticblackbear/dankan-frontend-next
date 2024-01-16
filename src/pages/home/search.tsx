import NavbarClose from "@components/common/NavbarClose";
import {useRouter} from "next/router";
import Flex from "@components/common/Flex";
import {IconButton, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchedIcon from "@mui/icons-material/Search";
import {css} from "@emotion/react";
import {ChangeEvent, useState} from "react";
import FixedBottomContents from "@components/home/search/FixedBottomContents";

function SearchIcon() {
    return null;
}

function HomeSearch() {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setInputValue(e.target.value);
    };

    const handleClearClick = () => {
        setInputValue('');
    };

    return (
        <div>
            <NavbarClose title="후기 볼 지역 선택" onNext={() => {
                router.back()
            }}/>
            <Flex direction="column" css={formContainerStyles}>
                <div style={{padding: "18px 0px 13px 0px"}}>
                    <TextField id="outlined-basic" placeholder="지역명으로 검색"
                               value={inputValue}
                               onChange={handleChange}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchedIcon/>
                                       </InputAdornment>
                                   ),
                                   endAdornment: inputValue && (
                                       <IconButton onClick={handleClearClick} edge="end">
                                           <CancelIcon/>
                                       </IconButton>
                                   ),
                               }}
                               variant="outlined" style={{width: "100%"}}/>
                </div>
            </Flex>
            <FixedBottomContents label={""} onClick={()=>{}}/>
        </div>
    )

}

const formContainerStyles = css`
  padding-left: 24px;
  padding-right: 24px;
`

export default HomeSearch