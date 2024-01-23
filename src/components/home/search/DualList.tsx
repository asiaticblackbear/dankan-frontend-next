import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import {
    List,
    ListItem,
    Typography,
    Container,
    SvgIcon,
    TextField,
    IconButton,
    InputBaseComponentProps,
} from '@mui/material'
import Text from '@components/common/Text'
import Grid from '@mui/material/Grid'
import {css} from '@emotion/react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {getZipAll} from '@remote/zip'
import {Zip} from '@models/zip'
import Spacing from "@components/common/Spacing";
import Flex from "@components/common/Flex";
import styled from "@emotion/styled";
import Button from "@components/common/Button"
import {colors} from "@styles/colorPalette"; // Import your styles
import {useSnackbar} from "@components/common/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from '@mui/material/InputAdornment'
import SearchedIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import FullScreenDialog from '@components/common/FullscreenModal'
import { User } from '@models/user'
import { joinUser } from '@remote/user'
import { joinArea } from '@remote/area'
function DualListSelection() {
    const router = useRouter()
    const inputRef = useRef<InputBaseComponentProps>({} as InputBaseComponentProps);

    const handleFocus = () => {
        if(!open){
            console.log("focus modal")
            setOpen(true)
        }
        inputRef.current.blur();
    };

    const [keyword, setKeyword] = useState('')

    const handleClear = () => {
        setKeyword('')
    }
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    }

    const handleSubmit = (item: Zip) =>{
        setOpen(false);
        console.log("submit", JSON.stringify(item))
        addToScrollList(item)
    }

    const handleSearch2 = () =>{
        router.push({
            pathname:"/home/search2",
            /*query: {
                homeZipCd : homeAddr
            },*/
        }, "/home/search2")
    }

    const handleMyArea = () =>{
        console.log("return1:"+JSON.stringify(scrollList))
        let uid = localStorage.getItem("uid") || ""
        let list = ""
        for(let i =0;i<scrollList.length;i++){
            let item = scrollList[i].replace(" 전체", "")
            list = list+item
            if(i!==(scrollList.length-1)) list=list+"|"
        }
        console.log(uid+", "+list)
        join(uid, list)
    }

    const showSnackbar = useSnackbar()

    const list1Items = [
        '서울', '부산', '대구', '인천', '광주', '대전', '부산', '울산', '세종', '경기',
        '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
    ]
    const [reg1, setReg1] = useState('서울')
    const [reg2, setReg2] = useState('종로구')
    const [reg3, setReg3] = useState('')

    const {data: Zip1} = useQuery(["reg1", reg1], () => getZipAll(reg1, "", ""))
    const {data: Zip2} = useQuery(["reg2", reg2], () => getZipAll(reg1, reg2, ""),
      {enabled: (reg2 !== '' && reg2.length >= 2)})

    const [scrollList, setScrollList] = useState<string[]>([])
    const [blackList, setBlackList] = useState<string[]>([])


    async function join(uid: string, list: string) {

        const data = await joinArea({
            "cifNo": uid,
            "homeZipCd": list
        })
        console.log(JSON.stringify(data))
        router.back()
        /*updateUid(
            data.cifNo,
        )
        console.log("return::::"+JSON.stringify(currentUser))*/
    }


    const handleList1Selection = (item: string) => {
        setReg1(item)
        setReg2("")

    }

    const handleList2Selection = (item: Zip) => {
        /*item.reg2 || '전체'*/
        if(item.reg2===""){
            addToScrollList(item)
        }else setReg2(item.reg2)
    }

    const handleList3Selection = (item: Zip) => {
        /*item.reg3 || '전체'*/
        if(item.reg3===""){
            addToScrollList(item)
        }else addToScrollList(item)
         // Add corresponding item from List 3
    }

    const isTotalChecked = (reg1: string, reg2: string) => {
        console.log(reg1+","+reg2+": "+blackList.length+""+blackList.includes(reg1)+", "+blackList.includes(reg2))
        if(reg2!=="") {
            console.log("in1")
            if(blackList.some(item=> item.split(" ").length==1&&item.includes(reg1)) ||blackList.some(item=> item.split(" ").length==2&&item.includes(reg2))){
                console.log("1")
                return true
            }
        }else{
            console.log("in2")
            if(blackList.some(item=> item.split(" ").length==1&&item.includes(reg1))){
                for(let i=0; i<blackList.length;i++) {
                    console.log("for문", blackList[i]+": "+blackList[i].split( " ").length)
                }
                console.log("2")
                return true
            }
        }
        return false
    }


    const addToScrollList = (item: Zip) => {
        console.log("addToScrollList", JSON.stringify(item))
        let str = ""
        let reg1 = item.reg1
        let reg2 = item.reg2
        let reg3 = item.reg3

        let isChecked = isTotalChecked(reg1, reg2)
        console.log("addToScrollList isChecked", isChecked)

        /*추가 전 삭제*/
        if(reg2===""&&!isChecked){
            str = reg1+" 전체"
            removeFromScrollList2(reg1)
            addBlackList(reg1, reg2, reg3, 0)
        }else if(reg3===""&&!isChecked){
            str = reg1+" "+reg2+" 전체"
            removeFromScrollList2(reg2)
            addBlackList(reg1, reg2, reg3, 1)
        }else{
            str = reg1+" "+reg2+" "+reg3
        }
        /*추가 전 길이 체크*/
        if(scrollList.length>9) return

        console.log("blackList", JSON.stringify(blackList)+", "+str)
        if (!scrollList.includes(str)&&!isChecked) {
            setScrollList((prevList) => [...prevList, str])
        }
    }

    const addBlackList = (reg1: string, reg2: string, reg3: string, index: number) => {
        console.log("black", reg1+", "+reg2+", "+reg3)
        if (index===0&&!isTotalChecked(reg1, "")) {
            console.log("black2", reg1)
            setBlackList((prevList) => [...prevList, reg1])
        }else if(index===1&&!isTotalChecked(reg1, reg2)){
            console.log("black3", reg1+", "+reg2)
            setBlackList((prevList) => [...prevList, reg1+" "+reg2])

        }
        console.log("result:"+blackList.length)
    }

    const removeBlackList = (itemToRemove: string) => {
        console.log("removeBlackList",itemToRemove)
        setBlackList((prevList) => prevList.filter((item) => !blackList.some(item=>item.includes(reg1))))
    }

    /*1번은 해당 건만 삭제*/
    const removeFromScrollList = (itemToRemove: string) => {
        setScrollList((prevList) => prevList.filter((item) => item !== itemToRemove))
        itemToRemove = itemToRemove.replace(" 전체", "")
        let item: string[] = (itemToRemove.split(" "))
        let len = item?.length
        console.log("removeFromScrollList1", len +": "+JSON.stringify(item))
        if(len===1){
            removeBlackList(item[0])
        }else if(len===2){
            removeBlackList(item[1])
        }
        //setBlackList((prevList) => prevList.filter((item) => item !== itemToRemove))
    }

    /*0번은 전체 삭제*/
    const removeFromScrollList2 = (itemToRemove: string) => {
        setScrollList((prevList) => prevList.filter((item) => !item.includes(itemToRemove)))

    }

    const clearScrollList = () => {
        setScrollList([])
        setBlackList([])
    }

    return (
      <div>
          <div style={{ padding: '18px 0px 13px 0px' }} css={formContainerStyles}>
              <TextField id="outlined-basic" placeholder="지역명으로 검색"
                         inputRef={inputRef}
                         onFocus={handleFocus}
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
          <Spacing size={25} />
          <Grid container spacing={0} css={containerStyle}>
              <Grid xs={3}>
                  <div css={headerStyle}>
                      <Text typography="t8" color="black">시 · 도</Text>
                  </div>
              </Grid>
              <Grid xs={4.5}>
                  <div css={headerStyle}>
                      <Text typography="t8" color="black">시 · 구 · 군</Text>
                  </div>
              </Grid>
              <Grid xs={4.5}>
                  <div css={headerStyle}>
                      <Text typography="t8" color="black">동 · 읍 · 면</Text>
                  </div>
              </Grid>
              <Grid xs={3}>
                  <List>
                      {list1Items.map((item) => (
                        <div css={itemStyle}>
                            <Text typography="t8" color="dankanGrayTextPoint"
                                  onClick={() => handleList1Selection(item)}>{item}</Text>
                        </div>
                      ))}
                      {/*<Typography>Selected Item in List 1: {selectedList1Item}</Typography>*/}
                  </List>
              </Grid>
              <Grid xs={4.5} css={listStyle}>
                  {Zip1?.length !== 0 ? (
                    <List>
                        {Zip1?.map((item: Zip, index: number) => (
                          <div css={itemStyle}>
                              <Text typography="t8" color="dankanGrayTextPoint"
                                    onClick={() => handleList2Selection(item)}>{item.reg2 || '전체'}</Text>
                          </div>
                        ))}
                    </List>
                  ) : null}
              </Grid>
              <Grid xs={4.5}>
                  <List>
                      {Zip2?.map((item: Zip, index: number) => (
                        <div css={itemStyle}>
                            <Text typography="t8" color="dankanGrayTextPoint"
                                  onClick={() => handleList3Selection(item)}>{item.reg3 || '전체'}</Text>
                        </div>
                      ))}
                  </List>
              </Grid>
          </Grid>
          <MyContainer>
              <Spacing size={13} />
              <Flex direction="row" justify="space-between" align="center">
                  <Flex direction="row" justify="start" align="center">
                      <Text typography="t9" color="dankanPrimary">{scrollList.length}</Text>
                      <Spacing direction="horizontal" size={0} />
                      <Text typography="t9" color="dankanGray">/10</Text>
                  </Flex>
                  <Text typography="t9" color="dankanGray" onClick={clearScrollList}>초기화</Text>
              </Flex>
              <Spacing size={14} />
              <Flex direction="row" css={horizonStyles}>
                  {scrollList.map((item, index) => (
                    <Flex direction="row" align="center" onClick={() => removeFromScrollList(item)} css={selectedStyle}>
                        <Text typography="t7" color="dankanSecondPrimary">{item}</Text>
                        <Spacing direction="horizontal" size={6}></Spacing>
                        <SvgIcon style={{ color: colors.dankanSecondPrimary, fontSize: 16 }} component={CloseIcon}
                                 inheritViewBox />
                    </Flex>
                  ))}
              </Flex>
              <Spacing size={14} />
              <div css={lineSmall}></div>
              <Spacing size={15} />
              <Flex justify="between-space" direction="row">
                  <Button full={true} size="medium" color="normal" css={buttonStyle} style={{ marginRight: 12 }} onClick={handleSearch2}>건물명으로
                      검색</Button>
                  <Button full={true} size="medium" css={buttonStyle} style={{ marginLeft: 12 }} onClick={handleMyArea}>확인</Button>
              </Flex>
          </MyContainer>
          <FullScreenDialog open={open} close={closeModal} submit={handleSubmit}/>
      </div>
    )
}

