import styled from "@emotion/styled";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {SvgIcon, TextField} from '@mui/material'
import Image from "next/image";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import ErrorInfo from "@assets/errorInfo.svg"
import SearchedIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import {stopHome, deleteHome, getHomes, getHomeName} from '@remote/home'
import Flex from "@components/common/Flex";
import Spacing from "@components/common/Spacing";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Home} from "@models/home";
import ListRow from "@pages/admin/AdminListRow";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@mui/material";
import {useSnackbar} from "@components/common/Snackbar";
import {colors} from "@styles/colorPalette";
import BgImg from "@assets/homeSample.jpg";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { css } from '@emotion/react'
import {deleteUniv, getUnivName, stopUniv} from "@remote/univ";
import MyButton from "@components/common/Button";
function HomeAdmin() {
    const router = useRouter()
    const [category, setCategory] = React.useState("0");
    const [data, setData] = useState([])

    const [open, setOpen] = useState(false);
    const [popup, setPopup] = useState({
        id: '',
        extra: '',
        title: '',
        desc: '',
        evt: 0
    });

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const [keyword, setKeyword] = useState('')

    /*const {data} = useQuery(['homes', keyword], () =>  (getHomes(keyword)),
        {enabled: (keyword !== '' && keyword.length >= 2)})*/

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
        const initHome = async() => {
            let data = await getHomes("")
            setData(data)
        }
        initHome()
    }, [data]);

    const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }, [])

    const handleClear = () => {
        setKeyword('')
    }

    async function fnDel(homeSer: string){
        const data = await deleteHome(homeSer)
        console.log("탈퇴", data)
    }

    async function fnStop(homeSer: string, stat: string){
        const data = await stopHome(homeSer, stat)
        console.log("stop", data)
    }

    const { showSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(false);
    };

    const handleStopClick = (id: string, state: string) => {
        if(state==="Y"){
            state = "N"
        }else if(state==="N"){
            state = "Y"
        }
        setPopup({
            title: "상태변경 안내",
            id: id,
            extra: state,
            desc: "상태를 변경하시겠습니까?",
            evt: 0
        })
        setOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setPopup({
            title: "삭제 안내",
            id: id,
            extra: '',
            desc: "정말 삭제 하시겠습니까?",
            evt: 1
        })
        setOpen(true);
    };

    const handleEvent = () => {
        console.log("handleEvent", popup.id+", "+popup.extra)
        if(popup.evt===0){
            const data = stopHome(popup.id, popup.extra)
            showSnackbar("처리되었습니다")
        }else if(popup.evt===1){
            const data = deleteHome(popup.id)
            showSnackbar("처리되었습니다")
        }else{
            return;
        }
        setData([])
        setOpen(false);
    };

    async function search(){
        console.log("category", category +", "+keyword)
        if(category=="0"){
            console.log("0 test")
            let data = await getHomes("")
            setData(data)
        }else if(category=="1"){
            console.log("1 test")
            let data = await getHomeName(keyword)
            setData(data)
        }else if(category=="2"){
            console.log("1 test")
            let data = await getHomes(keyword)
            setData(data)
        }
    }

    return (
        <Container css={{maxWidth: "390px", height: "100vh", position: "relative", padding:"24px" }}>
            <Spacing size={24}/>
            <Flex direction="row" align="center" style={{}}>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">분류</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="분류"
                            onChange={handleChange}>
                            <MenuItem value="0">전체</MenuItem>
                            <MenuItem value="1">건물명</MenuItem>
                            <MenuItem value="2">주소</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Spacing direction="horizontal"  size={12}/>
                <div style={{width: "100%"}}>
                    <TextField id="outlined-basic" placeholder="키워드 검색"
                               inputRef={inputRef}
                               value={keyword}
                               onChange={handleKeyword}
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
                               variant="outlined" style={{width: '100%'}}/>
                </div>
                <Spacing direction="horizontal" size={12}/>
                <MyButton color="primary" size="medium" onClick={()=>search()} style={{width:"100px"}}>조회</MyButton>
            </Flex>
            <div>
                <Spacing size={12}/>
            </div>
            {data?.length > 0 ?
                (data?.map((home: Home, index: number) =>
                    <ListRow
                        key={home.homeSer}
                        left={
                            isVideoChecked(home.filePath1 || '')
                        }
                        contents={
                            <ListRow.Text home={home} />
                        }
                        right={
                            <Flex >
                                <MyButton color="normal" size="small" style={{width:"76px", height: "46px"}} onClick={()=>handleStopClick(home.homeSer||"", home.delYn||"N")}>{home.delYn === "Y"? "복구" : "중지"}</MyButton>
                                <Spacing direction="horizontal" size={12}/>
                                <MyButton color="normal" size="small" style={{width:"76px", height: "46px" }} onClick={()=>handleDeleteClick(home.homeSer||"")}>삭제</MyButton>
                            </Flex>
                        }/>,
                )) : null}
            <Spacing size={100}/>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {popup.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {popup.desc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleEvent} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>


        </Container>
    )
}

function isVideoChecked(file: string) {
    const videoExtensions = ['.mp4', '.webm', '.ogg']
    let fileExtension = file.slice(((file.lastIndexOf('.') - 1) >>> 0) + 2) // 파일 확장자 추출
    let isVideoFile = videoExtensions.includes(`.${fileExtension.toLowerCase()}`)
    if (isVideoFile) {
        return (
            <Flex css={videoStyles} align="center" justify="center">
                <SvgIcon style={{ color: colors.dankanPrimary, fontSize: 48 }} component={SmartDisplayIcon} inheritViewBox />
            </Flex>
        )
    } else {
        return (
            <Image src={file||BgImg} css={imgStyles} alt="" width={110} height={100}/>
        )
    }
}

const Container = styled.div`
    background-color: white;
    width: 100%;
    min-width: 1800px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`

const videoStyles = css`
    width: 84px;
    height: 74px;
    border-radius: 7%;
    background-color: #f5f5f5;   
`

const imgStyles = css`
    width: 84px;
    height: 74px;
    border-radius: 7%;
`
export default HomeAdmin