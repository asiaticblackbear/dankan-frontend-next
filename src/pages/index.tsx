import dynamic from "next/dynamic"
import {NextPage} from "next"
import styled from "@emotion/styled"
import {css} from "@emotion/react"
import {RecoilRoot} from "recoil"
import Skeleton from "@components/common/Skeleton";
import Point from "@components/home/Point";
import QuickButton from "@components/home/QuickButton";
import {HomeListSkeleton} from "@components/home/HomeList";
import FixedBottomContents from "@components/home/FixedBottomContents";
import {Fab, Input, SxProps, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "@components/home/Navbar";
import {useVh} from "@/utils/useVh";
import AddIcon from '@mui/icons-material/Add';
import {useRouter} from "next/router";
import BottomModal from "@components/common/BottomModal";
import {useCallback, useEffect, useState} from "react";
import PositionedSnackbar from "@components/common/BottomSnackbar";

import * as React from 'react';
import Box from '@mui/material/Box';
import {useSnackbar} from "@components/common/Snackbar";
import {colors} from "@styles/colorPalette";
/*import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';*/

const EventBanners = dynamic(() => import("@components/home/EventBanners"),
    {
        /*loading: ()=> <div>Loading...</div>,*/
        ssr: false,
        loading: () => (<Skeleton width="100%" height={125} style={{borderRadius: 8}}></Skeleton>)
    })
const HomeList = dynamic(() => import("@components/home/HomeList"),
    {
        /*loading: ()=> <div>Loading...</div>,*/
        ssr: false,
        loading: () => <HomeListSkeleton/>
    })

/*interface State extends SnackbarOrigin {
    open: boolean;
}*/
const Home: NextPage = () => {
    const vh = useVh();
    const router = useRouter();
    const { showSnackbar } = useSnackbar();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSubmit = useCallback(async ()=>{
        setModalOpen(true);
    }, [])

    const modalSubmit = useCallback(async ()=>{
        //handleClick({ vertical: 'bottom', horizontal: 'center' })
    }, [])

    useEffect(() => {
        let uid
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid") || ""
            if(uid===undefined||uid===""){
                showSnackbar("로그인 후 이용해주세요");
                router.replace({
                    pathname:"/user/signin",
                    query: {
                        uid : uid
                    },
                }, "/user/signin")
            }
        }else if(typeof router.query.uid !== "undefined"){
            uid = router.query.uid
            console.log("query"+uid)
        }

    }, [])

    console.log("home comming"+router.query.uid);

    return (
        <Container css={{width: '100%', height: `${100 * vh}px`,}}>
            <RecoilRoot>
                <Navbar onSubmit={handleSubmit}/>
                <div style={{padding: "34px 24px 13px 24px"}}>
                    <TextField id="outlined-basic" placeholder="지역, 지하철, 대학교를 입력하세요"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchIcon/>
                                       </InputAdornment>
                                   ),
                               }}
                               variant="outlined" style={{width: "100%"}}/>
                </div>
                <Point/>
                <EventBanners/>
                <QuickButton/>
                <HomeList/>
                <FixedBottomContents uid=""/>
                <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={()=>{
                    router.push("/home/new")
                }}>
                    {fab.icon}
                </Fab>
            </RecoilRoot>
            <BottomModal open={modalOpen} onClose={closeModal} submit={modalSubmit} />
            {/*<Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="대학 변경이 완료되었어요!"
                    key={vertical + horizontal}
                />
            </Box>*/}
        </Container>
    )
}


/*let theme = createTheme({
});

theme = createTheme(theme,{
    palette: {
        salmon: theme.palette.augmentColor({
            color: {
                main: colors.dankanPrimary,
            },
            name: 'primary',
        }),
    }});*/


const fabStyle = {
    position: 'fixed',
    bottom: 46,
    right: 24,
}

const fab = {
    color: 'primary' as 'primary',
    sx: fabStyle as SxProps,
    icon: <AddIcon style={{color: colors.white, fontSize: 24}}/>,
    label: 'Add',
}


const Container = styled.div`
  background-color: white;
`
const bold = css`
  font-weight: bold;
`
export default Home