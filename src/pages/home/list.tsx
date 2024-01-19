import NavbarBack from "@components/common/NavbarBack";
import {useRouter} from "next/router";
import {Fab, SxProps, IconButton, SvgIcon, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import Text from "@components/common/Text";
import Spacing from "@components/common/Spacing";
import Flex from "@components/common/Flex";
import {css} from "@emotion/react";
import {colors} from "@styles/colorPalette";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocateIcon from "@assets/detailLocate.svg";
import {ChangeEvent, useEffect, useState} from "react";
import {Home} from "@models/home";
import ListRow from "@components/home/detail/ListRow";
import {getUserById} from "@remote/user";
import { getHomes, getHomeSearch } from '@remote/home'
import ErrorLocation from "@assets/errorLocation.svg";
import { getAreaById } from '@remote/area'


function HomeSearchList(){
    const router = useRouter();
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [homeCount, setHomeCount] = useState(0)
    const [homeAddr, setHomeAddr] = useState("")

    const [area, setArea] = useState("")

    useEffect(() => {
        console.log(data.length+"what")
        let uid
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid")
            const loadHome = async () => {
                const area = await getAreaById(uid!!)
                console.log("area", JSON.stringify(area));
                if(area!==undefined){
                    let descAddr = (area.homeZipCd).split("|")
                    setHomeAddr(descAddr[0])
                    const list = await getHomeSearch(area.homeZipCd)
                    if(list.length==0){
                        setHomeCount((list.length))
                    }else{
                        setHomeCount((list.length-1))
                    }

                    console.log("gg"+JSON.stringify(list))
                    setData(list)
                }
            }
            loadHome();
        }

    },[])


    console.log(router.query.homeZipCd)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setInputValue(e.target.value);
    };

    const handleClearClick = () => {
        setInputValue('');
    };

    return (
        <div>
            <NavbarBack title="단칸 후기" onNext={()=>{
                router.back()
            }}/>
            <Flex direction="column" css={formContainerStyles}>
                <div style={{padding: "18px 0px 13px 0px"}}>
                    <TextField id="outlined-basic" placeholder="도로명으로 검색"
                               value={inputValue}
                               onChange={handleChange}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchIcon/>
                                       </InputAdornment>
                                   ),
                                   endAdornment: inputValue && (
                                       <IconButton onClick={handleClearClick} edge="end">
                                           <CancelIcon />
                                       </IconButton>
                                   ),
                               }}
                               variant="outlined" style={{width: "100%"}}/>
                </div>
                <Spacing size={26}/>
                <Text typography="t5" textAlign="left" fontWeight="600">오늘의 추천 후기 🏠</Text>
                <Spacing size={13}/>
                <Flex direction="row" align="center" onClick={()=>{
                    router.push("/home/search")
                }}>
                    <LocateIcon/>
                    <Spacing direction="horizontal"  size={9}/>
                    <Text typography="t9">{homeAddr}</Text>
                    <Spacing direction="horizontal" size={2}/>
                    <Text typography="t9" color="dankanGrayText">외</Text>
                    <Spacing direction="horizontal" size={4}/>
                    <Text typography="t9" color="dankanGrayText">{homeCount}</Text>
                    <Spacing direction="horizontal" size={8}/>
                    <div>
                        <SvgIcon style={{color: colors.dankanGrayPoint, fontSize: 12}} component={ArrowRightIcon}
                                 inheritViewBox/>
                    </div>
                </Flex>

                <Spacing size={17}/>
                <div css={lineSmall}></div>
                <ul>
                    {data?.length===0 ?(
                        <div css={emptyStyles}>
                            <Spacing size={80}/>
                            <Flex direction="column" align="center">
                                <ErrorLocation height="46px" width="46px"/>
                                <Spacing size={17}/>
                                <Text typography="t6" color="black" bold={true}>우리 동네 후기가 없네요</Text>
                                <Spacing size={8}/>
                                <Text typography="t9" color={"dankanGrayText"}>다른 주변 정보로 검색해 보세요</Text>
                            </Flex>
                        </div>
                    ) : null}
                    {data?.length > 0 ? (
                        data?.map((home: Home, index: number) =>
                            <ListRow
                                home={home}
                                onClick={() => {
                                    router.push(`/home/${home.homeSer}`)
                                }}
                            />
                        )): null}

                </ul>

            </Flex>
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={()=>{
                router.push("/home/new")
            }}>
                {fab.icon}
            </Fab>
        </div>
    )
}
const formContainerStyles = css`
  padding-left: 24px;
  padding-right: 24px;
`

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

const lineSmall = css`
  border-top: 1px solid #F2F2F2;
  margin: 0px 0px;
`
const emptyStyles = css`
  height: 340px;
  margin: 0px 24px 0px 24px;
`

export default HomeSearchList