const selectedStyle = css`
    border: 1px solid #16F1BD;
    border-radius: 4px;
    background-color: #ffffff;
    opacity: 0.9;
    padding: 12px 12px 12px 12px;
    margin-right: 4px;
`

const MyContainer = styled.div`
    width: 100%;
    position: fixed;
    left: 0;
    rigtht: 0;
    bottom: 0;
    background-color: ${colors.white};
    padding: 20px 24px 20px 24px
`
const horizonStyles = css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    white-space: nowrap;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`
const buttonStyle = css`
    border-radius: 8px;
    font-weight: normal;
`
const lineSmall = css`
    border-top: 1px solid #F2F2F2;
    margin: 0px 0px;
`

const lineColumnSmall = css`
    border-right: 1px solid #F2F2F2;
    margin: 0px 0px;
`


const containerStyle = css`
  padding-left: 0;
  padding-right: 0;
`

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F6F6F6; /* 흰색 배경색*/
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid #E4E4E4; /* 회색 테두리 */
`

const listStyle = css`
  border-left: 1px solid #E4E4E4; /* 회색 테두리 */
  border-right: 1px solid #E4E4E4; /* 회색 테두리 */
`

const itemStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white; /* 흰색 배경색*/
  padding-top: 12px;
  padding-bottom: 12px;
`
const formContainerStyles = css`
    margin-left: 24px;
    margin-right: 24px;
`
export default DualListSelection
