import dynamic from "next/dynamic"
import {NextPage} from "next"
import styled from "@emotion/styled"
import {css} from "@emotion/react"
import {RecoilRoot} from "recoil"
import Skeleton from "@components/Skeleton";
import Point from "@components/home/Point";
import QuickButton from "@components/home/QuickButton";
import {HomeListSkeleton} from "@components/home/HomeList";
import FixedBottomContents from "@components/home/FixedBottomContents";
import {Fab, Input, SxProps, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "@components/home/Navbar";
import {useVh} from "@/utils/useVh";
import {getUserAll} from "@remote/user";
import AddIcon from '@mui/icons-material/Add';
import {useRouter} from "next/router";
import BottomModal from "@components/BottomModal";
import {useCallback, useState} from "react";
import PositionedSnackbar from "@components/BottomSnackbar";

import * as React from 'react';
import Box from '@mui/material/Box';
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
    console.log(localStorage.getItem("uid")+"zzzz")
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSubmit = useCallback(async ()=>{
        setModalOpen(true);
    }, [])

    const modalSubmit = useCallback(async ()=>{
        //handleClick({ vertical: 'bottom', horizontal: 'center' })
    }, [])

    /*const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
    };*/
    /*const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;



    const handleClose = () => {
        setState({ ...state, open: false });
    };*/

    getUserAll()
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
                <FixedBottomContents label=""/>
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
    position: 'absolute',
    bottom: 46,
    right: 24,
}

const fab = {
    color: 'primary' as 'primary',
    sx: fabStyle as SxProps,
    icon: <AddIcon />,
    label: 'Add',
}


const Container = styled.div`
  background-color: white;
`
const bold = css`
  font-weight: bold;
`
export default Home