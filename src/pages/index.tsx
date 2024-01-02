import dynamic from "next/dynamic"
import {NextPage} from "next"
import styled from "@emotion/styled"
import {css} from "@emotion/react"
import Text from "@components/Text"
import Button from "@components/Button"
import AuthGuard from "@components/auth/AuthGuard"
import {RecoilRoot} from "recoil"
import Skeleton from "@components/Skeleton";
import Point from "@components/home/Point";
import QuickButton from "@components/home/QuickButton";
import Spacing from "@components/Spacing";
import {HomeListSkeleton} from "@components/home/HomeList";
import OutButton from "@components/home/OutButton";
import FixedBottomContents from "@components/home/FixedBottomContents";
import {Input, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "@components/home/Navbar";

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


const Home: NextPage = () => {
    return (
        <Container>
            <RecoilRoot>
                <Navbar/>
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

            </RecoilRoot>
        </Container>
    )
}



const Container = styled.div`
  background-color: white;
`
const bold = css`
  font-weight: bold;
`
export default Home
